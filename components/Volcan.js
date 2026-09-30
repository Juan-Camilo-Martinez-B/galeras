import { useId } from 'react';

// Volcán ilustrado en SVG. Server Component sin estado: las animaciones
// (humo, chispas, latido del cráter) viven en globals.css.
//  - color:  tono de la lava / resplandor.
//  - activo: false = volcán dormido (sin lava ni chispas, solo humo suave).
export default function Volcan({ size = 160, color = 'var(--lava)', activo = true, className = '', titulo = 'Volcán' }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gMont = `m${id}`, gLava = `l${id}`, gGlow = `g${id}`;
  return (
    <svg
      className={`volcan ${activo ? 'activo' : 'dormido'} ${className}`}
      width={size} height={size * 0.8} viewBox="0 0 200 160"
      role="img" aria-label={titulo} style={{ '--lava': color }}
    >
      <defs>
        <linearGradient id={gMont} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d7a55" />
          <stop offset=".5" stopColor="#1b4a33" />
          <stop offset="1" stopColor="#0c2318" />
        </linearGradient>
        <linearGradient id={gLava} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd166" />
          <stop offset=".35" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={gGlow}>
          <stop offset="0" stopColor={color} stopOpacity=".95" />
          <stop offset=".5" stopColor={color} stopOpacity=".35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse className="v-glow" cx="100" cy="46" rx="70" ry="46" fill={`url(#${gGlow})`} />

      <g className="v-humo" fill="#b9c8bf">
        <circle cx="96" cy="38" r="7" />
        <circle cx="106" cy="34" r="9" />
        <circle cx="100" cy="30" r="6" />
        <circle cx="92" cy="32" r="5" />
      </g>

      <path d="M6 150 L72 46 Q100 38 128 46 L194 150 Z" fill={`url(#${gMont})`} />
      <path d="M6 150 L48 86 Q72 100 62 150 Z" fill="#1f8a55" opacity=".5" />
      <path d="M194 150 L152 86 Q132 104 142 150 Z" fill="#1f8a55" opacity=".4" />
      <path d="M40 150 L58 122 L70 150 Z" fill="#26a066" opacity=".55" />
      <path d="M126 150 L142 118 L156 150 Z" fill="#26a066" opacity=".45" />

      <ellipse cx="100" cy="47" rx="27" ry="7.5" fill="#2a0906" />
      <ellipse className="v-crater" cx="100" cy="47" rx="21" ry="5.5" fill={color} />

      <g className="v-lava" fill={`url(#${gLava})`}>
        <path d="M82 50 C78 68 68 80 70 100 C72 118 64 132 60 150 L74 150 C76 130 84 118 80 100 C78 84 90 72 92 52 Z" />
        <path d="M112 50 C118 66 128 76 126 96 C124 112 134 128 140 150 L128 150 C124 130 114 116 116 96 C118 80 108 68 106 52 Z" />
        <path d="M99 52 C96 70 104 82 99 102 L106 102 C110 82 102 70 105 52 Z" opacity=".85" />
      </g>

      <g className="v-chispas" fill={color}>
        <circle cx="88" cy="46" r="2.6" style={{ '--dx': '-22px' }} />
        <circle cx="96" cy="45" r="3" style={{ '--dx': '-8px' }} />
        <circle cx="102" cy="44" r="2.2" style={{ '--dx': '4px' }} />
        <circle cx="108" cy="45" r="3" style={{ '--dx': '14px' }} />
        <circle cx="114" cy="46" r="2.4" style={{ '--dx': '26px' }} />
        <circle cx="100" cy="46" r="1.8" style={{ '--dx': '-14px' }} />
      </g>

      <ellipse cx="100" cy="151" rx="98" ry="6" fill="#0b2419" />
    </svg>
  );
}
