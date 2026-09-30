export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Los cinco patrones de rendering, con su ruta y color (verde = estático, rojo = dinámico).
export const PATRONES = [
  { href: '/volcanes', sigla: 'SSG', nombre: 'Static Site Generation', color: 'var(--verde)', momento: 'En el build', t: 'Catálogo de volcanes', d: 'Fichas técnicas que casi nunca cambian. El HTML se genera una sola vez en el build y se sirve desde CDN.' },
  { href: '/boletin', sigla: 'ISR', nombre: 'Incremental Static Regeneration', color: 'var(--lima)', momento: 'En segundo plano', t: 'Boletín semanal', d: 'Estático, pero se regenera solo cada 15 segundos en segundo plano (stale-while-revalidate).' },
  { href: '/panel', sigla: 'Streaming', nombre: 'Streaming SSR', color: 'var(--brasa)', momento: 'Por partes', t: 'Panel de monitoreo', d: 'El layout llega al instante; cada sensor lento aparece cuando su consulta termina, gracias a Suspense.' },
  { href: '/alertas', sigla: 'SSR', nombre: 'Server-Side Rendering', color: 'var(--lava)', momento: 'En cada petición', t: 'Alertas en vivo', d: 'Cada petición ejecuta el servidor y produce datos sísmicos nuevos. Recarga y compara la hora.' },
  { href: '/sismografo', sigla: 'CSR', nombre: 'Client-Side Rendering', color: 'var(--carmesi)', momento: 'En el navegador', t: 'Sismógrafo interactivo', d: 'Todo ocurre en el navegador: fetch cada segundo, canvas y un Web Worker que analiza la señal sin bloquear la interfaz.' },
];

export const VOLCANES = [
  { slug: 'galeras', nombre: 'Galeras', ubicacion: 'Nariño, Colombia', altura: 4276, tipo: 'Estratovolcán', ultima: '2010', nivel: 'Amarillo', color: '#ff3b30',
    desc: 'El volcán más activo de Colombia domina Pasto. Su cráter de 320 m de profundidad ha emitido gases y ceniza de forma casi continua desde la era colonial.' },
  { slug: 'nevado-del-ruiz', nombre: 'Nevado del Ruiz', ubicacion: 'Caldas / Tolima, Colombia', altura: 5321, tipo: 'Estratovolcán glaciar', ultima: '2023', nivel: 'Amarillo', color: '#ff8c42',
    desc: 'Su erupción de 1985 derritió parte del glaciar y sepultó Armero. Hoy es uno de los volcanes mejor vigilados del continente.' },
  { slug: 'purace', nombre: 'Puracé', ubicacion: 'Cauca, Colombia', altura: 4650, tipo: 'Estratovolcán', ultima: '2020', nivel: 'Amarillo', color: '#2ecc71',
    desc: 'Forma parte de la Cadena Volcánica de los Coconucos. Sus fumarolas de azufre son visibles desde varios kilómetros.' },
  { slug: 'cotopaxi', nombre: 'Cotopaxi', ubicacion: 'Cotopaxi, Ecuador', altura: 5897, tipo: 'Estratovolcán', ultima: '2015', nivel: 'Amarillo', color: '#b5e853',
    desc: 'Uno de los volcanes activos más altos del mundo. Su cono casi perfecto está cubierto por un glaciar permanente.' },
];

// Clasificación visual de un sismo según su magnitud.
export const severidad = (m) => (m >= 2.5 ? 'alta' : m >= 1.5 ? 'media' : 'baja');

const ZONAS = ['Cráter principal', 'Flanco norte', 'Flanco sur', 'Zona Urcunina', 'Cráter secundario'];
const TIPOS = ['Volcano-tectónico', 'Largo período', 'Tremor', 'Híbrido'];

export function generarEventos(n = 6) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    volcan: VOLCANES[Math.floor(Math.random() * VOLCANES.length)].nombre,
    zona: ZONAS[Math.floor(Math.random() * ZONAS.length)],
    tipo: TIPOS[Math.floor(Math.random() * TIPOS.length)],
    magnitud: +(0.4 + Math.random() * 3.1).toFixed(1),
    profundidad: +(0.5 + Math.random() * 9).toFixed(1),
  }));
}

export const hora = () => {
  const d = new Date();
  return d.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour12: false }) + '.' + String(d.getMilliseconds()).padStart(3, '0');
};
