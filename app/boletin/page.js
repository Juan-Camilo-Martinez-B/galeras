import Sello from '@/components/Sello';
import Cabecera from '@/components/Cabecera';
import { VOLCANES, generarEventos, severidad } from '@/lib/data';

export const revalidate = 15; // segundos: ISR

export default function Boletin() {
  const ev = generarEventos(4);
  return (
    <>
      <Sello patron="ISR" cuando="Boletín regenerado a las" />
      <Cabecera titulo="Boletín semanal de actividad" color="var(--lima)">
        Recarga varias veces: verás la misma hora hasta pasados 15 s. La siguiente visita recibe la versión vieja (stale) y dispara la regeneración en segundo plano; la que sigue ya ve la nueva.
      </Cabecera>
      <div className="tabla-wrap">
        <table>
          <thead><tr><th>Volcán</th><th>Zona</th><th>Tipo de evento</th><th>Magnitud</th></tr></thead>
          <tbody>
            {ev.map((e) => (
              <tr key={e.id}>
                <td className="volcan-nombre">{e.volcan}</td>
                <td>{e.zona}</td>
                <td>{e.tipo}</td>
                <td><span className={`chip ${severidad(e.magnitud)}`}>M {e.magnitud}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="nota">Monitoreando {VOLCANES.length} volcanes: {VOLCANES.map((v) => v.nombre).join(', ')}.</p>
    </>
  );
}
