# Architecture — Calculadora AIOX

**Autor:** @architect
**Etapa:** 03 ARQUITETURA — Story Development Cycle
**Origem:** [docs/prd/epic-1-calculadora.md](prd/epic-1-calculadora.md)
**Data:** 2026-05-08
**Status:** Aprovada — pronto para @sm (Etapa 04)

---

## 1. Assess complexity

| Dimensão | Avaliação |
|----------|-----------|
| Domínio | Trivial — 4 operações + histórico FIFO |
| Estado | Local apenas (display, último operando, operador pendente, histórico) |
| I/O externo | Nenhum (sem API, sem auth, sem rede) |
| Persistência | localStorage com 1 chave |
| Concorrência | Inexistente |
| **Veredito** | **Baixa.** Qualquer abstração além do mínimo é overengineering. |

## 2. Decisão de stack

**Escolhido: HTML + CSS + JavaScript vanilla (ES modules).**

### Por quê
- React/Vue p/ uma calc de 5 stories adiciona build step, bundler, hydrate — ruído puro pro objetivo do AIOX (atravessar o ciclo).
- Vanilla = abrir `index.html` no browser e rodar. Zero `node_modules`. Diff do PR fica legível.
- Testes em `node:test` (nativo Node 20+), zero deps.

### Trade-off aceito
- Sem JSX/reatividade declarativa → manipulação DOM imperativa em `ui.js`. Dado o tamanho, é OK.
- Se a calc crescer (científicas, multi-display), migrar p/ framework. Não é o caso aqui.

## 3. Estrutura de arquivos

```
calculadora/
├── index.html          # estrutura: display, grid de botões, lista histórico
├── styles.css          # grid CSS, dark theme alinhado ao AIOX
├── src/
│   ├── calculator.js   # lógica pura: evaluate(a, op, b) → number | Error
│   ├── history.js      # load/save/push, abstrai localStorage + fallback
│   ├── ui.js           # bind DOM, dispatch eventos teclado/click
│   └── main.js         # entry point: importa e amarra tudo
└── tests/
    ├── calculator.test.js
    └── history.test.js
```

## 4. Módulos & contratos

### `calculator.js` (puro, sem DOM)
```js
export function evaluate(a, op, b) // → number | { error: string }
export function formatDisplay(n)   // → string (arredonda 10 casas, sci notation se preciso)
```

### `history.js`
```js
export function loadHistory()              // → Array<Entry>, [] se vazio/erro
export function pushHistory(entry)         // muta + persiste, FIFO 10
export function clearHistory()
// Entry = { a:number, op:string, b:number, result:number, ts:number }
```

### `ui.js`
- Listener delegado no grid (`click`).
- Listener `keydown` no `document` com mapa.
- Estado de UI em closure: `{ displayValue, pendingOp, leftOperand, errored }`.
- Em erro, aplica classe `.errored` no display e ignora operadores até `C`.

## 5. Decisões pendentes do PRD — resolvidas

| Pendência | Decisão |
|-----------|---------|
| Stack | Vanilla JS (justificativa §2) |
| Precisão flutuante | `Number.parseFloat(n.toPrecision(12))` — corta `0.1+0.2=0.30000000000000004` sem dep externa. Suficiente p/ os ACs. |
| Framework de teste | `node:test` + `node:assert` nativos (Node 20+) |

## 6. Modelo de estado (UI)

```
INITIAL ──digit──▶ ENTERING_LEFT ──op──▶ AWAITING_RIGHT ──digit──▶ ENTERING_RIGHT
   ▲                                                                       │
   └─────────────── C ◀── ERRORED ◀── op inválido ──────── = ──────────────┘
                                                          │
                                                          ▼
                                                       RESULT (= INITIAL c/ display preenchido)
```

## 7. Riscos arquiteturais & mitigação

| # | Risco | Mitigação |
|---|-------|-----------|
| A1 | DOM imperativo vira spaghetti | Limitar `ui.js` a ~150 linhas; se crescer, refatorar p/ render() único |
| A2 | `localStorage` quota / disabled (modo privado) | `history.js` faz try/catch; fallback array em memória |
| A3 | Eventos de teclado conflitam c/ atalhos do browser | `preventDefault` só em teclas mapeadas, nunca global |
| A4 | Encadeamento (`2+3+4`) calculando errado | Story 1.2 AC explícito; teste cobre 3 operandos |

## 8. Critérios de aceite arquiteturais

- [ ] Zero `npm install` necessário p/ rodar a UI (abrir HTML basta).
- [ ] Testes rodam com `node --test tests/`.
- [ ] `calculator.js` importável em Node sem tocar DOM (testabilidade).
- [ ] Nenhum módulo > 200 linhas.

## 9. Próximo passo

Handoff para **@sm** → `*draft` da Story 1.1 → `docs/stories/1.1.story.md`.
