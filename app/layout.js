import Link from 'next/link';
import { Fraunces, Public_Sans } from 'next/font/google';
import './globals.css';

const serif = Fraunces({ subsets: ['latin'], variable: '--serif' });
const sans = Public_Sans({ subsets: ['latin'], variable: '--sans' });

export const metadata = { title: 'Observatorio Galeras · Patrones de Rendering', description: 'Cinco patrones de rendering de Next.js explicados con un observatorio volcánico.' };

const NAV = [['/volcanes', 'SSG'], ['/boletin', 'ISR'], ['/alertas', 'SSR'], ['/panel', 'Streaming'], ['/sismografo', 'CSR']];

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <header className="top">
          <Link href="/" className="logo">Observatorio Galeras</Link>
          <nav>{NAV.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</nav>
        </header>
        <main>{children}</main>
        <footer>Programación Orientada a la Web · Universidad Cooperativa de Colombia</footer>
      </body>
    </html>
  );
}
