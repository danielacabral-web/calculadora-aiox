export function evaluate(a, op, b) {
  const x = Number(a);
  const y = Number(b);
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return { error: "Erro" };
  }
  let r;
  switch (op) {
    case "+": r = x + y; break;
    case "-": r = x - y; break;
    case "*": r = x * y; break;
    case "/":
      if (y === 0) return { error: "Erro" };
      r = x / y;
      break;
    default: return { error: "Erro" };
  }
  if (!Number.isFinite(r)) return { error: "Erro" };
  return Number.parseFloat(r.toPrecision(12));
}

export function formatDisplay(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "Erro";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e16 || abs < 1e-9)) return n.toExponential(6);
  return String(Number.parseFloat(n.toPrecision(12)));
}
