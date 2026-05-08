export function bindKeypad(rootEl, onKey) {
  rootEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-key]");
    if (!btn) return;
    onKey(btn.dataset.key);
  });
}

const KEY_MAP = {
  "0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9",
  "+":"+","-":"-","*":"*","/":"/",".":".",
  "Enter":"=", "=":"=", "Escape":"C", "Backspace":"Back",
};

export function bindKeyboard(onKey) {
  document.addEventListener("keydown", (e) => {
    const k = KEY_MAP[e.key];
    if (!k) return;
    e.preventDefault();
    onKey(k);
  });
}
