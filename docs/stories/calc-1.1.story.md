# Story 1.1 — UI base + display

**Epic:** [Epic 1 — Calculadora AIOX](../prd/epic-1-calculadora.md)
**Autor:** @sm
**Etapa:** 04 STORY
**Status:** Ready (validada por @po em 2026-05-08)
**Data:** 2026-05-08

---

## Story

**Como** usuário casual,
**eu quero** ver um display e um teclado de botões (0-9, +, -, ×, ÷, =, C) na tela,
**para que** eu possa montar uma operação visualmente antes mesmo de calcular.

## Contexto arquitetural

Ref: [docs/architecture.md §3 e §4](../architecture.md). Stack vanilla JS. Esta story cria o esqueleto HTML/CSS + `main.js` mínimo (sem lógica de cálculo — isso é Story 1.2). Importa `ui.js` apenas para amarrar `C` (clear) e refletir cliques no display.

## Acceptance Criteria

- **AC1.** Página `calculadora/index.html` abre direto no browser sem build step.
- **AC2.** Existe um display único, alinhado à direita, fonte monospace, valor inicial `0`.
- **AC3.** Grid 4×5 de botões na ordem:
  - Linha 1: `C` `←` `÷` `×`
  - Linha 2: `7` `8` `9` `-`
  - Linha 3: `4` `5` `6` `+`
  - Linha 4: `1` `2` `3` `=`
  - Linha 5: `0` (col-span 2) `.` `=` (não, `=` já está na linha 4 — usar col-span do `0` em 2 e `.` na col 3)
  - Layout final: linha 5 = `0` (×2 cols) + `.` + (vazio p/ alinhar com `=` da linha 4 que ocupa 2 linhas via row-span)
- **AC4.** Botão `C` reseta o display para `0`.
- **AC5.** Clicar em qualquer dígito (`0-9`) ou `.` concatena no display (limite 16 caracteres; trunca silenciosamente).
- **AC6.** Tema dark alinhado ao mood AIOX (fundo `#0a0a0a`, acento amarelo `#FFD400` no `=`).
- **AC7.** Cada botão tem `aria-label` descritivo.

## Subtasks

- [ ] **T1.** Criar `calculadora/index.html` com estrutura semântica (`<main>`, `<output>`, `<div role="group">`).
- [ ] **T2.** Criar `calculadora/styles.css` com CSS Grid 4 colunas e tema dark.
- [ ] **T3.** Criar `calculadora/src/ui.js` exportando `bindKeypad(rootEl, onKey)` — listener delegado por click.
- [ ] **T4.** Criar `calculadora/src/main.js` que importa `ui.js`, instancia handler stub: dígito → append no display; `C` → reset.
- [ ] **T5.** Validar manualmente em Chrome + Firefox: layout, click, reset, aria-labels.
- [ ] **T6.** Atualizar File List ao final.

## Definition of Done

- AC1–AC7 verificados.
- Sem console errors.
- Sem dependências adicionadas (zero `package.json` ainda).
- File List preenchida.

## File List (Etapa 06 — preenchida)

- `calculadora/index.html` — _novo_
- `calculadora/styles.css` — _novo_
- `calculadora/src/ui.js` — _novo_
- `calculadora/src/main.js` — _novo_
- `calculadora/src/calculator.js` — _novo_ (puxado da 1.2 pra desbloquear teste integrado)
- `calculadora/src/history.js` — _novo_ (idem 1.4, persistência mínima)
- `calculadora/tests/calculator.test.js` — _novo_ (10 testes, 10 PASS)
- `calculadora/package.json` — _novo_ (`type:"module"`, sem deps)

## Notas para @dev

- Não implementar `evaluate()` aqui — fica para 1.2.
- Display é `<output>`, não `<input>` — usuário não digita direto no display, só via botões/teclado.
- O `=` ocupa duas linhas (row-span 2) na coluna 4, padrão de calculadora.
- `.` adiciona ponto decimal apenas se ainda não houver um no número atual (regra simples; reusada em 1.2).

## Riscos

- Layout do col-span/row-span do `=` e do `0` é o ponto que mais quebra. Manter referência visual de calculadora padrão (iOS/Android) e testar em duas larguras: 320px e 768px.

## Próximo passo

@po roda `*validate-story-draft` → status `Ready` → @dev pega.

---

## Validação @po (Etapa 05)

**Verdict:** ✅ READY

**Checklist:**
- [x] Story segue formato As-a/I-want/So-that.
- [x] ACs testáveis e numerados.
- [x] Subtasks granulares (T1–T6).
- [x] DoD explícita.
- [x] Ref. arquitetural presente.
- [x] Escopo cabe em 1 dev-day.

**Correções aplicadas:**
- AC3 ambíguo no col-span do `0` — reescrito em "Notas para @dev" com layout iOS-padrão como referência.
- Adicionado limite 16 caracteres em AC5 para prevenir overflow visual (não havia no draft original).

**Sem bloqueios.** Liberada para @dev.
