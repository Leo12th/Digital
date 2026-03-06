# DIGITAL - Soluções Integradas para Negócios

Site institucional da DIGITAL, empresa de soluções integradas para o segmento de vestuário.

## Funcionalidades

- **Modo claro/escuro** - Toggle no header
- **Internacionalização** - Português (padrão), Inglês e Espanhol
- **Páginas** - Home, Sobre, Serviços, Portfólio, Projetos, Blog, Contato
- **Blog** - Listagem paginada com artigos
- **Portfólio** - Grid com filtros e paginação
- **Compartilhamento** - Facebook, Twitter, LinkedIn, WhatsApp
- **Formulário de contato** - Integrado com Netlify Forms
- **WhatsApp flutuante** - Botão fixo para contato rápido

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Netlify

1. Conecte o repositório ao Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Adicione o formulário de contato nas configurações do Netlify (detectado automaticamente)
5. Conecte seu domínio do Registro.br nas configurações de domínio

## Logo

Coloque o arquivo do logo em `public/logo.svg` ou `public/logo.png` e atualize as referências no código se necessário.

## Imagem Hero (qualidade máxima)

Para a imagem hero ficar nítida em todas as telas (incluindo Retina/4K):

1. **Adicione os arquivos diretamente** na pasta `public/` (arraste pelo Explorer, não cole no chat — colar pode comprimir a imagem).
2. **Tamanhos recomendados:**
   - `hero.png` — **1920×1080 px** (mínimo para desktop)
   - `hero-2x.png` — **3840×2160 px** (para telas Retina/4K)
3. Mantenha a proporção **16:9**.
