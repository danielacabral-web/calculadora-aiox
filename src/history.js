const KEY = "aiox-calc-history";
const LIMIT = 10;
let memoryFallback = [];
let useMemory = false;

function safeStorage() {
  if (useMemory) return null;
  try {
    if (typeof localStorage === "undefined") { useMemory = true; return null; }
    const probe = "__probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    useMemory = true;
    console.warn("[history] localStorage indisponível, usando fallback em memória");
    return null;
  }
}

export function loadHistory() {
  const s = safeStorage();
  if (!s) return [...memoryFallback];
  try {
    const raw = s.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushHistory(entry) {
  const list = loadHistory();
  list.unshift(entry);
  while (list.length > LIMIT) list.pop();
  const s = safeStorage();
  if (s) {
    try { s.setItem(KEY, JSON.stringify(list)); }
    catch { useMemory = true; memoryFallback = list; }
  } else {
    memoryFallback = list;
  }
  return list;
}

export function clearHistory() {
  memoryFallback = [];
  const s = safeStorage();
  if (s) { try { s.removeItem(KEY); } catch {} }
}
