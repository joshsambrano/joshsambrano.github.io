(() => {
  const KEY = "theme"; // "light" | "dark"
  const root = document.documentElement;

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    try { localStorage.setItem(KEY, mode); } catch {}
    const btn = document.getElementById("themeToggle");
    if (btn) btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  }

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Init
  setTheme(getPreferredTheme());

  // Listen for system changes IF user hasn't explicitly chosen
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", () => {
      const saved = localStorage.getItem(KEY);
      if (saved !== "light" && saved !== "dark") setTheme(getPreferredTheme());
    });
  } catch {}

  // Wire toggle
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || getPreferredTheme();
      setTheme(current === "dark" ? "light" : "dark");
    });
  });
})();
