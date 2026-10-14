/* filter.js — 校园地点筛选
   页面：campus.html
   原理：每个条目带 data-cat，点按钮时按分类显示/隐藏，并实时播报结果数量。
   纯前端，不需要服务器（课程明确要求）。 */

(function () {
  "use strict";

  function init() {
    var bar = document.querySelector(".filters");
    var list = document.querySelector("[data-filter-list]");
    if (!bar || !list) { return; }

    var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));
    var items = Array.prototype.slice.call(list.querySelectorAll("[data-cat]"));
    var status = document.querySelector(".filter-status");

    function apply(cat) {
      var shown = 0;

      items.forEach(function (item) {
        var cats = (item.getAttribute("data-cat") || "").split(/\s+/);
        var match = cat === "all" || cats.indexOf(cat) !== -1;
        item.hidden = !match;
        if (match) { shown += 1; }
      });

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-filter") === cat ? "true" : "false");
      });

      if (status) {
        status.textContent = cat === "all"
          ? "显示全部 " + shown + " 个地点"
          : "筛选：" + labelOf(cat) + "，" + shown + " 个地点";
      }
    }

    function labelOf(cat) {
      var b = buttons.filter(function (x) { return x.getAttribute("data-filter") === cat; })[0];
      return b ? b.textContent.trim() : cat;
    }

    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) { return; }
      apply(btn.getAttribute("data-filter"));
    });

    /* 支持用 URL 参数直接定位，例如 campus.html?cat=food */
    var initial = "all";
    try {
      var p = new URLSearchParams(window.location.search).get("cat");
      if (p && buttons.some(function (b) { return b.getAttribute("data-filter") === p; })) {
        initial = p;
      }
    } catch (e) { /* 忽略 */ }

    apply(initial);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
