export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const VOLCANES = [
  { slug: 'galeras', nombre: 'Galeras', ubicacion: 'Nariño, Colombia', altura: 4276, tipo: 'Estratovolcán', ultima: '2010', nivel: 'Amarillo', color: '#c9a400',
    desc: 'El volcán más activo de Colombia domina Pasto. Su cráter de 320 m de profundidad ha emitido gases y ceniza de forma casi continua desde la era colonial.' },
  { slug: 'nevado-del-ruiz', nombre: 'Nevado del Ruiz', ubicacion: 'Caldas / Tolima, Colombia', altura: 5321, tipo: 'Estratovolcán glaciar', ultima: '2023', nivel: 'Amarillo', color: '#d6432b',
    desc: 'Su erupción de 1985 derritió parte del glaciar y sepultó Armero. Hoy es uno de los volcanes mejor vigilados del continente.' },
  { slug: 'purace', nombre: 'Puracé', ubicacion: 'Cauca, Colombia', altura: 4650, tipo: 'Estratovolcán', ultima: '2020', nivel: 'Amarillo', color: '#1d6b62',
    desc: 'Forma parte de la Cadena Volcánica de los Coconucos. Sus fumarolas de azufre son visibles desde varios kilómetros.' },
  { slug: 'cotopaxi', nombre: 'Cotopaxi', ubicacion: 'Cotopaxi, Ecuador', altura: 5897, tipo: 'Estratovolcán', ultima: '2015', nivel: 'Amarillo', color: '#5a4fa3',
    desc: 'Uno de los volcanes activos más altos del mundo. Su cono casi perfecto está cubierto por un glaciar permanente.' },
];

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
