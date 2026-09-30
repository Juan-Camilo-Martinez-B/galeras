import { notFound } from 'next/navigation';
import Sello from '@/components/Sello';
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
      <h1 className="titulo" style={{ color: v.color }}>{v.nombre}</h1>
      <p className="lead">{v.desc}</p>
      <dl className="ficha">{datos.map(([k, val]) => <div key={k}><dt>{k}</dt><dd>{val}</dd></div>)}</dl>
    </>
  );
}
