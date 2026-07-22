# Landing Page Desentupidora J.E. — Produção

Landing page oficial de alto desempenho, responsiva, otimizada para SEO local e pronta para conversão para a **Desentupidora J.E.** em Santa Maria - RS e Região.

---

## 🌐 Informações de Produção

* **URL Oficial**: [https://desentupidoraje.com.br/](https://desentupidoraje.com.br/)
* **Status**: **APROVADO PARA PRODUÇÃO** (Versão v1.0.0 publicada e ativa)
* **Ambiente**: Produção (`production`) com indexação liberada em buscadores.

---

## ⚙️ Configuração do Ambiente de Produção

A aplicação é configurada centralizadamente no arquivo [`config.js`](config.js):

```javascript
deployment: {
  environment: "production",
  productionDomain: "desentupidoraje.com.br",
  productionUrl: "https://desentupidoraje.com.br",
  pagesUrl: "https://desentupidoraje.pages.dev",
  allowIndexing: true
}
```

---

## 🏗️ Arquitetura e Hospedagem

* **Domínio Oficial**: Registrado no Registro.br (`desentupidoraje.com.br`).
* **Gerenciamento de DNS**: Cloudflare DNS com proxy ativo e HTTPS automático.
* **Hospedagem**: Cloudflare Pages vinculado ao repositório GitHub.
* **Repositório**: GitHub (`Antigravity-Solutions/desentupidora-je`).
* **Estrutura de Domínio & Redirecionamentos (HTTP 301)**:
  * Domínio principal sem `www`: `https://desentupidoraje.com.br/` (HTTP 200)
  * `www` redirecionando permanentemente: `https://www.desentupidoraje.com.br/` → `https://desentupidoraje.com.br/` (HTTP 301)
  * Subdomínio temporário Cloudflare Pages redirecionando permanentemente: `https://desentupidoraje.pages.dev/` → `https://desentupidoraje.com.br/` (HTTP 301)

---

## 🔍 SEO e Indexação

* **Link Canonical**: `<link rel="canonical" href="https://desentupidoraje.com.br/">` presente diretamente no HTML entregue.
* **Meta Robots**: `<meta name="robots" content="index, follow">` ativado no HTML e em runtime.
* **Arquivo `robots.txt`**: Liberado para rastreamento (`Allow: /`) e referenciando o sitemap oficial.
* **Sitemap XML**: Publicado e acessível em `https://desentupidoraje.com.br/sitemap.xml`.
* **Social Preview (Open Graph & Twitter Cards)**:
  * `og:url` e `twitter:url`: `https://desentupidoraje.com.br/`
  * `og:image` e `twitter:image`: `https://desentupidoraje.com.br/assets/img/og-image.webp` (URL absoluta HTTP 200).
* **Dados Estruturados JSON-LD**: Marcação `LocalBusiness` com nome, descrição, horário 24h, localização em Santa Maria - RS, links sociais e telefone internacional normalizado (`+5555996766820`).
* **Google Search Console**: Propriedade de domínio `desentupidoraje.com.br` cadastrada e verificada via TXT DNS na Cloudflare; sitemap enviado com sucesso e indexação solicitada.

---

## 🔒 Cabeçalhos de Segurança HTTP

Os cabeçalhos declarados no arquivo `_headers` são aplicados pelo Cloudflare Pages na produção:

* `X-Content-Type-Options: nosniff`
* `Referrer-Policy: strict-origin-when-cross-origin`
* `X-Frame-Options: SAMEORIGIN`
* `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 📂 Estrutura de Arquivos do Repositório

```text
desentupidora_je/
├── index.html          # Estrutura HTML semântica e SEO estático
├── styles.css          # Estilos CSS modernos e responsivos
├── script.js           # Renderização dinâmica, SEO e manipulação de DOM
├── config.js           # Configurações do negócio, SEO e deployment
├── robots.txt          # Regras de rastreamento dos buscadores
├── sitemap.xml         # Sitemap oficial de produção
├── _headers            # Cabeçalhos de segurança HTTP no Cloudflare Pages
├── _redirects          # Regras de redirecionamento 301 no Cloudflare Pages
├── 404.html            # Página de erro 404 personalizada
├── README.md           # Documentação geral do projeto
├── assets/             # Imagens otimizadas (WebP, JPG, ICO)
└── docs/               # Walkthrough, evidências técnicas e templates
```

---

## 🚀 Como Executar Localmente

Não requer backend nem gerenciadores de pacotes para execução:
1. Clone o repositório: `git clone https://github.com/Antigravity-Solutions/desentupidora-je.git`
2. Abra o arquivo `index.html` diretamente no navegador de sua preferência.

---

## 📈 Resumo de Performance (Lighthouse em Produção)

* **Desktop**: Performance **99** | Acessibilidade **96** | Best Practices **100** | SEO **100**
* **Mobile**: Performance **76** | Acessibilidade **96** | Best Practices **100** | SEO **100**
