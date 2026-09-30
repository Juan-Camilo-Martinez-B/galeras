import { Suspense } from 'react';
import Sello from '@/components/Sello';
import { sleep, hora } from '@/lib/data';

export const dynamic = 'force-dynamic';

async function Sensor({ nombre, ms, unidad, base }) {
  await sleep(ms);
  const v = (base + Math.random() * base * 0.2).toFixed(1);
  return (
    <div className="sensor listo">
      <h3>{nombre}</h3>
      <strong>{v}<small> {unidad}</small></strong>
      <em>llegó tras {ms / 1000} s · {hora()}</em>
    </div>
  );
}

const Esqueleto = ({ nombre }) => <div className="sensor esq"><h3>{nombre}</h3><i /><i /></div>;

export default function Panel() {
  const S = [['Emisión de SO₂', 1000, 't/día', 420], ['Deformación del cráter', 2500, 'µrad', 35], ['Temperatura fumarola', 4000, '°C', 210]];
  return (
    <>
      <Sello patron="Streaming SSR" cuando="Estructura enviada a las" />
      <h1 className="titulo">Panel de monitoreo</h1>
      <p className="lead">El título y el layout llegan de inmediato. Cada sensor está envuelto en <code>&lt;Suspense&gt;</code> y se "transmite" al DOM en cuanto su consulta termina, sin bloquear al resto.</p>
      <div className="grid">
        {S.map(([n, ms, u, b]) => (
          <Suspense key={n} fallback={<Esqueleto nombre={n} />}>
            <Sensor nombre={n} ms={ms} unidad={u} base={b} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
