/* Minimal accessible lightbox for the gallery prototype.
   Reads images from .gallery figure (img + figcaption). */
(function () {
  var gallery = document.querySelector(".gallery");
  if (!gallery) return;

  var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
  var current = 0;

  // Build lightbox DOM
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">✕</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">‹</button>' +
    '<img class="lightbox-img" alt="">' +
    '<button class="lb-btn lb-next" aria-label="Next">›</button>' +
    '<div class="lightbox-cap"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector(".lightbox-img");
  var lbCap = lb.querySelector(".lightbox-cap");

  function dataFor(i) {
    var fig = figures[i];
    var img = fig.querySelector("img");
    var cap = fig.querySelector("figcaption");
    var title = cap ? cap.childNodes[0].textContent.trim() : (img.alt || "");
    var sub = cap && cap.querySelector("small") ? cap.querySelector("small").textContent.trim() : "";
    return { src: img.getAttribute("src"), alt: img.alt, title: title, sub: sub };
  }

  function show(i) {
    current = (i + figures.length) % figures.length;
    var d = dataFor(current);
    lbImg.src = d.src;
    lbImg.alt = d.alt;
    lbCap.innerHTML = d.title + (d.sub ? "<small>" + d.sub + "</small>" : "");
  }

  function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  figures.forEach(function (fig, i) {
    fig.addEventListener("click", function () { open(i); });
    fig.setAttribute("tabindex", "0");
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
  lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });
})();
