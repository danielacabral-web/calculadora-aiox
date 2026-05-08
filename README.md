# Calculadora AIOX

Calculadora web client-side construída atravessando os **8 passos do Story Development Cycle** do AIOX.

> Exercício do encontro: ideação → produto → arquitetura → story → validação → implementação → QA → entrega. Sem deploy. Entrega = PR aberto.

## Stack

- HTML + CSS + JavaScript vanilla (ES modules)
- Testes: `node:test` nativo (Node 20+), zero dependências
- Persistência: `localStorage` com fallback em memória

## Rodar

```bash
# UI: basta abrir no browser
open calculadora/index.html   # macOS
start calculadora/index.html  # Windows

# Testes
cd calculadora && npm test
```

## O ciclo

| Etapa | Owner | Saída |
|-------|-------|-------|
| 01 Ideação | @analyst | [docs/brief.md](docs/brief.md) |
| 02 Produto | @pm | [docs/prd/epic-1-calculadora.md](docs/prd/epic-1-calculadora.md) |
| 03 Arquitetura | @architect | [docs/architecture.md](docs/architecture.md) |
| 04 Story | @sm | [docs/stories/calc-1.1.story.md](docs/stories/calc-1.1.story.md) |
| 05 Validação | @po | Status: Ready (na story) |
| 06 Implementação | @dev | [calculadora/](calculadora/) — 10/10 testes PASS |
| 07 QA | @qa | [docs/qa/gates/calc-1.1.gate.md](docs/qa/gates/calc-1.1.gate.md) — Gate PASS |
| 08 Entrega | @devops | este PR |

## Features

- 4 operações básicas (+, −, ×, ÷)
- Encadeamento (`2 + 3 + 4 = 9`)
- Tratamento de divisão por zero
- Precisão flutuante (`0.1 + 0.2 = 0.3`)
- Notação científica para números grandes
- Histórico persistente (10 últimas, `localStorage`)
- Teclado físico (Enter = `=`, Esc = `C`, Backspace)
- Acessibilidade básica (aria-labels, navegável por teclado)
