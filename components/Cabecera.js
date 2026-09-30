import Volcan from './Volcan';

// Encabezado de sección: volcán ilustrado + título + párrafo introductorio.
export default function Cabecera({ titulo, color, activo = true, children }) {
  return (
    <header className="cabecera">
      <Volcan size={130} color={color} activo={activo} titulo={`Volcán · ${titulo}`} />
      <div>
        <h1 className="titulo">{titulo}</h1>
        <p className="lead">{children}</p>
      </div>
    </header>
  );
}
