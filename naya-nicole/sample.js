// Shared behaviour for Naya's sample pages. Nothing is sent anywhere: forms stop at the page.
(function () {
  // The live class always sits three days out, at 7pm New York time.
  function eventDate() {
    var t = new Date(Date.now() + 3 * 864e5);
    var p = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(t);
    var get = function (k) { return +p.find(function (x) { return x.type === k; }).value; };
    var guess = Date.UTC(get("year"), get("month") - 1, get("day"), 23, 0);
    var h = +new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", hourCycle: "h23" }).format(guess);
    return new Date(guess + (19 - h) * 3600e3);
  }
  var EV = eventDate();
  var long = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long", month: "long", day: "numeric" }).format(EV);
  var short = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric" }).format(EV);
  document.querySelectorAll("[data-date]").forEach(function (el) { el.textContent = long; });
  document.querySelectorAll("[data-date-short]").forEach(function (el) { el.textContent = short; });

  function tick() {
    var ms = Math.max(0, EV - Date.now());
    var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    document.querySelectorAll("[data-timer]").forEach(function (t) {
      t.innerHTML = [[d, "Days"], [h, "Hours"], [m, "Mins"], [s, "Secs"]].map(function (x) { return "<div><b>" + String(x[0]).padStart(2, "0") + "</b><span>" + x[1] + "</span></div>"; }).join("");
    });
  }
  tick(); setInterval(tick, 1000);

  window.toast = function (msg) {
    var t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  };

  // Modals
  var last = null;
  window.openModal = function (id) { last = document.activeElement; var m = document.getElementById(id); m.hidden = false; var f = m.querySelector("input,select,button:not(.x)"); if (f) f.focus(); };
  window.closeModal = function (m) { m.hidden = true; if (last) last.focus(); };
  document.querySelectorAll(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m || e.target.closest(".x")) closeModal(m); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.querySelectorAll(".modal:not([hidden])").forEach(closeModal); });
  document.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", function () { openModal(b.getAttribute("data-open")); }); });
})();
