import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sello from '@/components/Sello';
import Volcan from '@/components/Volcan';
import { VOLCANES } from '@/lib/data';

export const dynamicParams = false; // solo existen las rutas generadas en el build

export function generateStaticParams() {
  return VOLCANES.map((v) => ({ slug: v.slug }));
}

export default async function Ficha({ params }) {
  const { slug } = await params;
  const v = VOLCANES.find((x) => x.slug === slug);
  if (!v) notFound();
  const datos = [['Altura', `${v.altura.toLocaleString('es-CO')} m`], ['Tipo', v.tipo], ['Ubicación', v.ubicacion], ['Última erupción notable', v.ultima], ['Nivel de actividad', v.nivel]];
  return (
    <>
      <Sello patron="SSG" cuando={`/volcanes/${v.slug} compilada a las`} />
      <section className="ficha-hero">
        <div>
          <Link href="/volcanes" className="volver">← Volver al catálogo</Link>
          <div><span className="nivel">Nivel {v.nivel}</span></div>
          <h1 className="titulo" style={{ color: v.color }}>{v.nombre}</h1>
          <p className="lead">{v.desc}</p>
        </div>
        <Volcan size={300} color={v.color} titulo={`Ilustración del volcán ${v.nombre}`} />
      </section>
      <dl className="ficha" style={{ '--c': v.color }}>
        {datos.map(([k, val], i) => <div key={k} style={{ animationDelay: `${i * 70}ms` }}><dt>{k}</dt><dd>{val}</dd></div>)}
      </dl>
    </>
  );
}
