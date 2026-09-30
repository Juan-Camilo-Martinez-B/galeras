'use client';
import { useEffect, useRef, useState } from 'react';

const N = 200; // ventana: 4 s a 50 Hz

// Worker en línea (Blob): DFT O(N²) para hallar la frecuencia dominante + RMS y pico.
const CODIGO = `onmessage=e=>{const s=e.data,n=s.length;let sum=0,pk=0;for(const v of s){sum+=v*v;pk=Math.max(pk,Math.abs(v))}
let best=0,bk=0;for(let k=1;k<n/2;k++){let re=0,im=0;for(let i=0;i<n;i++){const a=2*Math.PI*k*i/n;re+=s[i]*Math.cos(a);im+=s[i]*Math.sin(a)}const m=re*re+im*im;if(m>best){best=m;bk=k}}
postMessage({rms:Math.sqrt(sum/n),pico:pk,hz:bk/4})}`;

export default function Sismografo() {
  const canvas = useRef(null);
  const buf = useRef([]);
  const worker = useRef(null);
  const [m, setM] = useState({ rms: 0, pico: 0, hz: 0 });
  const [pausa, setPausa] = useState(false);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const url = URL.createObjectURL(new Blob([CODIGO], { type: 'text/javascript' }));
    worker.current = new Worker(url);
    worker.current.onmessage = (e) => setM(e.data);
    return () => { worker.current.terminate(); URL.revokeObjectURL(url); };
  }, []);

  useEffect(() => {
    if (pausa) return;
    const id = setInterval(async () => {
      const t0 = performance.now();
      const { muestras } = await (await fetch('/api/sismos', { cache: 'no-store' })).json();
      setPing(Math.round(performance.now() - t0));
      buf.current = [...buf.current, ...muestras].slice(-N);
      if (buf.current.length === N) worker.current.postMessage(buf.current);
      dibujar();
    }, 1000);
    return () => clearInterval(id);
  }, [pausa]);

  function dibujar() {
    const c = canvas.current, g = c.getContext('2d');
    g.clearRect(0, 0, c.width, c.height);
    g.strokeStyle = 'rgba(18,36,29,.12)';
    for (let x = 0; x < c.width; x += 50) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, c.height); g.stroke(); }
    g.strokeStyle = '#d6432b'; g.lineWidth = 2; g.beginPath();
    buf.current.forEach((v, i) => { const x = (i / (N - 1)) * c.width, y = c.height / 2 - v * 30; i ? g.lineTo(x, y) : g.moveTo(x, y); });
    g.stroke();
  }

  const K = [['RMS', m.rms.toFixed(2)], ['Pico', m.pico.toFixed(2)], ['Frecuencia dominante', `${m.hz.toFixed(2)} Hz`], ['Latencia fetch', `${ping} ms`]];
  return (
    <>
      <aside className="sello p-csr"><b>CSR</b><span>El servidor solo envió un HTML casi vacío; esto se dibuja en tu navegador</span></aside>
      <h1 className="titulo">Sismógrafo interactivo</h1>
      <p className="lead">El navegador pide <code>/api/sismos</code> cada segundo y pinta la señal en un canvas. El análisis espectral corre en un <strong>Web Worker</strong>: el hilo principal queda libre para la interfaz.</p>
      <canvas ref={canvas} width={1000} height={260} className="canvas" />
      <div className="grid">{K.map(([k, v]) => <div key={k} className="sensor listo"><h3>{k}</h3><strong>{v}</strong></div>)}</div>
      <button className="btn" onClick={() => setPausa(!pausa)}>{pausa ? 'Reanudar lectura' : 'Pausar lectura'}</button>
    </>
  );
}
