import Link from 'next/link';
import Sello from '@/components/Sello';
import { VOLCANES } from '@/lib/data';

export default function Volcanes() {
  return (
    <>
      <Sello patron="SSG" cuando="HTML generado en el build a las" />
      <h1 className="titulo">Catálogo de volcanes</h1>
      <p className="lead">La hora del sello nunca cambia al recargar: la página se compiló una vez. Cada ficha se pre-renderiza con <code>generateStaticParams</code>.</p>
      <div className="grid">
        {VOLCANES.map((v) => (
          <Link key={v.slug} href={`/volcanes/${v.slug}`} className="card" style={{ '--c': v.color }}>
            <span className="tag">{v.altura.toLocaleString('es-CO')} m</span>
            <h2>{v.nombre}</h2>
            <p>{v.ubicacion}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
