import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate, formatDisplay } from "../src/calculator.js";

test("soma básica", () => assert.equal(evaluate(2, "+", 3), 5));
test("subtração básica", () => assert.equal(evaluate(10, "-", 4), 6));
test("multiplicação básica", () => assert.equal(evaluate(6, "*", 7), 42));
test("divisão básica", () => assert.equal(evaluate(20, "/", 4), 5));

test("divisão por zero retorna erro", () => {
  assert.deepEqual(evaluate(5, "/", 0), { error: "Erro" });
});

test("precisão flutuante: 0.1 + 0.2 = 0.3", () => {
  assert.equal(evaluate(0.1, "+", 0.2), 0.3);
});

test("operador inválido retorna erro", () => {
  assert.deepEqual(evaluate(1, "?", 2), { error: "Erro" });
});

test("formatDisplay número grande vira notação científica", () => {
  assert.match(formatDisplay(1e20), /e\+/);
});

test("formatDisplay número normal", () => {
  assert.equal(formatDisplay(42), "42");
});

test("formatDisplay erro retorna 'Erro'", () => {
  assert.equal(formatDisplay(NaN), "Erro");
});
