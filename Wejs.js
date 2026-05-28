(function () {
  // ====== CREATE WIDGET CONTAINER ======
  var container = document.createElement("div");
  container.className = "kw-weather-widget-container";
  container.setAttribute("data-city", "Shangla"); // Change city here

  var card = document.createElement("div");
  card.className = "kw-weather-card";

  var loading = document.createElement("div");
  loading.className = "kw-loading";

  var spinner = document.createElement("div");
  spinner.className = "kw-spinner";

  var text = document.createElement("p");
  text.textContent = "Loading weather...";

  loading.appendChild(spinner);
  loading.appendChild(text);
  card.appendChild(loading);
  container.appendChild(card);

  // Append to page body
  function addWidget() {
    document.body.appendChild(container);
  }

  if (document.body) {
    addWidget();
  } else {
    document.addEventListener("DOMContentLoaded", addWidget);
  }

  // ====== LOAD CSS ======
  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href =
    "https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@master/4wu.css";
  document.head.appendChild(css);

  // ====== LOAD EXTERNAL JS ======
  var js = document.createElement("script");
  js.src =
    "https://cdn.jsdelivr.net/gh/PashtunObserver/bloggercode@master/4w.js";
  js.defer = true;

  function loadScript() {
    document.body.appendChild(js);
  }

  if (document.body) {
    loadScript();
  } else {
    document.addEventListener("DOMContentLoaded", loadScript);
  }
})();