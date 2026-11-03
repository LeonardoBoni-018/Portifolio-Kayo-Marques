# Kayo Marques | Storyframe

Site-portfólio do Kayo Marques (videomaker, fotógrafo e storymaker), feito em React + Vite a partir do protótipo do modo design.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/
npm run preview  # serve o build localmente
```

## Estrutura

```
public/media/fotos/    fotos (ainda de exemplo, Unsplash)
public/media/videos/   vídeos (ainda de exemplo, Pexels)
public/logo/           logo do Kayo em SVG (selo e logo completa, versões escura e clara)
public/favicon.svg     ícone da aba
src/data.js            todo o conteúdo: categorias, stories, capítulos, WhatsApp, Instagram
src/styles.css         estilos e temas claro/escuro
src/components/        Nav, Hero, Sobre, Trabalhos, Cobertura, Contato, Visualizador, Logo
src/lib/               GSAP Flip, revelação ao rolar e controle dos vídeos
```

Ordem da página: story de abertura, Sobre o Kayo, Trabalhos (feed com filtros), Cobertura (antes, durante e depois), Contato.

## Logo

O selo junta as iniciais "k | m" dentro do anel de um story, no mesmo formato que o Kayo usa para nomear
os destaques no Instagram ("A | J", "R | D"). A tipografia é a Castoro, a mesma dos títulos do site.
No site ele aparece no menu, no avatar dos stories, na seção Sobre e no rodapé (`src/components/Logo.jsx`).

Os arquivos em `public/logo/` usam texto com a fonte Castoro, carregada do Google Fonts. Para gráfica ou
editores que não carregam fontes da web, converta o texto em curvas (no Illustrator, Inkscape ou Figma)
antes de usar.

## Trocando as fotos e vídeos de exemplo

As mídias atuais são provisórias. Quando chegarem as fotos e vídeos reais do Kayo:

1. Substitua os arquivos em `public/media/fotos/` e `public/media/videos/` mantendo os mesmos nomes, **ou**
2. Adicione arquivos novos e ajuste os caminhos em `src/data.js`.

A foto do Kayo na seção Sobre é `public/media/fotos/kayo-retrato.jpg` (formato vertical 4:5).
Fotos verticais (9:16) funcionam melhor nos stories; os vídeos tocam mudos e em loop, só quando estão visíveis.
Depois, remova a nota de "Protótipo" no rodapé (`src/App.jsx`).
