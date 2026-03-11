# DIGITAL - Soluções Integradas para Negócios

Site institucional da DIGITAL, empresa de soluções integradas para o segmento de vestuário.

## Funcionalidades

- **Modo claro/escuro** - Toggle no header
- **Internacionalização** - Português (padrão), Inglês e Espanhol
- **Páginas** - Home, Sobre, Serviços, Portfólio, Projetos, Blog, Contato
- **Consulta CNPJ** - Ferramenta para consultar CNPJ (API cnpja) em `/projetos/consulta-cnpj`
- **Provador Virtual** - Demo com sugestões de looks via IA em `/provador`
- **Blog** - Listagem paginada com artigos
- **Portfólio** - Grid com filtros e paginação
- **Compartilhamento** - Facebook, Twitter, LinkedIn, WhatsApp
- **Formulário de contato** - Envio via API (Nodemailer)
- **WhatsApp flutuante** - Botão fixo para contato rápido
- **Bot Baileys** - Chatbot WhatsApp com IA (pasta `whatsapp-bot/`)

## Desenvolvimento

**Terminal 1 - API:**
```bash
npm install
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

O Vite faz proxy de `/api` para o servidor na porta 3000.

## Build e produção

```bash
npm run build
npm run server
```

O servidor Express serve o build em `dist/` e as rotas `/api/*`.

## Variáveis de ambiente

Crie `.env` na raiz (copie de `.env.example`):

- `PORT` - Porta do servidor (padrão 3000)
- `GEMINI_API_KEY` - Para Provador IA e Bot Baileys (gratuito em https://aistudio.google.com/apikey)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Para formulário de contato
- `CONTACT_EMAIL` - E-mail de destino do formulário

## Deploy no CyberPanel (VPS)

1. Build: `npm run build`
2. Upload: `dist/`, `server/`, `package.json`, `whatsapp-bot/`
3. SSH: `npm install --production && pm2 start server/index.js --name api`
4. Bot: `cd whatsapp-bot && npm install && pm2 start index.js --name baileys`
5. Configure reverse proxy no CyberPanel (porta 80 → 3000)

## Logo

Coloque o arquivo do logo em `public/logo.svg` ou `public/logo.png` e atualize as referências no código se necessário.

## Imagem Hero (qualidade máxima)

Para a imagem hero ficar nítida em todas as telas (incluindo Retina/4K):

1. **Adicione os arquivos diretamente** na pasta `public/` (arraste pelo Explorer, não cole no chat — colar pode comprimir a imagem).
2. **Tamanhos recomendados:**
   - `hero.png` — **1920×1080 px** (mínimo para desktop)
   - `hero-2x.png` — **3840×2160 px** (para telas Retina/4K)
3. Mantenha a proporção **16:9**.
