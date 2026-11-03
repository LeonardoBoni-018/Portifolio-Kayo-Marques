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
src/data.js            todo o conteúdo: categorias, stories, capítulos, WhatsApp, Instagram
src/styles.css         estilos e temas claro/escuro
src/components/        Nav, Hero, Destaques, Historias (anel 3D), Cobertura, Contato, Visualizador
src/lib/               GSAP (Draggable, Inertia, Flip), revelação ao rolar e controle dos vídeos
```

## Trocando as fotos e vídeos de exemplo

As mídias atuais são provisórias. Quando chegarem as fotos e vídeos reais do Kayo:

1. Substitua os arquivos em `public/media/fotos/` e `public/media/videos/` mantendo os mesmos nomes, **ou**
2. Adicione arquivos novos e ajuste os caminhos em `src/data.js`.

Fotos verticais (9:16) funcionam melhor nos stories; os vídeos tocam mudos e em loop, só quando estão visíveis.
Depois, remova a nota de "Protótipo" no rodapé (`src/App.jsx`).
