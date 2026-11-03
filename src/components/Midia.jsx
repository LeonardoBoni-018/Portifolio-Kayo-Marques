// Foto ou vídeo de um slide/card. Vídeos começam mudos e só tocam quando visíveis (lib/media.js).
export default function Midia({ img, v, alt = '', preload = 'metadata', loading }) {
  if (v) return <video className="k-v" src={v} poster={img} muted loop playsInline preload={preload} />;
  return <img src={img} alt={alt} loading={loading} />;
}
