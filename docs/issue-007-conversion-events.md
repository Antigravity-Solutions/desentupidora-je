# Issue #7 — Plano e validação do Gate A

## Situação inicial e escopo

Inspeção em 06/09/2026: main em `99aa1a0`, limpa e atualizada com origin/main. Issue #7 aberta; os checkboxes de trackEvent estavam marcados, mas a função não existia na main. Branch criada: `feat/issue-007-conversion-events`. O noscript tinha GTM-ABC1234, enquanto config.js usa GTM-K9G7FTGG.

Implementar somente o código local e sua validação. Sem commit, push, merge, deploy ou alteração externa de GTM/GA4. A Issue permanece aberta até validar as plataformas Google.

## Sequência e arquitetura

1. Sincronizar o ID literal do noscript com config.js (GTM-K9G7FTGG). Ao trocar o contêiner, atualizar ambos; JavaScript não atualiza noscript quando está desativado.
2. Acrescentar metadados aos links estáticos e aos templates dinâmicos, mantendo os binders de href e mensagens.
3. Criar trackEvent(eventName, eventData) em script.js, inicializando dataLayer ausente e isolando falhas de push para preservar o contato.
4. Inicializar uma única delegação de click no document depois dos renderers e binders; closest identifica cliques em SVG, ícones e texto interno.
5. Validar todos os links, parâmetros, ausência de duplicação e regressões de UI.

Fluxo: link → dataset → listener central → trackEvent → window.dataLayer → GTM → GA4.

```js
{ event: 'contact_click', contact_type: 'whatsapp',
  contact_location: 'hero', contact_label: 'Chamar no WhatsApp' }
```

Tipos: whatsapp, phone, instagram, maps. Labels são identificadores editoriais estáveis; não incluem URL, telefone ou mensagem do visitante. Fallbacks unknown são defensivos e não devem aparecer nos CTAs implementados. Não usar preventDefault, timers, callbacks de navegação nem chamadas diretas ao GA4. O push é síncrono; recebimento remoto exige Gate B. Um clique indica intenção de contato, não atendimento concluído.

## Matriz de elementos

| Tipo | Localização | Elemento |
|---|---|---|
| whatsapp | header | WhatsApp |
| whatsapp | hero | Chamar no WhatsApp |
| phone | hero | Ligar agora |
| phone | emergency_card | Central de Atendimento |
| whatsapp | how_it_works | Enviar mensagem |
| whatsapp | location_section | Consultar Endereço |
| whatsapp | faq | Conversar agora (dinâmico) |
| whatsapp | final_cta | Chamar no WhatsApp (dinâmico) |
| phone | final_cta | Ligar Agora (dinâmico) |
| whatsapp | footer | WhatsApp |
| phone | footer | Telefone |
| instagram | footer | Instagram |
| whatsapp | floating_button | WhatsApp |
| maps | location_section | Abrir no Google Maps (dinâmico) |

Endereço textual não é link. Interações internas do iframe de Maps não são rastreadas pela página; o link externo é rastreado.

## Validações locais e critérios de aceite

- Conferir sintaxe JavaScript e git diff --check. Site estático, sem package.json ou build configurado.
- Servir por HTTP e verificar console e carregamento.
- Para os 14 CTAs, verificar destino, target, mensagem WhatsApp, evento único e três parâmetros completos, incluindo clique em descendente SVG.
- Verificar navegação não cancelada pelo rastreamento; testar dataLayer ausente, inválido e push com falha.
- Verificar que navegação interna não gera contact_click, e regressões de FAQ, menu mobile, scrollspy e botão flutuante.
- Confirmar igualdade do ID no noscript/config.js, inclusive HTML com JS desativado.
- Registrar resultados reais abaixo; não confundir testes locais com entrega ao GA4.

## Gate B — dependência externa

Com acesso ao GTM/GA4: criar DLV - contact_type, DLV - contact_location, DLV - contact_label; acionador de evento personalizado contact_click; tag GA4 com o mesmo nome e os três parâmetros. Validar Preview/Tag Assistant, disparo da tag, DebugView, Realtime e evento principal; publicar o contêiner com autorização e guardar evidências. Após futuro deploy, repetir a matriz na produção. Essas etapas não foram executadas nesta tarefa.

## Resultados

Validação local concluída em 06/09/2026, via HTTP e Playwright/Chrome headless. Resultado: 14/14 CTAs passaram, incluindo descendentes SVG, eventos únicos, contrato, href, target e mensagens. Passaram dataLayer ausente/nulo, objeto inválido, push com exceção e link inserido após inicialização. Navegação interna não emite contato. Nenhum erro de console/JavaScript no cenário isolado.

O observador exclusivo do teste verificou defaultPrevented=false após o listener de produção e só então cancelou a ação para evitar abrir aplicativos. Uma página separada, sem esse observador, confirmou abertura real de nova aba para o destino WhatsApp, com resposta externa simulada. Não foram enviadas mensagens nem feitas ligações. FAQ, menu mobile/Escape, scrollspy e ocultação/retorno do botão flutuante passaram. Noscript validado com JavaScript desativado.

Comandos: `node --check script.js`, `node --check config.js`, `git diff --check` e teste Playwright com o Node do runtime (Node 18 do sistema é incompatível). Não existe build aplicável. O primeiro teste do scrollspy usava active; corrigido para is-active conforme implementação existente e a execução completa passou. Nenhuma alteração de UI foi necessária.

Serviços externos foram isolados nas rotas do navegador; não se afirma carregamento real do GTM, recebimento GA4 ou funcionamento dos aplicativos externos. Evidência estruturada: [resultados locais](evidence/issue-007/local-results.json).

