# QA Gate — Story calc-1.1 (UI base + display)

**Autor:** @qa
**Etapa:** 07 QA
**Data:** 2026-05-08
**Gate:** ✅ **PASS**

---

## 1. Risk profile

| ID | Risco | Prob | Impacto | Mitigação aplicada |
|----|-------|------|---------|--------------------|
| R1 | Layout quebrar em mobile | M | B | Grid CSS testado em 320px+; row/col-span via inline style |
| R2 | Eventos teclado conflitarem | B | B | `preventDefault` apenas em teclas mapeadas |
| R3 | localStorage indisponível | B | M | Fallback memória + warn em `history.js` |
| R4 | Precisão flutuante | M | M | `toPrecision(12)` no `evaluate` — testado |
| R5 | Div/0 quebrar UI | M | A | `{error}` retornado, estado `errored` na UI |

Nenhum risco alto não mitigado.

## 2. Review — ACs Story 1.1

| AC | Status | Nota |
|----|--------|------|
| AC1 abre sem build | ✅ | `index.html` + `<script type="module">`; basta abrir |
| AC2 display monospace | ✅ | `font-family` ui-monospace; alinhado direita |
| AC3 grid 4×5 | ✅ | row-span do `=` e col-span do `0` corretos |
| AC4 `C` reseta | ✅ | `clear()` zera todo o estado |
| AC5 dígitos concatenam | ✅ | limite 16 char respeitado |
| AC6 tema dark | ✅ | bg `#0a0a0a`, accent `#ffd400` no `=` |
| AC7 aria-labels | ✅ | todos os botões têm |

## 3. Test results

```
✔ soma básica
✔ subtração básica
✔ multiplicação básica
✔ divisão básica
✔ divisão por zero retorna erro
✔ precisão flutuante: 0.1 + 0.2 = 0.3
✔ operador inválido retorna erro
✔ formatDisplay número grande vira notação científica
✔ formatDisplay número normal
✔ formatDisplay erro retorna 'Erro'

10 pass / 0 fail
```

## 4. Findings

- **NIT-1** (não bloqueante): falta teste para `history.js` (cobertura prevista na Story 1.4). Aceito porque a Story 1.4 ainda não foi puxada.
- **NIT-2** (não bloqueante): smoke test de UI (Playwright/manual) não automatizado. Validação manual pelo dev é suficiente p/ exercício AIOX.

## 5. Veredito

**PASS.** Liberado para @devops abrir PR (Etapa 08).
