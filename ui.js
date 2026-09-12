// Small shared UI layer for the auth pages — language switching,
// alerts, busy state and inline field errors.

import { getLang, applyLang, setLang } from "./firebase-init.js";

/* swap every [data-en]/[data-ar] node to the active language */
export function paintLang(lang) {
  document.querySelectorAll("[data-en]").forEach((el) => {
    const v = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
    if (v != null) el.textContent = v;
  });
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = lang === "ar" ? "EN" : "ع";
}

/* boots language + wires the toggle and password eyes. returns active lang */
export function initShell() {
  let lang = getLang();
  applyLang(lang);
  paintLang(lang);

  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      lang = lang === "ar" ? "en" : "ar";
      setLang(lang);
      paintLang(lang);
    });
  }

  document.querySelectorAll("[data-pw]").forEach((t) => {
    t.addEventListener("click", () => {
      const input = document.getElementById(t.getAttribute("data-pw"));
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      t.setAttribute("aria-label", show ? "hide password" : "show password");
      t.classList.toggle("is-on", show);
    });
  });

  return lang;
}

export function showAlert(msg, kind = "err") {
  const box = document.getElementById("alert");
  const txt = document.getElementById("alertMsg");
  if (!box || !txt) return;
  txt.textContent = msg;
  box.classList.remove("err", "ok");
  box.classList.add(kind, "show");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

export function clearAlert() {
  const box = document.getElementById("alert");
  if (box) box.classList.remove("show");
}

export function setBusy(btn, busy) {
  if (!btn) return;
  btn.disabled = busy;
  btn.classList.toggle("is-busy", busy);
  const form = btn.closest("form");
  if (form) {
    form.querySelectorAll("input").forEach((i) => {
      i.disabled = busy;
    });
  }
}

export function fieldError(id, msg) {
  const wrap = document.getElementById("f-" + id);
  if (!wrap) return;
  wrap.classList.add("bad");
  const err = wrap.querySelector(".err");
  if (err) err.textContent = msg;
}

export function clearFields() {
  document.querySelectorAll(".field.bad").forEach((f) => f.classList.remove("bad"));
}
