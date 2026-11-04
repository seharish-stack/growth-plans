// Shared helpers for the sample pages: event date 3 days out at 7pm ET, countdowns, modals.
(function () {
  var now = new Date();
  // 7:00 PM Eastern = 23:00 UTC in daylight time
  var ev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 3, 23, 0, 0));
  var fmtDay = ev.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/New_York" });
  window.PIPKIN_EVENT = ev;
  document.querySelectorAll("[data-event-date]").forEach(function (el) { el.textContent = fmtDay; });
  document.querySelectorAll("[data-event-short]").forEach(function (el) {
    el.textContent = ev.toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" });
  });
  function tick() {
    document.querySelectorAll("[data-countdown]").forEach(function (el) {
      var target = el.getAttribute("data-countdown") === "replay" ? new Date(now.getTime() + 48 * 3600e3) : ev;
      var s = Math.max(0, Math.floor((target - new Date()) / 1000));
      var parts = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      el.querySelectorAll("b").forEach(function (b, i) { b.textContent = String(parts[i]).padStart(2, "0"); });
    });
  }
  tick(); setInterval(tick, 1000);
  document.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open]");
    if (open) { e.preventDefault(); var m = document.getElementById(open.getAttribute("data-open")); if (m) { m.hidden = false; var f = m.querySelector("input,button"); if (f) f.focus(); } }
    var close = e.target.closest("[data-close]");
    if (close || e.target.classList.contains("modal")) { var mm = e.target.closest(".modal"); if (mm) mm.hidden = true; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".modal").forEach(function (m) { m.hidden = true; }); });
})();
