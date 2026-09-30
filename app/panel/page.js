import { Suspense } from 'react';
import Sello from '@/components/Sello';
import Cabecera from '@/components/Cabecera';
import { sleep, hora } from '@/lib/data';

export const dynamic = 'force-dynamic';

async function Sensor({ nombre, ms, unidad, base, color }) {
  await sleep(ms);
  const v = (base + Math.random() * base * 0.2).toFixed(1);
  return (
    <div className="sensor listo" style={{ '--c': color }}>
      <h3>{nombre}</h3>
      <strong>{v}<small> {unidad}</small></strong>
      <em>llegó tras {ms / 1000} s · {hora()}</em>
    </div>
  );
}

const Esqueleto = ({ nombre, ms }) => (
  <div className="sensor esq"><h3>{nombre}</h3><i /><i /><em>consultando… (~{ms / 1000} s)</em></div>
);

export default function Panel() {
  const S = [
    ['Emisión de SO₂', 1000, 't/día', 420, 'var(--lima)'],
    ['Deformación del cráter', 2500, 'µrad', 35, 'var(--brasa)'],
    ['Temperatura fumarola', 4000, '°C', 210, 'var(--lava)'],
  ];
  return (
    <>
      <Sello patron="Streaming SSR" cuando="Estructura enviada a las" />
      <Cabecera titulo="Panel de monitoreo" color="var(--brasa)">
        El título y el layout llegan de inmediato. Cada sensor está envuelto en <code>&lt;Suspense&gt;</code> y se "transmite" al DOM en cuanto su consulta termina, sin bloquear al resto.
      </Cabecera>
      <div className="grid">
        {S.map(([n, ms, u, b, c]) => (
          <Suspense key={n} fallback={<Esqueleto nombre={n} ms={ms} />}>
            <Sensor nombre={n} ms={ms} unidad={u} base={b} color={c} />
          </Suspense>
        ))}
      </div>
      <p className="nota">Observa cómo los tres sensores aparecen escalonados (1 s, 2.5 s y 4 s) mientras la página ya es visible e interactiva.</p>
    </>
  );
}
