import { hora } from '@/lib/data';
import Volcan from './Volcan';

// Server Component: la hora impresa revela CUÁNDO se ejecutó este código.
// SSG = hora del build, ISR = hora de la última regeneración, SSR = hora de cada petición.
export default function Sello({ patron, cuando }) {
  return (
    <aside className={`sello p-${patron.split(' ')[0].toLowerCase()}`}>
      <Volcan size={34} activo={false} titulo="" className="sello-icono" />
      <b>{patron}</b>
      <span>{cuando}</span>
      <time>{hora()}</time>
    </aside>
  );
}
