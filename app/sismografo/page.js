'use client';
import { useEffect, useRef, useState } from 'react';
import Cabecera from '@/components/Cabecera';

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
    dibujar(); // rejilla visible desde el primer frame, antes del primer fetch
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
    const W = c.width, H = c.height;
    g.clearRect(0, 0, W, H);

    // rejilla verde tipo monitor
    g.lineWidth = 1;
    g.strokeStyle = 'rgba(46,204,113,.10)';
    for (let x = 0; x < W; x += 50) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += 26) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.strokeStyle = 'rgba(46,204,113,.35)'; g.setLineDash([6, 6]);
    g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke(); g.setLineDash([]);

    // franjas de umbral (verde = calma, rojo = sacudida)
    g.fillStyle = 'rgba(255,59,48,.06)';
    g.fillRect(0, 0, W, H / 2 - 75); g.fillRect(0, H / 2 + 75, W, H / 2 - 75);

    if (!buf.current.length) return;
    const trazo = () => { g.beginPath(); buf.current.forEach((v, i) => { const x = (i / (N - 1)) * W, y = H / 2 - v * 30; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); };

    // halo + trazo principal: rojo lava con brillo
    g.lineJoin = 'round'; g.lineCap = 'round';
    g.strokeStyle = 'rgba(255,59,48,.25)'; g.lineWidth = 7; trazo();
    g.shadowColor = '#ff3b30'; g.shadowBlur = 12;
    g.strokeStyle = '#ff5b4d'; g.lineWidth = 2; trazo();
    g.shadowBlur = 0;

    // punto de lectura actual
    const ult = buf.current[buf.current.length - 1];
    g.fillStyle = '#ffd166'; g.beginPath(); g.arc(W - 2, H / 2 - ult * 30, 4, 0, Math.PI * 2); g.fill();
  }

  const K = [
    ['RMS', m.rms.toFixed(2), 'var(--verde)'],
    ['Pico', m.pico.toFixed(2), 'var(--lava)'],
    ['Frecuencia dominante', `${m.hz.toFixed(2)} Hz`, 'var(--lima)'],
    ['Latencia fetch', `${ping} ms`, 'var(--carmesi)'],
  ];
  return (
    <>
      <aside className="sello p-csr"><b>CSR</b><span>El servidor solo envió un HTML casi vacío; esto se dibuja en tu navegador</span></aside>
      <Cabecera titulo="Sismógrafo interactivo" color="var(--carmesi)">
        El navegador pide <code>/api/sismos</code> cada segundo y pinta la señal en un canvas. El análisis espectral corre en un <strong>Web Worker</strong>: el hilo principal queda libre para la interfaz.
      </Cabecera>
      <div className="monitor">
        <span className={`vivo ${pausa ? 'pausado' : ''}`}>{pausa ? 'Pausado' : 'En vivo'}</span>
        <span className="estacion">Estación GAL-01 · 50 Hz</span>
        <canvas ref={canvas} width={1000} height={260} className="canvas" />
      </div>
      <div className="grid">{K.map(([k, v, c]) => <div key={k} className="sensor listo" style={{ '--c': c }}><h3>{k}</h3><strong>{v}</strong></div>)}</div>
      <button className={`btn ${pausa ? 'verde' : ''}`} onClick={() => setPausa(!pausa)}>{pausa ? '▶ Reanudar lectura' : '❚❚ Pausar lectura'}</button>
    </>
  );
}
