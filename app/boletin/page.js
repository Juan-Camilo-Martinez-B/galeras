import Sello from '@/components/Sello';
import { VOLCANES, generarEventos } from '@/lib/data';

export const revalidate = 15; // segundos: ISR

export default function Boletin() {
  const ev = generarEventos(4);
  return (
    <>
      <Sello patron="ISR" cuando="Boletín regenerado a las" />
      <h1 className="titulo">Boletín semanal de actividad</h1>
      <p className="lead">Recarga varias veces: verás la misma hora hasta pasados 15 s. La siguiente visita recibe la versión vieja (stale) y dispara la regeneración en segundo plano; la que sigue ya ve la nueva.</p>
      <table>
        <thead><tr><th>Volcán</th><th>Zona</th><th>Tipo</th><th>Magnitud</th></tr></thead>
        <tbody>{ev.map((e) => <tr key={e.id}><td>{e.volcan}</td><td>{e.zona}</td><td>{e.tipo}</td><td>{e.magnitud}</td></tr>)}</tbody>
      </table>
      <p className="nota">Monitoreando {VOLCANES.length} volcanes.</p>
    </>
  );
}
