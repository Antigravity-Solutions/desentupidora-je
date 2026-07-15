# Landing Page Template - Negócios Locais

Template HTML/CSS/JS de alto desempenho, responsivo e esteticamente premium para pequenos negócios locais. Baseado na estrutura e layout de alta conversão da Desentupidora J.E., este template é totalmente parametrizável por meio de um único arquivo de configuração (`config.js`).

---

## 📂 Estrutura de Arquivos

```text
landing-page-local-business/
├── index.html          # Estrutura semântica e esqueleto da página
├── styles.css          # Estilos premium, variáveis e placeholders
├── script.js           # Motor de renderização dinâmica e interações
├── config.js           # Único arquivo de edição (Configurações do cliente)
├── README.md           # Instruções de personalização e checklist
└── assets/
    └── img/            # Pasta destinada às fotos reais do cliente
```

---

## 🛠️ Como Funciona o Template

O template funciona de forma 100% estática e dinâmica:
1. O navegador carrega o `config.js` que define a constante global `siteConfig`.
2. Em seguida, o `script.js` lê as informações do `siteConfig` (ou aciona os valores de fallback caso estejam ausentes) e preenche automaticamente o HTML, injeta as metatags de SEO, atualiza a paleta de cores e renderiza os grids (serviços, diferenciais, depoimentos, galeria, FAQs e mapas).
3. **Não requer backend, build, React ou banco de dados.** Funciona abrindo apenas o `index.html` diretamente no navegador.

---

## 👥 Como Criar um Novo Cliente a partir Deste Template

Para criar uma nova landing page para um cliente diferente usando esta base:

1. **Copie a pasta**: Copie a pasta inteira `landing-page-local-business` para um novo diretório (ex: `projeto-cliente-x`).
2. **Edite o `config.js`**: Abra o arquivo `config.js` na raiz e altere as propriedades do objeto `siteConfig`:
   - Nome do negócio (`business.name`)
   - Telefone e WhatsApp (`business.phonePrimary`, `business.whatsappRaw`, etc.)
   - Serviços prestados (`services`)
   - Cidade e região atendida (`business.city` e `business.region`)
   - Cores da marca (`theme.primary`, `theme.secondary`, etc.)
3. **Insira as fotos do cliente**: Cole as imagens reais do cliente dentro de `assets/img/`.
4. **Referencie no config.js**: No `config.js`, preencha as chaves de imagem do Hero (`hero.image`) e da Galeria (`gallery[].image`) com o caminho correspondente (ex: `"assets/img/foto-equipe.jpg"`).
5. **Teste localmente**: Dê dois cliques em `index.html` para abrir a página no navegador e certifique-se de que tudo está perfeito.

---

## 🎨 Como Personalizar o Tema de Cores

Dentro de `config.js`, a chave `theme` permite alterar instantaneamente a paleta de cores do site:

```javascript
theme: {
  primary: "#0d2c54",     // Cor principal de cabeçalhos e seções escuras
  secondary: "#c81d25",   // Cor de botões e itens de conversão primários
  accent: "#ffbe0b",      // Cor de estrelas de avaliação e detalhes
  whatsapp: "#25d366"     // Cor do botão flutuante de WhatsApp
}
```

*Nota: Os efeitos de hover dos botões e as variações de cores mais claras/escuras são gerados automaticamente usando funções nativas do CSS (`color-mix`), garantindo uma transição visual perfeita sem configurações manuais adicionais.*

---

## 🗺️ Como Inserir o Google Maps Real

Para substituir o placeholder cinza do mapa pelo mapa de localização real da empresa:

1. Vá ao Google Maps e procure pelo endereço ou nome da empresa.
2. Clique em **Compartilhar** e selecione a aba **Incorporar um mapa**.
3. Copie o código HTML gerado (que começa com `<iframe...`).
4. Cole o código iframe completo ou apenas a URL do atributo `src` na chave `business.googleMapsEmbed` do `config.js`:
   ```javascript
   googleMapsEmbed: '<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" ...></iframe>'
   ```
5. Salve o arquivo. O `script.js` renderizará automaticamente o mapa real no lugar do placeholder.

---

## 🚀 Como Publicar na Vercel (Gratuitamente)

A Vercel é excelente para hospedar landing pages estáticas por ser rápida, segura e grátis.

### Opção 1: Via Vercel Dashboard (Sem Linha de Comando)
1. Coloque o seu projeto em um repositório no GitHub (ex: repositório privado ou público).
2. Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita.
3. Clique em **Add New** > **Project**.
4. Conecte com o GitHub e selecione o repositório da landing page criada.
5. Deixe as configurações padrões (o framework será detectado como "Other" e o diretório de build vazio).
6. Clique em **Deploy**. O site estará no ar em poucos segundos!

### Opção 2: Via Vercel CLI (Direto do Terminal)
1. Instale a CLI da Vercel globalmente (se tiver o Node.js instalado):
   ```bash
   npm install -g vercel
   ```
2. Na raiz do projeto da landing page do cliente, digite:
   ```bash
   vercel
   ```
3. Siga os passos na tela para logar e criar o projeto.
4. Quando finalizar e o teste estiver correto, suba em produção com:
   ```bash
   vercel --prod
   ```

---

## 📋 Checklist Antes da Publicação

> [!WARNING]
> Os depoimentos fornecidos por padrão são **fictícios (mock dados)** para demonstração de layout. É obrigatório coletar avaliações reais do cliente antes de colocar o site em produção.

Realize este checklist completo antes de entregar o site para o cliente final:

- [ ] **Nome da Empresa**: Confirmar se o nome está escrito corretamente no `config.js`.
- [ ] **Telefone Comercial**: Ligar para o número do `config.js` para garantir que está ativo.
- [ ] **WhatsApp**: Clicar no link gerado e enviar mensagem de teste para confirmar se o número e o DDD estão corretos.
- [ ] **Cidade e Região**: Revisar os textos automáticos da área de cobertura.
- [ ] **Serviços**: Garantir que todos os serviços listados condizem com o escopo de atuação do cliente.
- [ ] **Imagens Reais**: Substituir todas as imagens de placeholder cinza por fotos reais enviadas pelo cliente.
- [ ] **Avaliações**: Substituir as avaliações fictícias por depoimentos reais enviados por clientes da empresa (ex: Google Maps, WhatsApp ou prints).
- [ ] **Google Maps**: Inserir o iframe de localização real da empresa ou raio de atendimento.
- [ ] **SEO**: Revisar o título da página e a descrição de metatag para indexação no Google.
- [ ] **Responsividade**: Testar a abertura do site em computadores, tablets e smartphones de tamanhos variados.
- [ ] **Hospedagem**: Concluir o deploy na Vercel ou hospedagem correspondente.
