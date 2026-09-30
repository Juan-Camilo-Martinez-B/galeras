import Link from 'next/link';

const PATRONES = [
  { href: '/volcanes', p: 'SSG', t: 'Catálogo de volcanes', d: 'Fichas técnicas que casi nunca cambian. El HTML se genera una sola vez en el build y se sirve desde CDN.', c: 'var(--teal)' },
  { href: '/boletin', p: 'ISR', t: 'Boletín semanal', d: 'Estático, pero se regenera solo cada 15 segundos en segundo plano (stale-while-revalidate).', c: 'var(--sulfur)' },
  { href: '/alertas', p: 'SSR', t: 'Alertas en vivo', d: 'Cada petición ejecuta el servidor y produce datos sísmicos nuevos. Recarga y compara la hora.', c: 'var(--magma)' },
  { href: '/panel', p: 'Streaming SSR', t: 'Panel de monitoreo', d: 'El layout llega al instante; cada sensor lento aparece cuando su consulta termina, gracias a Suspense.', c: 'var(--violet)' },
  { href: '/sismografo', p: 'CSR', t: 'Sismógrafo interactivo', d: 'Todo ocurre en el navegador: fetch cada segundo, canvas y un Web Worker que analiza la señal sin bloquear la interfaz.', c: 'var(--ink)' },
];

// Esta portada también es SSG: no usa datos dinámicos.
export default function Home() {
  return (
    <>
      <section className="hero">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 H180 l8-14 8 28 8-40 8 52 8-30 8 12 H420 l6-8 6 16 6-34 6 46 6-24 H700 l10-18 10 36 10-58 10 74 10-46 10 20 12-8 H1200" />
        </svg>
        <h1>Cinco formas de entregar una página, un volcán.</h1>
        <p>Un observatorio ficticio inspirado en el Galeras (Pasto) muestra cómo cambia el momento en que se genera el HTML: en el build, en segundo plano, en cada petición, por partes o en el navegador.</p>
      </section>
      <section className="grid">
        {PATRONES.map((x) => (
          <Link key={x.href} href={x.href} className="card" style={{ '--c': x.c }}>
            <span className="tag">{x.p}</span>
            <h2>{x.t}</h2>
            <p>{x.d}</p>
          </Link>
        ))}
      </section>
      <p className="nota">Para ver las diferencias reales ejecuta <code>npm run build &amp;&amp; npm start</code>. En <code>npm run dev</code> Next.js renderiza todo bajo demanda.</p>
    </>
  );
}
