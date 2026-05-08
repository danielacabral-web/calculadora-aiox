import { evaluate, formatDisplay } from "./calculator.js";
import { pushHistory } from "./history.js";
import { bindKeypad, bindKeyboard } from "./ui.js";

const display = document.getElementById("display");
const keypad = document.querySelector(".keypad");

const state = {
  current: "0",
  left: null,
  op: null,
  justEvaluated: false,
  errored: false,
};

function render() {
  display.textContent = state.errored ? "Erro" : state.current;
  display.classList.toggle("errored", state.errored);
}

function inputDigit(d) {
  if (state.errored) return;
  if (state.justEvaluated) { state.current = "0"; state.justEvaluated = false; }
  if (d === "." && state.current.includes(".")) return;
  if (state.current === "0" && d !== ".") state.current = d;
  else if (state.current.length < 16) state.current += d;
}

function inputOp(op) {
  if (state.errored) return;
  if (state.left !== null && state.op && !state.justEvaluated) {
    const r = evaluate(state.left, state.op, parseFloat(state.current));
    if (typeof r === "object") { state.errored = true; return; }
    state.left = r;
    state.current = formatDisplay(r);
  } else {
    state.left = parseFloat(state.current);
  }
  state.op = op;
  state.justEvaluated = true;
}

function equals() {
  if (state.errored || state.left === null || !state.op) return;
  const b = parseFloat(state.current);
  const r = evaluate(state.left, state.op, b);
  if (typeof r === "object") { state.errored = true; return; }
  pushHistory({ a: state.left, op: state.op, b, result: r, ts: Date.now() });
  state.current = formatDisplay(r);
  state.left = null;
  state.op = null;
  state.justEvaluated = true;
}

function clear() {
  state.current = "0";
  state.left = null;
  state.op = null;
  state.justEvaluated = false;
  state.errored = false;
}

function backspace() {
  if (state.errored || state.justEvaluated) return;
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
}

function handleKey(key) {
  if (/^[0-9.]$/.test(key)) inputDigit(key);
  else if (key === "+" || key === "-" || key === "*" || key === "/") inputOp(key);
  else if (key === "=") equals();
  else if (key === "C") clear();
  else if (key === "Back") backspace();
  render();
}

bindKeypad(keypad, handleKey);
bindKeyboard(handleKey);
render();
