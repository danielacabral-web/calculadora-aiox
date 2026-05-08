# Project Brief — Calculadora AIOX

**Autor:** @analyst
**Etapa:** 01 IDEAÇÃO — Story Development Cycle
**Data:** 2026-05-08
**Status:** Draft pronto para @pm (Etapa 02)

---

## 1. Contexto

Exercício end-to-end do AIOX: atravessar os 8 passos do Story Development Cycle entregando uma **calculadora web** funcional, com PR aberto no GitHub. Sem deploy. O foco do exercício é o **fluxo** (analyst → pm → architect → sm → po → dev → qa → devops), não a sofisticação do produto.

## 2. Problema

Praticantes do AIOX precisam de um escopo pequeno o suficiente para caber em um ciclo, mas completo o bastante para tocar todos os papéis. Uma calculadora é o "hello world" canônico: regras claras, UI simples, lógica testável, espaço para edge cases reais (divisão por zero, overflow, precisão de ponto flutuante).

## 3. Objetivo

Entregar uma calculadora web que executa as 4 operações básicas + histórico, rodando no browser sem backend, com cobertura de testes e PR aberto até o próximo encontro.

## 4. Escopo MVP

### Features in
1. **Soma** — dois operandos, resultado numérico.
2. **Subtração** — idem.
3. **Multiplicação** — idem.
4. **Divisão** — idem, com tratamento de divisão por zero (mensagem de erro, não crash).
5. **Histórico** — últimas 10 operações exibidas em lista (operandos + operador + resultado), persistido em `localStorage`.
6. **Limpar (C)** — reset do display.
7. **Teclado físico** — números, operadores, Enter (=) e Esc (C).

### Features out (parking lot)
- Operações científicas (sen, cos, log, raiz, potência).
- Memória M+/M-/MR.
- Conversor de unidades.
- Multi-usuário / login.
- Exportar histórico.
- PWA / instalação offline.

## 5. Personas

- **Estudante AIOX (primário):** quer ver o ciclo rodando ponta-a-ponta. Vai mexer no código nas próximas etapas.
- **Usuário casual (secundário, hipotético):** abre a página no browser, faz contas rápidas, fecha. Não cria conta, não configura nada.

## 6. Critérios de sucesso

- [ ] As 4 operações retornam resultado correto para inputs válidos.
- [ ] Divisão por zero exibe mensagem e não quebra a UI.
- [ ] Histórico persiste após reload (localStorage).
- [ ] Funciona em Chrome/Firefox/Safari atuais.
- [ ] PR aberto no GitHub com File List atualizada (Etapa 06) e gate QA = PASS (Etapa 07).

## 7. Restrições

- **Sem backend.** Tudo client-side.
- **Sem deploy.** Entrega = PR aberto no GitHub.
- **Stack a definir pela @architect** (Etapa 03) — opções na mesa: HTML+JS puro vs React. Decisão deve favorecer simplicidade do ciclo.
- **Janela de tempo:** entregar antes do próximo encontro.

## 8. Riscos & premissas

| # | Item | Tipo | Mitigação |
|---|------|------|-----------|
| 1 | Precisão de ponto flutuante (ex: `0.1 + 0.2`) | Risco | @architect decide: arredondar no display ou usar lib (decimal.js) |
| 2 | Stack overengineered (React p/ calc trivial) | Risco | @architect avalia complexidade na Etapa 03 |
| 3 | localStorage cheio / desabilitado | Risco | Fallback: histórico em memória, log warning |
| 4 | Browser-only é suficiente p/ exercício | Premissa | Confirmado pelo enunciado AIOX |

## 9. Próximo passo

Handoff para **@pm** → `*create-prd` → `*create-epic` → `*shard-prd` (Etapa 02).
Saída esperada: `docs/prd/epic-1-calculadora.md`.

---

## Anexo — Brainstorm bruto (timestamps reais não preservados)

- "calculadora é mole, mas e se fosse polonesa inversa?" → out, foge do objetivo
- precisão flutuante = clássico que assusta junior; bom material p/ Etapa 03
- histórico em localStorage > IndexedDB (overkill p/ 10 entradas)
- testar com Vitest se for React, ou Jest puro se for vanilla — @architect decide
- acessibilidade (aria-label nos botões) entra como nice-to-have da Etapa 06, não bloqueante
- mobile responsivo: sim, grid de botões 4x5 já resolve
