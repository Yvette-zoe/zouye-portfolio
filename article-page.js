const articleMain = document.querySelector("#article-main");
const slug = new URLSearchParams(window.location.search).get("slug");

const sortedArticles = articlePosts.slice().sort((a, b) => b.date.localeCompare(a.date));
const article = sortedArticles.find(item => item.slug === slug);

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function imagePath(item, number) {
  return `./assets/articles/${item.slug}/${String(number).padStart(2, "0")}.webp`;
}

function articleParagraphs(body) {
  return body.trim().split(/\n\s*\n/).filter(block => !block.trimStart().startsWith("#")).map(block => {
    const safe = escapeHtml(block).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replaceAll("\n", "<br />");
    return `<p>${safe}</p>`;
  }).join("");
}

function imageButton(item, number) {
  const label = `${item.title}，第 ${number} 张配图`;
  return `<button class="article-image" type="button" data-image="${imagePath(item, number)}" data-alt="${escapeHtml(label)}" aria-label="放大第 ${number} 张配图">
    <img src="${imagePath(item, number)}" alt="${escapeHtml(label)}" loading="lazy" decoding="async" draggable="false" />
    <span aria-hidden="true">${String(number).padStart(2, "0")} / ${String(item.imageCount).padStart(2, "0")}</span>
  </button>`;
}

function initArticleGallery(section) {
  const track = section.querySelector(".article-gallery");
  const previous = section.querySelector(".article-gallery-prev");
  const next = section.querySelector(".article-gallery-next");
  const [first, second] = track.children;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let drag = null;
  let suppressClick = false;

  function updateControls() {
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
  }

  function slide(direction) {
    if (!second) return;
    const step = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? "instant" : "smooth" });
  }

  previous.addEventListener("click", () => slide(-1));
  next.addEventListener("click", () => slide(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(track);
  updateControls();

  track.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
  });
  track.addEventListener("pointermove", event => {
    if (drag?.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    }
    track.scrollLeft = drag.left - distance;
  });
  function endDrag(event) {
    if (drag?.id !== event.pointerId) return;
    suppressClick = drag.moved;
    drag = null;
    track.classList.remove("is-dragging");
    setTimeout(() => { suppressClick = false; }, 0);
  }
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("lostpointercapture", endDrag);
  track.addEventListener("pointerleave", event => {
    if (drag && !drag.moved) endDrag(event);
  });
  track.addEventListener("click", event => {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}

if (!article) {
  articleMain.innerHTML = `<div class="article-not-found" id="article-text" tabindex="-1"><h1>文章未找到</h1><a class="text-link" href="./index.html#articles">返回文章目录</a></div>`;
} else {
  const position = sortedArticles.indexOf(article);
  const newer = sortedArticles[position - 1];
  const older = sortedArticles[position + 1];
  const number = String(sortedArticles.length - position).padStart(2, "0");
  document.title = `${article.title}｜ZouYe`;
  document.querySelector('meta[name="description"]').content = article.summary;
  document.querySelector("#article-current").textContent = `${number} / ${article.title}`;

  const adjacent = (item, label) => item ? `<a href="./article.html?slug=${encodeURIComponent(item.slug)}"><span>${label}</span><strong>${escapeHtml(item.title)}</strong></a>` : "";

  articleMain.innerHTML = `
    <article>
      <header class="article-hero">
        <p class="article-heading-meta">NOTES FROM PRACTICE / ${number}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-standfirst">${escapeHtml(article.summary)}</p>
        <p class="article-byline"><span>ZouYe</span><time datetime="${article.date}">${article.date.replaceAll("-", ".")}</time></p>
      </header>

      <div class="article-copy" id="article-text" tabindex="-1">
        ${articleParagraphs(article.body)}
      </div>

      <section class="article-visuals" aria-label="文章配图">
        <div class="article-gallery" id="article-gallery" tabindex="0" role="group" aria-label="左右滑动浏览配图">
          ${Array.from({ length: article.imageCount }, (_, index) => imageButton(article, index + 1)).join("")}
        </div>
        <div class="article-gallery-controls">
          <button class="article-gallery-prev" type="button" aria-label="向左浏览配图" aria-controls="article-gallery" disabled><img src="./assets/article-carousel-arrow.svg" alt="" /></button>
          <button class="article-gallery-next" type="button" aria-label="向右浏览配图" aria-controls="article-gallery"><img src="./assets/article-carousel-arrow.svg" alt="" /></button>
        </div>
      </section>

      <nav class="article-end-nav" aria-label="继续阅读">
        ${adjacent(newer, "← 上一篇")}
        ${adjacent(older, "下一篇 →")}
      </nav>
    </article>`;

  initArticleGallery(articleMain.querySelector(".article-visuals"));
  const lightbox = document.querySelector(".article-lightbox");
  const lightboxImage = lightbox.querySelector("img");
  articleMain.querySelectorAll(".article-image").forEach(button => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.image;
      lightboxImage.alt = button.dataset.alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector(".article-lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.close();
  });
}
