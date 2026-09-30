import Link from 'next/link';
import { Fraunces, Public_Sans } from 'next/font/google';
import Nav from '@/components/Nav';
import Volcan from '@/components/Volcan';
import './globals.css';

const serif = Fraunces({ subsets: ['latin'], variable: '--serif' });
const sans = Public_Sans({ subsets: ['latin'], variable: '--sans' });

export const metadata = { title: 'Observatorio Galeras · Patrones de Rendering', description: 'Cinco patrones de rendering de Next.js explicados con un observatorio volcánico.' };

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <header className="top">
          <Link href="/" className="logo">
            <Volcan size={46} titulo="Inicio" />
            <span><strong>Observatorio Galeras</strong><small>Patrones de rendering</small></span>
          </Link>
          <Nav />
        </header>
        <main>{children}</main>
        <footer>
          <svg className="cordillera" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden>
            <path d="M0 90 L0 70 L90 40 L160 62 L250 22 L330 58 L420 34 L500 66 L600 10 L700 66 L780 40 L870 60 L950 28 L1040 58 L1120 44 L1200 66 L1200 90 Z" fill="#0b2419" />
            <path d="M0 90 L0 80 L120 62 L220 76 L340 56 L450 74 L600 40 L750 74 L860 60 L980 76 L1100 62 L1200 78 L1200 90 Z" fill="#061009" />
            <ellipse cx="600" cy="12" rx="14" ry="4" fill="#ff3b30" opacity=".9" />
            <ellipse cx="600" cy="12" rx="40" ry="14" fill="#ff3b30" opacity=".18" />
          </svg>
          <div className="pie">
            <span>Programación Orientada a la Web · Universidad Cooperativa de Colombia</span>
            <span className="estado">Estación activa</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
