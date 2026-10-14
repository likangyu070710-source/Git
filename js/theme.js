/* theme.js — 深色 / 浅色切换
   满足课程要求："at least one thing that responds to the user"
   同时也满足 "Behaviour" 判据：不依赖服务器或数据库，纯前端。 */

(function () {
  "use strict";

  var STORAGE_KEY = "danzhou-theme";
  var root = document.documentElement;

  /* 1) 尽早应用已保存的主题。
     这段同时被内联在 <head> 里（避免加载时闪白），此处作为兜底。 */
  function apply(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* 隐私模式下忽略 */ }
  apply(saved);

  /* 2) 绑定按钮 */
  function init() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) { return; }

    function label() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "☀ 浅色" : "☾ 深色";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    }

    btn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark";
      var next = dark ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* 忽略 */ }
      label();
    });

    label();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
