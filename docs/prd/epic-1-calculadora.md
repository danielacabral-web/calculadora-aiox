# Epic 1 — Calculadora AIOX

**Autor:** @pm
**Etapa:** 02 PRODUTO — Story Development Cycle
**Origem:** [docs/brief.md](../brief.md)
**Data:** 2026-05-08
**Status:** Sharded — pronto para @architect (Etapa 03)

---

## 1. Visão

Calculadora web client-side que executa as quatro operações básicas com histórico persistente, servindo como caso-canônico para o ciclo completo do AIOX.

## 2. Objetivos do produto

| # | Objetivo | Métrica |
|---|----------|---------|
| O1 | Cobertura funcional das 4 operações | 100% testes unitários PASS |
| O2 | Resiliência a inputs inválidos | Zero crashes em fuzzing manual (div/0, NaN, Infinity, overflow) |
| O3 | Persistência do histórico | Reload mantém últimas 10 ops |
| O4 | Acessibilidade básica | Navegável por teclado, aria-labels nos botões |

## 3. Personas (resumo)

- **Estudante AIOX:** quer rodar o ciclo, ler o código, abrir o PR.
- **Usuário casual:** entra, calcula, sai. Sem onboarding.

## 4. Stories (epic shard)

### Story 1.1 — UI base + display
Como usuário, vejo um display e um teclado de botões (0-9, +, -, ×, ÷, =, C) para que eu possa montar uma operação visualmente.

**AC:**
- Grid 4x5 de botões.
- Display único, alinhado à direita, monospace.
- Botão `C` zera o display.

### Story 1.2 — Operações básicas
Como usuário, executo soma, subtração, multiplicação e divisão para obter resultado correto.

**AC:**
- `2 + 3 = 5`, `10 - 4 = 6`, `6 × 7 = 42`, `20 ÷ 4 = 5`.
- Encadeamento (`2 + 3 + 4 = 9`) funciona.
- Resultado vira operando do próximo cálculo.

### Story 1.3 — Edge cases numéricos
Como usuário, recebo mensagem clara em casos limite ao invés de crash.

**AC:**
- `÷ 0` → display mostra `Erro` e bloqueia operadores até `C`.
- Resultado > `Number.MAX_SAFE_INTEGER` → display mostra notação científica.
- Precisão flutuante: arredondar para 10 casas decimais no display (decisão @architect Etapa 03).

### Story 1.4 — Histórico persistente
Como usuário, vejo as últimas 10 operações em uma lista lateral, mantida após reload.

**AC:**
- Lista exibe `operando1 OP operando2 = resultado`.
- Limite 10; FIFO ao estourar.
- Persistido em `localStorage` chave `aiox-calc-history`.
- Se localStorage indisponível, fallback em memória + console.warn.

### Story 1.5 — Teclado físico
Como usuário, opero a calculadora pelo teclado físico para agilidade.

**AC:**
- `0-9`, `+`, `-`, `*`, `/` mapeados.
- `Enter` = `=`, `Esc` = `C`, `Backspace` apaga último dígito.
- `event.preventDefault()` em teclas mapeadas.

## 5. Out of scope (parking lot)

Mantido do brief: científicas, memória M+/M-/MR, conversor, login, export, PWA, multi-tab sync.

## 6. Dependências & decisões pendentes

- **Stack** (HTML+JS puro vs React) — @architect Etapa 03.
- **Estratégia de precisão flutuante** (arredondar vs lib) — @architect.
- **Framework de teste** (Vitest, Jest, ou nativo `node:test`) — @architect.

## 7. Critérios de pronto (DoD do epic)

- [ ] 5/5 stories com gate QA = PASS.
- [ ] File List atualizada na story (Etapa 06).
- [ ] PR aberto no GitHub com link no canal `#orquestradores`.
- [ ] Sem deploy — entrega = PR.

## 8. Roadmap das próximas etapas

| Etapa | Owner | Saída esperada |
|-------|-------|----------------|
| 03 Arquitetura | @architect | `docs/architecture.md` |
| 04 Story | @sm | `docs/stories/1.1.story.md` (primeira) |
| 05 Validação | @po | Status: Ready |
| 06 Implementação | @dev | Código + File List |
| 07 QA | @qa | Gate: PASS |
| 08 Entrega | @devops | PR aberto |
