import Link from 'next/link';
import Volcan from '@/components/Volcan';
import { PATRONES } from '@/lib/data';

// Esta portada también es SSG: no usa datos dinámicos.
export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Observatorio vulcanológico · Next.js 15</span>
          <h1>Cinco formas de <em>entregar</em> una página, <strong>un volcán.</strong></h1>
          <p>Un observatorio ficticio inspirado en el Galeras (Pasto) muestra cómo cambia el momento en que se genera el HTML: en el build, en segundo plano, en cada petición, por partes o en el navegador.</p>
          <div className="acciones">
            <Link href="/volcanes" className="btn verde">Explorar el catálogo</Link>
            <Link href="/sismografo" className="btn">Ver el sismógrafo en vivo</Link>
          </div>
        </div>
        <div className="escena">
          <Volcan size={440} titulo="Volcán Galeras en erupción" />
        </div>
      </section>

      <svg className="sismo-linea" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
        <path className="base" d="M0 60 H180 l8-14 8 28 8-40 8 52 8-30 8 12 H420 l6-8 6 16 6-34 6 46 6-24 H700 l4-6 4 10 4-14 4 12 H1200" />
        <path className="pico" d="M700 60 l10-18 10 36 10-58 10 74 10-46 10 20 12-8 H1200" />
      </svg>

      <section className="linea-tiempo" aria-labelledby="lt">
        <h2 id="lt">¿Cuándo se genera el HTML?</h2>
        <ol>
          {PATRONES.map((p) => (
            <li key={p.href} style={{ '--c': p.color }}>
              <Link href={p.href}><b>{p.sigla}</b><small>{p.momento}</small></Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-patrones">
        {PATRONES.map((x) => (
          <Link key={x.href} href={x.href} className="card" style={{ '--c': x.color }}>
            <span className="tag">{x.sigla}</span>
            <h2>{x.t}</h2>
            <p>{x.d}</p>
            <span className="momento">{x.momento}</span>
            <span className="flecha" aria-hidden>→</span>
          </Link>
        ))}
      </section>
      <p className="nota">Para ver las diferencias reales ejecuta <code>npm run build &amp;&amp; npm start</code>. En <code>npm run dev</code> Next.js renderiza todo bajo demanda.</p>
    </>
  );
}
