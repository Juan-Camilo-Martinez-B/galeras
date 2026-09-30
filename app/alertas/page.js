import Sello from '@/components/Sello';
import Cabecera from '@/components/Cabecera';
import { generarEventos, severidad, sleep } from '@/lib/data';

export const dynamic = 'force-dynamic'; // SSR: se ejecuta en cada petición

export default async function Alertas() {
  await sleep(600); // el servidor "retiene" la respuesta hasta tener todos los datos
  const ev = generarEventos(6).sort((a, b) => b.magnitud - a.magnitud);
  const altas = ev.filter((e) => severidad(e.magnitud) === 'alta').length;
  const max = ev[0];
  return (
    <>
      <Sello patron="SSR" cuando="Renderizado en el servidor a las" />
      <Cabecera titulo="Alertas en vivo" color="var(--lava)">
        Cada recarga produce datos nuevos. Fíjate en la espera: el navegador no recibe nada hasta que el servidor termina de consultar (trade-off del SSR clásico). Ideal para SEO con datos cambiantes.
      </Cabecera>

      <div className="resumen">
        <div><small>Eventos registrados</small><strong>{ev.length}</strong></div>
        <div className={altas ? 'alta' : 'baja'}><small>Alertas altas</small><strong>{altas}</strong></div>
        <div className={severidad(max.magnitud)}><small>Mayor magnitud</small><strong>M {max.magnitud}</strong></div>
        <div><small>Volcán más activo</small><strong>{max.volcan}</strong></div>
      </div>

      <ul className="alertas">
        {ev.map((e) => (
          <li key={e.id} className={severidad(e.magnitud)}>
            <strong><small>Magnitud</small>M {e.magnitud}</strong>
            <span>
              <b>{e.volcan}</b> · {e.zona}
              <span className="barra"><i style={{ '--w': `${(e.magnitud / 3.5) * 100}%` }} /></span>
            </span>
            <em><b>{e.tipo}</b>{e.profundidad} km de profundidad</em>
          </li>
        ))}
      </ul>
      <div className="leyenda">
        <span style={{ '--c': 'var(--verde)' }}>Baja &lt; 1.5</span>
        <span style={{ '--c': 'var(--oro)' }}>Media 1.5 – 2.4</span>
        <span style={{ '--c': 'var(--lava)' }}>Alta ≥ 2.5</span>
      </div>
    </>
  );
}
