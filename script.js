(function () {
  var root = document.documentElement;
  var KEY = "yf-theme";

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function label(btn) {
    var next = current() === "dark" ? "light" : "dark";
    btn.textContent = next === "dark" ? "Dark mode" : "Light mode";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      label(btn);
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        label(btn);
      });
    }

    var copy = document.getElementById("copy-email");
    if (copy) {
      copy.addEventListener("click", function () {
        var text = document.getElementById("email-text").textContent.trim();
        var note = document.getElementById("copy-note");
        function selectIt() {
          var r = document.createRange();
          r.selectNodeContents(document.getElementById("email-text"));
          var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
          note.textContent = "Selected. Press Ctrl+C or Cmd+C to copy.";
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            note.textContent = "Email address copied.";
          }, selectIt);
        } else {
          selectIt();
        }
      });
    }
  });
})();
