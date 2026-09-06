# Walkthrough — Issue #7: eventos de contato

## Objetivo e contexto

Instrumentar as intenções de contato da landing page com `contact_click`, distinguindo canal, localização e identificação do CTA. Referência: [Issue #7](https://github.com/Antigravity-Solutions/desentupidora-je/issues/7).

Revisão em 06/09/2026: branch `feat/issue-007-conversion-events`; HEAD, main e origin/main em `99aa1a0` na inspeção inicial. Nenhum commit exclusivo da branch. `index.html` e `script.js` modificados; plano e evidência local ainda não rastreados. Diff inicial: 43 inserções e 15 remoções nos dois arquivos de código. A revisão de encerramento acrescenta somente documentação, preservando a implementação recebida.

## Arquivos alterados

- `index.html`: metadados dos CTAs estáticos e correção do iframe noscript para `GTM-K9G7FTGG`.
- `script.js`: metadados dos CTAs dinâmicos, função `trackEvent()` e listener delegado.
- `docs/issue-007-conversion-events.md`: plano e resultados da execução anterior; preservado como registro histórico.
- `docs/evidence/issue-007/local-results.json`: resultados estruturados da execução anterior.
- `docs/walkthrough-issue-007.md`: este encerramento e distinção entre evidências locais e externas.
- `README.md`: seção de analytics e referência a este documento, antes ausentes.

`config.js` já continha o ID correto e não foi alterado.

## Arquitetura do evento

Fluxo: clique no link ou descendente → listener único de analytics no document → closest → dataset → trackEvent → window.dataLayer → GTM → GA4.

```javascript
{
  event: 'contact_click',
  contact_type: 'whatsapp',
  contact_location: 'hero',
  contact_label: 'Chamar no WhatsApp'
}
```

O listener é inicializado após renderização e vinculação dos links. A delegação também cobre elementos dinâmicos e cliques em SVG. `trackEvent` cria a camada ausente, ignora nomes inválidos e isola falhas de push. O evento é enviado de forma síncrona, sem preventDefault, atraso ou chamada direta ao GA4. Os três parâmetros não incluem telefone, URL ou mensagem do visitante. O ID do noscript deve permanecer sincronizado com `analytics.googleTagManagerId` em config.js.

## Elementos rastreados

| Canal | Localizações | Total |
|---|---|---:|
| whatsapp | header, hero, how_it_works, location_section, faq, final_cta, footer, floating_button | 8 |
| phone | hero, emergency_card, final_cta, footer | 4 |
| instagram | footer | 1 |
| maps | location_section | 1 |

A matriz completa de labels e destinos está na [evidência local](evidence/issue-007/local-results.json). O endereço textual não é clicável; o link externo do Maps é instrumentado.

## Testes executados e evidências/resultados

### Execução anterior registrada no repositório

O [plano e relatório local](issue-007-conversion-events.md) registra testes automatizados via HTTP com Playwright/Chrome headless em 06/09/2026: 14/14 CTAs aprovados, parâmetros completos, evento único, destinos, target e mensagens preservados; cliques em descendentes SVG; dataLayer ausente/nulo/inválido e push com exceção; link acrescentado após inicialização; navegação interna sem contact_click; ausência de erros de console no cenário isolado.

Também registra FAQ, menu mobile/Escape, scrollspy, botão flutuante, noscript com JavaScript desativado e abertura de nova aba WhatsApp com resposta externa simulada. O JSON confirma matriz, indicadores defensivos, navegação não cancelada, regressões e console vazio. O script de teste não está incluído nessa pasta, e esses testes de navegador não foram reexecutados nesta revisão.

### Verificações desta revisão

- Leitura da Issue #7 e comparação com diff, plano e evidência estruturada: cobertura local compatível com o escopo.
- `node --check script.js`: aprovado.
- `node --check config.js`: aprovado.
- `git diff --check`: aprovado.
- Conferência de IDs: config.js e noscript usam `GTM-K9G7FTGG`.

Não há package.json ou etapa de build configurada. Não foram acrescentados testes nem alterado o código funcional nesta revisão.

### Testes manuais e GTM/GA4

O usuário informou: “No Tag manager foi verificado e testado.” Essa declaração é a evidência de validação manual externa do GTM aceita para este encerramento. Não foram fornecidos roteiro, capturas, valores observados, versão publicada ou detalhes dos testes; não se atribuem esses detalhes à declaração.

O recebimento no GA4, DebugView, Realtime e marcação como evento principal/conversão não foram observados nesta revisão e não possuem comprovação nos arquivos inspecionados. A expectativa contratual é encaminhar contact_click com contact_type, contact_location e contact_label. Não se afirma que cada configuração externa foi auditada. As notas de Gate B no plano descrevem a situação da execução anterior; a informação posterior do usuário sobre o GTM está registrada aqui.

## Limitações

Um clique mede intenção, não mensagem enviada, ligação atendida ou serviço contratado. Interações internas do iframe Maps não são cobertas. Bloqueadores e falhas de rede podem impedir entrega externa mesmo com push local correto. Os testes locais anteriores isolaram serviços externos e não provam recebimento no GA4. Não houve envio de mensagens ou realização de ligações na evidência registrada. A publicação em produção e sua validação após merge não são comprovadas por este documento.

## Conclusão

A implementação atende ao escopo de instrumentação local da Issue #7 e está documentada para integração à main. GTM verificado e testado conforme declaração do usuário; detalhes de validação GA4 permanecem sem evidência independente. O encerramento não amplia funcionalidades nem modifica a configuração externa de analytics.
