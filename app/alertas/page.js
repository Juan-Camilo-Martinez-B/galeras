import Sello from '@/components/Sello';
import { generarEventos, sleep } from '@/lib/data';

export const dynamic = 'force-dynamic'; // SSR: se ejecuta en cada petición

export default async function Alertas() {
  await sleep(600); // el servidor "retiene" la respuesta hasta tener todos los datos
  const ev = generarEventos(6).sort((a, b) => b.magnitud - a.magnitud);
  return (
    <>
      <Sello patron="SSR" cuando="Renderizado en el servidor a las" />
      <h1 className="titulo">Alertas en vivo</h1>
      <p className="lead">Cada recarga produce datos nuevos. Fíjate en la espera: el navegador no recibe nada hasta que el servidor termina de consultar (trade-off del SSR clásico). Ideal para SEO con datos cambiantes.</p>
      <ul className="alertas">
        {ev.map((e) => (
          <li key={e.id} className={e.magnitud > 2.5 ? 'alta' : ''}>
            <strong>M {e.magnitud}</strong>
            <span>{e.volcan} · {e.zona}</span>
            <em>{e.tipo}, {e.profundidad} km</em>
          </li>
        ))}
      </ul>
    </>
  );
}
