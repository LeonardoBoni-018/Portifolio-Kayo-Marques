// Logo do Kayo. O selo segue o jeito como ele nomeia os destaques no Instagram
// ("A | J", "R | D"): iniciais separadas por uma barra, dentro do anel de um story.
// Letras usam currentColor; o anel usa --blush (com fallback para fora do .k-app).

export function Selo({ size = 40, anel = true, className, titulo }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" role={titulo ? 'img' : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      {anel && <circle cx="32" cy="32" r="29.5" fill="none" stroke="var(--blush, #D7A395)" strokeWidth="3" />}
      <text x="20.5" y="40.5" textAnchor="middle" fontFamily="Castoro, ui-serif, serif" fontSize="25" fill="currentColor">k</text>
      <line x1="32" y1="20" x2="32" y2="44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <text x="44.5" y="40.5" textAnchor="middle" fontFamily="Castoro, ui-serif, serif" fontSize="25" fill="currentColor">m</text>
    </svg>
  );
}

// selo + assinatura "kayo marques / storymaker"
export function Logo({ size = 40, tagline = true }) {
  return (
    <span className="k-brand">
      <Selo size={size} />
      <span className="k-brandtx">
        <span className="k-brandnm">kayo marques</span>
        {tagline && <span className="k-brandtg">storymaker</span>}
      </span>
    </span>
  );
}
