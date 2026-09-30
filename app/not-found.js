import Link from 'next/link';
import Volcan from '@/components/Volcan';

export default function NotFound() {
  return (
    <section className="perdido">
      <Volcan size={220} activo={false} titulo="Volcán dormido" />
      <h1 className="titulo">Zona no cartografiada</h1>
      <p className="lead">Esta ruta no existe en el observatorio. Puede que el volcán que buscas esté dormido.</p>
      <Link href="/" className="btn verde">Volver a la estación base</Link>
    </section>
  );
}
