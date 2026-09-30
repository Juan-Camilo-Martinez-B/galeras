import Link from 'next/link';
import Sello from '@/components/Sello';
import Cabecera from '@/components/Cabecera';
import Volcan from '@/components/Volcan';
import { VOLCANES } from '@/lib/data';

export default function Volcanes() {
  return (
    <>
      <Sello patron="SSG" cuando="HTML generado en el build a las" />
      <Cabecera titulo="Catálogo de volcanes" color="var(--verde)">
        La hora del sello nunca cambia al recargar: la página se compiló una vez. Cada ficha se pre-renderiza con <code>generateStaticParams</code>.
      </Cabecera>
      <div className="grid">
        {VOLCANES.map((v) => (
          <Link key={v.slug} href={`/volcanes/${v.slug}`} className="card volcan-card" style={{ '--c': v.color }}>
            <span className="tag">{v.altura.toLocaleString('es-CO')} m</span>
            <h2>{v.nombre}</h2>
            <p>{v.ubicacion}</p>
            <Volcan size={96} color={v.color} titulo={v.nombre} />
          </Link>
        ))}
      </div>
    </>
  );
}
