'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PATRONES } from '@/lib/data';

// Client Component mínimo: solo necesita la ruta actual para marcar el enlace activo.
export default function Nav() {
  const ruta = usePathname();
  return (
    <nav aria-label="Patrones de rendering">
      {PATRONES.map((p) => (
        <Link key={p.href} href={p.href} className={ruta.startsWith(p.href) ? 'activo' : ''} style={{ '--c': p.color }}>
          <i aria-hidden />
          {p.sigla}
        </Link>
      ))}
    </nav>
  );
}
