// Firebase v10 — shared init for signup / login / courses.
// NOTE: this apiKey is intentionally public. Firebase web keys identify the
// project; they do not grant access. Access is controlled by Firestore Rules
// (see firestore.rules) and by Authentication settings in the console.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIA50Slkj1NJIE95T5e2Bqe1Ghk9TNnE0",
  authDomain: "mywebsite-aba70.firebaseapp.com",
  projectId: "mywebsite-aba70",
  storageBucket: "mywebsite-aba70.firebasestorage.app",
  messagingSenderId: "809248489773",
  appId: "1:809248489773:web:603c86bc44b716fe3bd3a4",
  measurementId: "G-EEBLYW4RJX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// keep the session across tabs and reloads
setPersistence(auth, browserLocalPersistence).catch(() => {});

/* ── language (shares the key with the main site) ───────────────── */
export function getLang() {
  let saved = null;
  try {
    saved = localStorage.getItem("mz-lang");
  } catch (e) {}
  if (saved === "ar" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
}

export function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function setLang(lang) {
  try {
    localStorage.setItem("mz-lang", lang);
  } catch (e) {}
  applyLang(lang);
}

/* ── Firebase error codes → human messages, both languages ──────── */
const ERRORS = {
  "auth/email-already-in-use": {
    ar: "هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول بدلًا من ذلك.",
    en: "This email is already registered. Try signing in instead.",
  },
  "auth/invalid-email": {
    ar: "صيغة البريد الإلكتروني غير صحيحة.",
    en: "That email address doesn't look valid.",
  },
  "auth/weak-password": {
    ar: "كلمة المرور ضعيفة — استخدم 6 أحرف على الأقل.",
    en: "Password is too weak — use at least 6 characters.",
  },
  "auth/missing-password": {
    ar: "من فضلك اكتب كلمة المرور.",
    en: "Please enter a password.",
  },
  "auth/user-not-found": {
    ar: "لا يوجد حساب بهذا البريد الإلكتروني.",
    en: "No account found with that email.",
  },
  "auth/wrong-password": {
    ar: "كلمة المرور غير صحيحة.",
    en: "Incorrect password.",
  },
  "auth/invalid-credential": {
    ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    en: "Email or password is incorrect.",
  },
  "auth/user-disabled": {
    ar: "تم تعطيل هذا الحساب. تواصل معنا للمساعدة.",
    en: "This account has been disabled. Contact us for help.",
  },
  "auth/too-many-requests": {
    ar: "محاولات كثيرة جدًا. انتظر قليلًا ثم حاول مرة أخرى.",
    en: "Too many attempts. Please wait a moment and try again.",
  },
  "auth/network-request-failed": {
    ar: "تعذّر الاتصال بالإنترنت. تحقّق من الشبكة وحاول مرة أخرى.",
    en: "Network error. Check your connection and try again.",
  },
  "auth/operation-not-allowed": {
    ar: "طريقة التسجيل دي مش مفعّلة. راجع إعدادات Firebase.",
    en: "This sign-in method isn't enabled in Firebase.",
  },
  "auth/unauthorized-domain": {
    ar: "هذا النطاق غير مصرّح له. أضِفه في إعدادات Firebase Authentication.",
    en: "This domain isn't authorised. Add it in Firebase Authentication settings.",
  },
  permission_denied: {
    ar: "لا تملك صلاحية لحفظ البيانات. راجع قواعد Firestore.",
    en: "Permission denied writing data. Check your Firestore rules.",
  },
};

export function errorMessage(err, lang) {
  const code = (err && (err.code || err.message)) || "";
  const hit = ERRORS[code];
  if (hit) return hit[lang] || hit.en;
  return lang === "ar"
    ? "حصل خطأ غير متوقّع. حاول مرة أخرى."
    : "Something went wrong. Please try again.";
}
