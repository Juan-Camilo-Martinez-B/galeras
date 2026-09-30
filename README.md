# Observatorio Galeras · Patrones de Rendering (Next.js 15)

| Ruta | Patrón | Cómo se activa |
|---|---|---|
| `/`, `/volcanes`, `/volcanes/[slug]` | **SSG** | Sin datos dinámicos + `generateStaticParams` |
| `/boletin` | **ISR** | `export const revalidate = 15` |
| `/alertas` | **SSR** | `export const dynamic = 'force-dynamic'` |
| `/panel` | **Streaming SSR** | `<Suspense>` + Server Components async |
| `/sismografo` | **CSR** | `'use client'`, `useEffect` + `fetch('/api/sismos')` + **Web Worker** |

## Ejecutar (en modo producción para ver las diferencias)
```bash
npm install
npm run build   # la tabla final muestra ○ Static, ● SSG, ƒ Dynamic
npm start
```

## Desplegar en la nube (Vercel)
```bash
npm i -g vercel && vercel --prod
```
O importa el repositorio de GitHub en vercel.com (ISR y streaming funcionan sin configuración).

## Experimentos
1. Recarga `/volcanes`: la hora del sello no cambia (SSG).
2. En `/boletin` recarga durante 15 s y luego dos veces más: la hora cambia con retraso (ISR).
3. Recarga `/alertas`: hora y datos nuevos siempre (SSR).
4. Abre `/panel`: las tarjetas aparecen a 1 s, 2.5 s y 4 s (streaming).
5. En `/sismografo` abre DevTools → Network: verás el fetch cada segundo (CSR).
