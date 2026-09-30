export const dynamic = 'force-dynamic';

// Señal sintética continua: función del tiempo real (50 muestras = 1 s).
export function GET() {
  const now = Date.now() / 1000;
  const evento = Math.sin(now / 9) > 0.85 ? 3 : 1; // "sacudidas" periódicas
  const muestras = Array.from({ length: 50 }, (_, i) => {
    const t = now - (49 - i) / 50;
    return evento * (Math.sin(2 * Math.PI * 1.5 * t) + 0.5 * Math.sin(2 * Math.PI * 6 * t)) + (Math.random() - 0.5) * 0.6;
  });
  return Response.json({ muestras });
}
