const portfolioUrl = "https://yvette-zoe.github.io/Personal-Architectural-portfolio/";

const mockData = {
  profile: {
    name: "ZouYe",
    title: "建筑设计研究者 / AI 创意实践者",
    intro:
      "一名建筑学硕士，2年设计院工作经历，曾借调至政府部门挂职，目前独立进行 AI 实践。从建筑与规划出发，探索更广阔的世界，情绪稳定，解决问题，相信真诚、美好与勇气。",
    introEnglish:
      "I hold a master’s degree in architecture and have two years of experience at an architectural design institute, including a secondment to a government department. I’m now independently exploring AI through hands-on practice. With architecture and urban planning as my starting point, I’m exploring a wider world. Calm and level-headed, I focus on solving problems and believe in sincerity, beauty, and courage.",
    email: "569617786@qq.com",
  },
  // 双身份对照清单：呼应参考站 “Part designer / Part coder” 的呈现方式
  architectFocus: ["场地与尺度研究", "复杂系统拆解", "空间叙事与表达", "跨角色协作"],
  aiFocus: ["工作流设计", "Prompt 与评测", "快速原型验证", "内容与知识系统"],
  navigation: [
    { label: "首页", href: "#home" },
    { label: "AI实践", href: "#ai-projects" },
    { label: "建筑与规划设计", href: portfolioUrl, external: true },
    { label: "实践文章", href: "#articles" },
    { label: "其他", href: "#other" },
    { label: "联系我", href: "#about" },
  ],
  aiProjects: [
    {
      id: "xiajiben",
      category: "保质期管理",
      title: "匣记本",
      summary: "拍包装、记日期、看临期；用更少操作管理物品，减少过期浪费与额外开销。",
      image: "projects/xiajiben/home-status.jpg",
      video: "projects/xiajiben/xiajiben-hero.mp4",
      poster: "projects/xiajiben/hero-poster.jpg",
      inputImage: "projects/xiajiben/package-photo.jpg",
      outputImage: "projects/xiajiben/expiring-list.png",
      imageAlt: "匣记本微信小程序首页，显示物品状态与临期数量",
      type: "PRODUCT CASE",
      detailHref: "./xiajiben.html",
      disclaimer: "微信小程序 / 实际界面截图",
      input: "商品包装与购物小票",
      process: "图像识别 · 日期核验",
      output: "分区看板与临期提醒",
    },
    {
      id: "wedding-guide",
      category: "婚礼指南",
      title: "婚礼指南",
      summary: "为异地宾客整合婚宴信息、周边地点与导航，并用 AI 助手回答行程问题。",
      image: "projects/wedding-guide/screen-home.jpg",
      video: "projects/wedding-guide/wedding-guide-demo.webm",
      videoType: "video/webm",
      device: true,
      poster: "projects/wedding-guide/wedding-guide-demo-poster.png",
      inputImage: "projects/wedding-guide/screen-places.jpg",
      outputImage: "projects/wedding-guide/screen-chat.jpg",
      imageAlt: "婚礼指南页面内演示的周边地图与婚宴地点界面",
      type: "LIVE PROJECT",
      detailHref: "./wedding-guide.html",
      disclaimer: "页面内交互演示 / 模拟数据",
      input: "婚宴信息与地点清单",
      process: "地图整理 · AI 问答",
      output: "宾客可查的婚礼指南",
    },
    {
      id: "shuzhai",
      category: "阅读记录",
      title: "书摘",
      summary: "打开就写。摘抄和感想分开留，按时间或类型回看，需要时导出到 Notion 或 Obsidian。",
      image: "projects/shuzhai/record-home.png",
      device: true,
      imageAlt: "书摘应用的记录页：当天日期、摘抄与感想切换，以及空白输入区",
      type: "VIBE CODING TOOL",
      detailHref: "./shuzhai.html",
      disclaimer: "本地网页应用 / 数据不上传",
      input: "一段摘抄或感想",
      process: "本地保存 · 按时间或类型回看",
      output: "CSV 与 Markdown 导出",
    },
    {
      id: "nashuixi",
      category: "空间模型",
      title: "微缩场景",
      summary: "沿文化活动中心的连廊走向关帝庙和集市。自由旋转、缩放模型，查看庙前广场的昼夜变化。",
      image: "projects/nashuixi/day.webp",
      imageAlt: "纳水溪文化活动中心、关帝庙与庙前广场的日间鸟瞰",
      type: "INTERACTIVE MODEL",
      detailHref: "./nashuixi.html",
      detailLabel: "进入互动模型",
    },
  ],
  articles: articlePosts,
  skills: ["建筑规划", "遗产保护", "VibeCoding", "产品与工具"],
  tools: ["Notion", "Cursor", "Codex", "Coze", "PS", "AI", "ID", "Office", "AutoCAD", "SketchUp"],
  // 个人介绍左侧时间轴：工作在前，教育按时间倒序
  timeline: [
    {
      label: "Experience",
      caption: "工作经历",
      items: [
        {
          years: "2023–2025",
          title: "Guangdong Urban & Rural Planning and Design Institute",
          detail: "Planning Division IV · Assistant Engineer",
          zhTitle: "广东省城乡规划设计研究院（规划四所）",
          zhDetail: "助理工程师",
        },
      ],
    },
    {
      label: "Education",
      caption: "教育经历",
      items: [
        {
          years: "2020–2023",
          title: "Chongqing University (Recommended Admission)",
          detail: "Master of Architecture / Architectural History and Theory",
          zhTitle: "重庆大学（保研）",
          zhDetail: "建筑学/建筑历史与理论 · 硕士",
        },
        {
          years: "2015–2020",
          title: "Huazhong University of Science and Technology",
          detail: "Bachelor of Architecture",
          zhTitle: "华中科技大学",
          zhDetail: "建筑学 · 本科",
        },
      ],
    },
  ],
};

function navigationItem(item) {
  const externalAttrs = item.external ? ' target="_blank" rel="noreferrer"' : "";
  return `<a href="${item.href}"${externalAttrs}>${item.label}</a>`;
}

// 双身份面板中的能力清单
function identityList(items) {
  return `<ul class="identity-list">${items
    .map(item => `<li>${item}</li>`)
    .join("")}</ul>`;
}

// 竖向时间轴：分组标题 + 经历节点，悬停动效由样式控制
function timelineMarkup(groups) {
  return `<div class="career-timeline">${groups.map(group => `
    <section class="timeline-group">
      <h3 class="timeline-group-label"><span>${group.label}</span><span>${group.caption}</span></h3>
      <ol class="timeline-list">
        ${group.items.map(item => `
          <li class="timeline-item">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-body">
              <p class="timeline-years">${item.years}</p>
              <p class="timeline-en">${item.title}</p>
              <p class="timeline-en-meta">${item.detail}</p>
              ${item.note ? `<p class="timeline-en-meta">${item.note}</p>` : ""}
              <p class="timeline-zh">${item.zhTitle} · ${item.zhDetail}</p>
              ${item.zhNote ? `<p class="timeline-zh">${item.zhNote}</p>` : ""}
            </div>
          </li>`).join("")}
      </ol>
    </section>`).join("")}</div>`;
}

function articleItem(item, index, total) {
  return `
    <a class="article-card article-card--tone-${index % 4}" href="./article.html?slug=${encodeURIComponent(item.slug)}" aria-label="阅读文章：${item.title}">
      <span class="article-card-number">${String(total - index).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <time datetime="${item.date}">${item.date.replaceAll("-", ".")}</time>
    </a>
  `;
}

function projectMedia(item) {
  const media = item.video
    ? `<video class="project-film" loop muted playsinline preload="metadata" poster="./assets/${item.poster}" aria-label="${item.title}项目视频"><source src="./assets/${item.video}" type="${item.videoType || "video/mp4"}" /></video>`
    : `<img class="project-still" src="./assets/${item.image}" alt="${item.imageAlt}" loading="lazy" draggable="false" />`;
  return item.device ? `<span class="project-device"><span class="project-device-screen">${media}</span></span>` : media;
}

function render() {
  const app = document.querySelector("#app");
  const nav = document.querySelector("#site-nav");
  if (!app || !nav) return;

  nav.innerHTML = mockData.navigation.map(navigationItem).join("");

  app.innerHTML = `
    <section class="hero" id="home" aria-label="首页">
      <div class="reel">
        <video class="reel-video" src="./assets/homepage-showreel.mp4?v=6" poster="./assets/homepage-showreel.jpg?v=6" loop muted playsinline preload="metadata" aria-label="15 秒无声作品集：建筑影像与设计图纸、匣记本、婚礼指南与书摘"></video>
        <div class="reel-shade"></div>
      </div>
      <canvas class="reel-fluid-mask" aria-hidden="true"></canvas>
      <div class="hero-topline"><span>ZouYe / PERSONAL PORTFOLIO</span><span>ARCHITECTURE & AI</span></div>
      <div class="hero-title">
        <p class="hero-eyebrow">A CONTINUING EXPLORATION</p>
        <h1 lang="en">Hello，<br />I am ZouYe.</h1>
      </div>
      <div class="hero-bottom">
        <a class="scroll-link" href="#introduction" aria-label="向下探索"><span class="ui-icon ui-icon--down" aria-hidden="true"></span></a>
        <div class="reel-controls">
          <button class="reel-toggle" type="button" aria-label="播放首屏视频"><span class="ui-icon ui-icon--play" aria-hidden="true"></span></button>
        </div>
      </div>
      <div class="reel-progress" aria-hidden="true"><span></span></div>
    </section>

    <section class="introduction section-block" id="introduction" aria-labelledby="intro-heading">
      <p class="section-kicker" id="intro-heading">01 / About me</p>
      <div class="intro-label">
        ${timelineMarkup(mockData.timeline)}
      </div>
      <div class="intro-content">
        <p class="intro-english" lang="en">${mockData.profile.introEnglish}</p>
        <p class="intro-chinese">${mockData.profile.intro}</p>
        <a class="text-link" href="#about">联系我 CONTACT</a>
      </div>
    </section>

    <section class="section-block experiments" id="ai-projects" aria-labelledby="experiments-heading">
      <div class="section-heading">
        <div>
          <p class="section-kicker">02 / Selected experiments</p>
          <h2 id="experiments-heading">AI实践</h2>
          <p class="section-subtitle">产品与工具</p>
        </div>
        <p>实验记录：从真实需求出发，探索AI在生活中可触达与赋能的边界。</p>
      </div>
      <div class="project-showcase">
        <div class="project-pin">
          <div class="project-sticky">
            <div class="project-showcase-bar">
              <div class="experiment-tabs" role="group" aria-label="切换 AI 实践项目">
                ${mockData.aiProjects.map((item, index) => `<button type="button" class="experiment-tab${index === 0 ? " is-active" : ""}" aria-pressed="${index === 0}" data-project-index="${index}">${item.category}</button>`).join("")}
              </div>
              <span class="project-showcase-label">SELECTED PROJECTS / ${String(mockData.aiProjects.length).padStart(2, "0")}</span>
            </div>
            <div class="project-track" tabindex="0" role="region" aria-roledescription="轮播" aria-label="AI 实践作品，滚动或拖动浏览">
              ${mockData.aiProjects.map((item, index) => `
                <article class="project-gallery-card" data-project="${item.id}" aria-label="${item.title}">
                  <div class="project-gallery-media">
                    ${item.detailHref ? `<a class="project-gallery-link" href="${item.detailHref}" aria-label="查看${item.title}项目详情"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>` : '<div class="project-gallery-link">'}
                      ${projectMedia(item)}
                    ${item.detailHref ? "</a>" : "</div>"}
                    <span class="project-gallery-number">${String(index + 1).padStart(2, "0")} / ${String(mockData.aiProjects.length).padStart(2, "0")}</span>
                    ${item.video ? `<button class="project-film-toggle" type="button" aria-label="播放${item.title}视频"><span class="ui-icon ui-icon--play" aria-hidden="true"></span></button>` : ""}
                  </div>
                  <div class="project-gallery-copy">
                    <div class="project-gallery-heading"><h3>${item.title}</h3><span>${item.category}</span></div>
                    <p>${item.summary}</p>
                    <div class="project-gallery-bottom"><span>${item.type}</span>${item.detailHref ? `<a href="${item.detailHref}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${item.detailLabel || "查看项目"} <span aria-hidden="true">↗</span></a>` : `<span>${item.disclaimer}</span>`}</div>
                  </div>
                </article>`).join("")}
            </div>
            <div class="project-gallery-controls"><span class="project-deck-status" aria-live="polite">01 / ${String(mockData.aiProjects.length).padStart(2, "0")}</span><div class="project-deck-navigation"><button class="project-deck-prev" type="button" aria-label="上一个 AI 实践项目" disabled><img src="./assets/article-carousel-arrow.svg" alt="" /></button><button class="project-deck-next" type="button" aria-label="下一个 AI 实践项目"><img src="./assets/article-carousel-arrow.svg" alt="" /></button></div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="architecture-cta section-block" id="architecture">
      <div class="architecture-carousel" aria-hidden="true">
        ${Array.from({ length: 7 }, (_, index) => `
          <img class="architecture-slide${index === 0 ? " is-active" : ""}" src="./assets/architecture/home_bg_${String(index + 1).padStart(2, "0")}.jpg" alt="" loading="lazy" decoding="async" />
        `).join("")}
      </div>
      <div class="architecture-cta-copy">
        <p class="section-kicker">03 / Architecture portfolio</p>
        <h2>建筑与规划设计</h2>
        <p>2015-2025</p>
        <a class="button button--light" href="${portfolioUrl}" target="_blank" rel="noreferrer">
          查看作品集
        </a>
      </div>
      <span class="architecture-counter" aria-hidden="true">01 / 07</span>
    </section>

    <section class="articles-showcase" id="articles" aria-labelledby="articles-heading">
      <div class="articles-layout">
        <div class="articles-intro">
          <p class="section-kicker">04 / Notes from practice</p>
          <h2 id="articles-heading">实践文章</h2>
          <p class="articles-stat"><strong>${String(mockData.articles.length).padStart(2, "0")}</strong><span>篇文章<br />PUBLISHED NOTES</span></p>
          <p class="articles-description">把项目中的判断、方法和踩过的坑整理成可复用的文字。</p>
          <span class="articles-position" aria-live="polite">01 / ${String(mockData.articles.length).padStart(2, "0")}</span>
        </div>
        <div class="articles-rail-wrap">
          <button class="articles-edge articles-prev" type="button" aria-label="上一张文章卡片" disabled><img src="./assets/article-carousel-arrow.svg" alt="" /></button>
          <div class="articles-rail" tabindex="0" role="region" aria-roledescription="轮播" aria-label="实践文章卡片，左右滑动或使用方向键翻页">
            ${mockData.articles.slice().sort((a, b) => b.date.localeCompare(a.date)).map((item, index) => articleItem(item, index, mockData.articles.length)).join("")}
          </div>
          <button class="articles-edge articles-next" type="button" aria-label="下一张文章卡片"><img src="./assets/article-carousel-arrow.svg" alt="" /></button>
          <p class="articles-swipe-hint">SWIPE TO EXPLORE <span aria-hidden="true">→</span></p>
        </div>
      </div>
    </section>

    <section class="other-section section-block" id="other">
      <p class="section-kicker">05 / Other</p>
      <div class="other-content">
        <div>
          <h2>其他</h2>
          <p class="section-subtitle">摄影、平面设计……</p>
        </div>
        <p>正在建设，敬请期待</p>
      </div>
    </section>

    <section class="about section-block" id="about">
      <div class="about-portrait">
        <img class="about-portrait-img" src="./assets/yvette-portrait.jpg" alt="ZouYe 的个人照片" width="4348" height="6522" loading="lazy" />
        <span>ABOUT<br />ZouYe</span>
      </div>
      <div class="about-copy-block">
        <p class="section-kicker">06 / Contact Me</p>
        <h2 lang="en">Sincerity.<br />Beauty.<br /><em>Courage.</em></h2>
        <p>真诚、美好与勇气。<br />从建筑与规划出发，持续实践，保持探索。</p>
        <div class="skill-list">
          ${mockData.skills.map(skill => `<span>${skill}</span>`).join("")}
        </div>
        <p class="tool-list">${mockData.tools.join(" | ")}</p>
        <div class="about-actions">
          <div class="email-contact">
            <button class="text-link email-trigger" type="button" aria-expanded="false" aria-controls="email-menu">邮件联系 <span class="ui-icon ui-icon--mail" aria-hidden="true"></span></button>
            <div class="email-menu" id="email-menu">
              <span class="email-menu-label">点击邮箱地址即可复制</span>
              <button class="email-copy" type="button">${mockData.profile.email}</button>
              <span class="email-feedback" role="status" aria-live="polite"></span>
            </div>
          </div>
          <button class="text-link more-trigger" type="button">了解更多</button>
        </div>
      </div>
    </section>

    <dialog class="about-dialog" id="about-dialog" aria-labelledby="about-dialog-title">
      <div class="about-dialog-header">
        <p class="about-dialog-kicker">ABOUT ZOUYE / Q&A</p>
        <button class="about-dialog-close" type="button" aria-label="关闭对话框">×</button>
      </div>
      <h2 id="about-dialog-title">更多关于我，<br /><em>从一个问题开始。</em></h2>
      <p class="about-dialog-note">回答依据本站公开的简历、项目与文章。资料里没有的，我会直接说明。</p>
      <div class="about-dialog-suggestions" aria-label="示例问题">
        <button type="button" data-question="你的学习背景是什么？">学习背景</button>
        <button type="button" data-question="你做过哪些工作？">工作经历</button>
        <button type="button" data-question="你目前在探索什么？">当前探索</button>
      </div>
      <div class="about-chat-log" role="log" aria-label="对话记录" aria-live="polite">
        <div class="about-chat-message about-chat-message--assistant"><span>AI 回答</span><p>你好，可以问我关于学习、工作和当前实践的问题。</p></div>
      </div>
      <form class="about-chat-form">
        <label class="visually-hidden" for="about-question">输入关于 ZouYe 的问题</label>
        <input id="about-question" name="question" type="text" placeholder="输入你想了解的问题…" maxlength="300" required />
        <button type="submit">发送</button>
      </form>
    </dialog>
  `;
}

render();
// 内容由脚本插入，首次打开带锚点的网址时需在目标节点出现后滚动。
if (window.location.hash) {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target) window.requestAnimationFrame(() => target.scrollIntoView());
}
initArticleCarousel();
initExperimentStage();
initShowreel();
initFluidReveal(document.querySelector(".hero"));
initArchitectureCarousel();
initScrollNavigation();
initContactInteractions();

function initExperimentStage() {
  const stage = document.querySelector(".project-showcase");
  const pin = stage.querySelector(".project-pin"), sticky = stage.querySelector(".project-sticky");
  const track = stage.querySelector(".project-track");
  const cards = [...stage.querySelectorAll(".project-gallery-card")];
  const tabs = [...stage.querySelectorAll(".experiment-tab")];
  const prev = stage.querySelector(".project-deck-prev"), next = stage.querySelector(".project-deck-next");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const pinPreference = matchMedia("(min-width: 1101px) and (prefers-reduced-motion: no-preference)");
  const userPaused = new Set(), visible = new Set();
  let pinned = false;
  let active = 0, travel = 0, current = 0, target = 0, frame = 0;
  let dragging = null, suppressClick = false;

  function syncVideos() {
    cards.forEach((card, index) => {
      const video = card.querySelector("video");
      if (!video) return;
      if (visible.has(index) && !document.hidden && !userPaused.has(index) && !reducedMotion.matches) video.play().catch(() => {});
      else video.pause();
    });
  }
  function updateControls(offset) {
    active = travel > 0 ? Math.max(0, Math.min(cards.length - 1, Math.round(offset / travel * (cards.length - 1)))) : 0;
    tabs.forEach((tab, index) => {
      tab.classList.toggle("is-active", index === active);
      tab.setAttribute("aria-pressed", String(index === active));
    });
    prev.disabled = offset <= 2;
    next.disabled = offset >= travel - 2;
    const label = `${String(active + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    const status = stage.querySelector(".project-deck-status");
    if (status.textContent !== label) status.textContent = label;
  }
  function tick() {
    current += (target - current) * .2;
    if (Math.abs(target - current) < .5) current = target;
    track.style.transform = `translate3d(${-current}px,0,0)`;
    updateControls(current);
    frame = current === target ? 0 : requestAnimationFrame(tick);
  }
  function updatePin() {
    if (!pinned) return;
    const start = pin.getBoundingClientRect().top + scrollY;
    target = Math.max(0, Math.min(travel, scrollY - start));
    if (!frame) frame = requestAnimationFrame(tick);
  }
  function measure() {
    stage.classList.toggle("is-pinned", pinPreference.matches);
    pinned = pinPreference.matches && cards.every(card => card.offsetHeight <= track.clientHeight);
    stage.classList.toggle("is-pinned", pinned);
    if (pinned) {
      track.scrollLeft = 0;
      const last = cards.at(-1);
      travel = Math.max(0, last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight) - sticky.clientWidth);
      pin.style.height = `${innerHeight + travel}px`;
      updatePin();
    } else {
      cancelAnimationFrame(frame); frame = 0;
      current = target = 0;
      track.style.transform = "";
      pin.style.height = "";
      travel = Math.max(0, track.scrollWidth - track.clientWidth);
      updateControls(track.scrollLeft);
    }
  }
  function goTo(index) {
    index = Math.max(0, Math.min(cards.length - 1, index));
    const offset = travel * index / Math.max(1, cards.length - 1);
    const behavior = reducedMotion.matches ? "auto" : "smooth";
    if (pinned) window.scrollTo({ top: pin.getBoundingClientRect().top + scrollY + offset, behavior });
    else track.scrollTo({ left: offset, behavior });
  }
  tabs.forEach((tab, index) => tab.addEventListener("click", () => goTo(index)));
  prev.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  track.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  });
  track.addEventListener("scroll", () => { if (!pinned) updateControls(track.scrollLeft); }, { passive: true });
  track.addEventListener("wheel", event => {
    if (pinned || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1);
    const offset = track.scrollLeft;
    if ((delta < 0 && offset <= 1) || (delta > 0 && offset >= travel - 1)) return;
    event.preventDefault();
    track.scrollLeft += delta;
  }, { passive: false });
  track.addEventListener("pointerdown", event => {
    if (pinned || event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("button")) return;
    dragging = { x: event.clientX, scroll: track.scrollLeft, moved: false };
  });
  track.addEventListener("pointermove", event => {
    if (dragging) {
      const dx = event.clientX - dragging.x;
      if (Math.abs(dx) > 5) {
        dragging.moved = true;
        track.setPointerCapture(event.pointerId);
        track.classList.add("is-dragging");
      }
      if (dragging.moved) track.scrollLeft = dragging.scroll - dx;
    }
  });
  function endDrag(event) {
    if (!dragging) return;
    suppressClick = dragging.moved;
    dragging = null;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    setTimeout(() => { suppressClick = false; }, 0);
  }
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("click", event => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); } }, true);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const index = cards.indexOf(entry.target);
      if (entry.isIntersecting && entry.intersectionRatio >= .2) visible.add(index);
      else visible.delete(index);
    });
    syncVideos();
  }, { threshold: [0, .2, .6] });
  cards.forEach((card, index) => {
    observer.observe(card);
    const video = card.querySelector("video"), button = card.querySelector(".project-film-toggle");
    if (!video) return;
    const update = () => {
      button.setAttribute("aria-label", `${video.paused ? "播放" : "暂停"}${mockData.aiProjects[index].title}视频`);
      button.innerHTML = `<span class="ui-icon ui-icon--${video.paused ? "play" : "pause"}" aria-hidden="true"></span>`;
    };
    video.addEventListener("play", update);
    video.addEventListener("pause", update);
    button.addEventListener("click", () => {
      if (video.paused) { userPaused.delete(index); video.play().catch(() => {}); }
      else { userPaused.add(index); video.pause(); }
    });
  });
  window.addEventListener("scroll", updatePin, { passive: true });
  window.addEventListener("resize", measure);
  pinPreference.addEventListener("change", measure);
  reducedMotion.addEventListener("change", syncVideos);
  document.addEventListener("visibilitychange", syncVideos);
  measure();
}
function initArticleCarousel() {
  const rail = document.querySelector(".articles-rail");
  const cards = [...rail.querySelectorAll(".article-card")];
  const previous = document.querySelector(".articles-prev");
  const next = document.querySelector(".articles-next");
  const position = document.querySelector(".articles-position");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let settleTimer = 0;
  let wheelLockedUntil = 0;

  function cardOffset(card) {
    return card.offsetLeft - cards[0].offsetLeft;
  }

  function updateControls() {
    position.textContent = `${String(active + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    previous.disabled = active === 0;
    next.disabled = active === cards.length - 1;
  }

  function syncFromScroll() {
    active = cards.reduce((closest, card, index) =>
      Math.abs(cardOffset(card) - rail.scrollLeft) < Math.abs(cardOffset(cards[closest]) - rail.scrollLeft) ? index : closest, 0);
    updateControls();
  }

  function goTo(index) {
    const target = Math.max(0, Math.min(cards.length - 1, index));
    active = target;
    updateControls();
    rail.scrollTo({ left: cardOffset(cards[target]), behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  previous.addEventListener("click", () => goTo(active - 1));
  next.addEventListener("click", () => goTo(active + 1));
  rail.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  });
  rail.addEventListener("wheel", event => {
    if (!event.target.closest(".article-card") || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const direction = Math.sign(event.deltaY);
    if (active + direction < 0 || active + direction >= cards.length) return;
    event.preventDefault();
    if (performance.now() < wheelLockedUntil) return;
    wheelLockedUntil = performance.now() + 420;
    goTo(active + direction);
  }, { passive: false });
  rail.addEventListener("scroll", () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(syncFromScroll, 120);
  }, { passive: true });
  window.addEventListener("resize", syncFromScroll);
  updateControls();
}

function initContactInteractions() {
  const contact = document.querySelector(".email-contact");
  const trigger = contact.querySelector(".email-trigger");
  const menu = contact.querySelector(".email-menu");
  const feedback = contact.querySelector(".email-feedback");
  const dialog = document.querySelector("#about-dialog");
  const questionInput = dialog.querySelector("#about-question");
  const chatLog = dialog.querySelector(".about-chat-log");

  function setEmailMenuOpen(open) {
    if (open) {
      const { top, bottom } = trigger.getBoundingClientRect();
      contact.classList.toggle("is-flipped", window.innerHeight - bottom < menu.offsetHeight && top > menu.offsetHeight);
    }
    contact.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
  }

  contact.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") setEmailMenuOpen(true);
  });
  contact.addEventListener("pointerleave", event => {
    if (event.pointerType === "mouse") setEmailMenuOpen(false);
  });
  contact.addEventListener("focusin", () => setEmailMenuOpen(true));
  contact.addEventListener("focusout", event => {
    if (!contact.contains(event.relatedTarget)) setEmailMenuOpen(false);
  });
  trigger.addEventListener("click", () => setEmailMenuOpen(true));
  document.addEventListener("pointerdown", event => {
    if (!contact.contains(event.target)) setEmailMenuOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setEmailMenuOpen(false);
  });

  contact.querySelector(".email-copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mockData.profile.email);
      feedback.textContent = "邮箱已复制";
    } catch {
      feedback.textContent = "复制失败，请手动复制邮箱地址";
    }
  });

  document.querySelector(".more-trigger").addEventListener("click", () => {
    setEmailMenuOpen(false);
    dialog.showModal();
    questionInput.focus();
  });
  dialog.querySelector(".about-dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  const chatHistory = [];
  let answering = false;

  function addChatMessage(kind, message, labelText) {
    const item = document.createElement("div");
    item.className = `about-chat-message about-chat-message--${kind}`;
    const label = document.createElement("span");
    label.textContent = labelText || (kind === "assistant" ? "AI 回答" : "访客提问");
    const body = document.createElement("p");
    body.textContent = message;
    item.append(label, body);
    chatLog.append(item);
    chatLog.scrollTop = chatLog.scrollHeight;
    return item;
  }

  function renderSources(item, sources) {
    if (!sources?.length) return;
    const list = document.createElement("ul");
    list.className = "about-chat-sources";
    for (const source of sources) {
      if (!source?.url) continue;
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = source.url;
      link.textContent = source.title || source.url;
      if (/^https?:/i.test(source.url)) link.target = "_blank";
      link.rel = "noreferrer";
      li.append(link);
      list.append(li);
    }
    if (list.childElementCount) item.append(list);
  }

  function setAnswering(busy) {
    answering = busy;
    questionInput.disabled = busy;
    dialog.querySelector(".about-chat-form button").disabled = busy;
    dialog.querySelectorAll("[data-question]").forEach(button => {
      button.disabled = busy;
    });
  }

  function rememberTurn(question, answer) {
    chatHistory.push({ role: "user", content: question }, { role: "assistant", content: answer });
    if (chatHistory.length > 8) chatHistory.splice(0, chatHistory.length - 8);
  }

  // 接口不可用时退回原来的规则答案，避免对话框完全不能用。
  function getDemoAnswer(question) {
    if (/学习|教育|学历|大学|硕士|本科/.test(question)) {
      return "我本科就读于华中科技大学建筑学专业，后在重庆大学攻读建筑学硕士，方向为建筑历史与理论。";
    }
    if (/工作|经历|设计院|政府/.test(question)) {
      return "我有2年设计院工作经历，曾借调至政府部门挂职。在广东省城乡规划设计研究院担任助理工程师。";
    }
    if (/AI|工具|产品|实践|Cursor|Codex|Coze|Notion/i.test(question)) {
      return "我目前独立进行 AI 实践，从真实需求出发，探索 AI 在生活中可触达与赋能的边界。这个网站的 AI 项目仍使用演示数据。";
    }
    if (/建筑|规划|遗产|作品集/.test(question)) {
      return "建筑与规划是我的专业起点。2015-2025 年的建筑作品已整理在独立作品集站点中；遗产保护也是我的关注方向之一。";
    }
    return "这个问题不在离线资料里。网络恢复后我会按知识库回答，也可以发邮件联系我。";
  }

  async function readAnswer(response, body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    const sources = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        let event;
        try {
          event = JSON.parse(payload);
        } catch {
          continue;
        }
        if (event.type === "delta" && event.text) {
          text += event.text;
          body.textContent = text;
          chatLog.scrollTop = chatLog.scrollHeight;
        } else if (event.type === "sources") {
          sources.push(...(event.sources || []));
        } else if (event.type === "error" && !text) {
          throw new Error("offline");
        }
      }
    }
    return { text, sources };
  }

  async function askQuestion(question) {
    const value = question.trim();
    if (!value || answering) return;
    addChatMessage("visitor", value);
    questionInput.value = "";
    const pending = addChatMessage("assistant", "思考中", "AI 回答");
    const body = pending.querySelector("p");
    pending.classList.add("is-streaming");
    setAnswering(true);
    try {
      if (location.protocol === "file:") throw new Error("offline");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value, history: chatHistory.slice(-8) }),
      });
      if (response.status === 429) {
        body.textContent = "提问有点频繁，请稍后再试。";
        return;
      }
      if (response.status === 400) {
        const errorBody = await response.json().catch(() => ({}));
        body.textContent = errorBody.error || "这个问题没有发送成功。";
        return;
      }
      if (!response.ok || !response.body) throw new Error("offline");
      const result = await readAnswer(response, body);
      body.textContent = result.text || "这次没有生成回答，请再试一次。";
      renderSources(pending, result.sources);
      rememberTurn(value, body.textContent);
    } catch {
      pending.querySelector("span").textContent = "离线回答";
      body.textContent = getDemoAnswer(value);
      rememberTurn(value, body.textContent);
    } finally {
      pending.classList.remove("is-streaming");
      setAnswering(false);
      questionInput.focus();
    }
  }

  dialog.querySelector(".about-chat-form").addEventListener("submit", event => {
    event.preventDefault();
    askQuestion(questionInput.value);
  });
  dialog.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => askQuestion(button.dataset.question));
  });
}

function initArchitectureCarousel() {
  const section = document.querySelector(".architecture-cta");
  const slides = [...section.querySelectorAll(".architecture-slide")];
  const counter = section.querySelector(".architecture-counter");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let inView = false;
  let timer = 0;

  function stop() {
    window.clearInterval(timer);
    timer = 0;
  }

  function sync() {
    stop();
    if (!inView || document.hidden || reducedMotion.matches) return;
    timer = window.setInterval(() => {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
      counter.textContent = `${String(current + 1).padStart(2, "0")} / 07`;
    }, 5000);
  }

  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    sync();
  }).observe(section);
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener("change", sync);
}

function initScrollNavigation() {
  const header = document.querySelector(".topbar");
  if (!header) return;
  let pending = false;
  function update() {
    const visible = window.scrollY > 80;
    header.classList.toggle("is-visible", visible);
    header.inert = !visible;
    header.setAttribute("aria-hidden", String(!visible));
    pending = false;
  }
  window.addEventListener("scroll", () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("pageshow", update);
  update();
}

function initShowreel() {
  const hero = document.querySelector(".hero");
  const video = hero.querySelector(".reel-video");
  const button = hero.querySelector(".reel-toggle");
  const progress = hero.querySelector(".reel-progress span");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = reducedMotion.matches;
  let inView = false;

  function paint() {
    const ratio = video.duration > 0 ? video.currentTime / video.duration : 0;
    progress.style.transform = `scaleX(${ratio})`;
  }

  function updateButton() {
    const action = video.paused ? "play" : "pause";
    button.setAttribute("aria-label", video.paused ? "播放首屏视频" : "暂停首屏视频");
    button.firstElementChild.className = `ui-icon ui-icon--${action}`;
  }

  function sync() {
    if (userPaused || !inView || document.hidden) video.pause();
    else if (video.paused) video.play().catch(updateButton);
  }

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", paint);
  video.addEventListener("error", () => { button.hidden = true; });
  button.addEventListener("click", () => { userPaused = !video.paused; sync(); });
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener("change", event => { userPaused = event.matches; sync(); });
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    sync();
  }).observe(hero);
}

// ---------- 指针驱动的纹理网格变形 ----------
// 视口铺满交点网格，每格从纹理图采样；指针附近交点向外推开，
// 图像被局部拉伸，形成轻微的“撑起”效果。画布 opacity 调低，
// 并与纸色底色混合，避免压过页面内容。

function initPointerGrid() {
  const canvas = document.querySelector("#pointer-grid");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const image = new Image();
  image.src = "./assets/bg-texture.jpg";

  const spacing = 64;
  const radius = 160;
  const strength = 36;
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, target: 0 };

  let cols = 0;
  let rows = 0;
  let restX = null;
  let restY = null;
  let srcX = null;
  let srcY = null;
  let drawX = null;
  let drawY = null;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;
  let imageReady = false;
  let imgW = 0;
  let imgH = 0;
  let imageScale = 1;

  function rebuild() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(width / spacing) + 2;
    rows = Math.ceil(height / spacing) + 2;
    const count = cols * rows;
    restX = new Float32Array(count);
    restY = new Float32Array(count);
    srcX = new Float32Array(count);
    srcY = new Float32Array(count);
    drawX = new Float32Array(count);
    drawY = new Float32Array(count);

    const offsetX = (width - (cols - 1) * spacing) / 2;
    const offsetY = (height - (rows - 1) * spacing) / 2;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = row * cols + col;
        restX[index] = offsetX + col * spacing;
        restY[index] = offsetY + row * spacing;
      }
    }
  }

  function buildSourceMap() {
    if (!imageReady) return;
    imageScale = Math.max(width / imgW, height / imgH);
    const drawW = imgW * imageScale;
    const drawH = imgH * imageScale;
    const ox = (width - drawW) / 2;
    const oy = (height - drawH) / 2;
    const count = cols * rows;

    for (let i = 0; i < count; i += 1) {
      srcX[i] = (restX[i] - ox) / imageScale;
      srcY[i] = (restY[i] - oy) / imageScale;
    }
  }

  function displace(index) {
    const px = restX[index];
    const py = restY[index];
    if (pointer.active < 0.01) return [px, py];

    const dx = px - pointer.x;
    const dy = py - pointer.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    if (dist >= radius) return [px, py];

    const falloff = 1 - dist / radius;
    const force = falloff * falloff * strength * pointer.active;
    return [px + (dx / dist) * force, py + (dy / dist) * force];
  }

  function draw() {
    pointer.x += (pointer.tx - pointer.x) * 0.16;
    pointer.y += (pointer.ty - pointer.y) * 0.16;
    pointer.active += (pointer.target - pointer.active) * 0.12;

    ctx.clearRect(0, 0, width, height);

    if (!imageReady) {
      ctx.fillStyle = "#d8b6ae";
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // 先画一层完整纹理，保证变形网格边缘不露底
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(image, 0, 0, imgW, imgH, (width - imgW * imageScale) / 2, (height - imgH * imageScale) / 2, imgW * imageScale, imgH * imageScale);

    const count = cols * rows;
    for (let i = 0; i < count; i += 1) {
      const [x, y] = displace(i);
      drawX[i] = x;
      drawY[i] = y;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 逐格绘制：目标四边形随指针变形，源矩形保持均匀采样
    for (let row = 0; row < rows - 1; row += 1) {
      for (let col = 0; col < cols - 1; col += 1) {
        const i = row * cols + col;
        const x1 = drawX[i];
        const y1 = drawY[i];
        const x2 = drawX[i + 1];
        const y2 = drawY[i + 1];
        const x4 = drawX[i + cols];
        const y4 = drawY[i + cols];

        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        const dx2 = x4 - x1;
        const dy2 = y4 - y1;

        ctx.setTransform(dpr * dx1 / spacing, dpr * dy1 / spacing, dpr * dx2 / spacing, dpr * dy2 / spacing, dpr * x1, dpr * y1);
        ctx.drawImage(image, srcX[i], srcY[i], spacing / imageScale, spacing / imageScale, 0, 0, spacing, spacing);
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function loop() {
    draw();
    rafId = window.requestAnimationFrame(loop);
  }

  function onPointerMove(event) {
    pointer.tx = event.clientX;
    pointer.ty = event.clientY;
    pointer.target = 1;
  }

  function onPointerLeave() {
    pointer.target = 0;
  }

  image.onload = () => {
    imgW = image.naturalWidth || image.width;
    imgH = image.naturalHeight || image.height;
    imageReady = true;
    buildSourceMap();
  };

  rebuild();
  if (image.complete && image.naturalWidth) {
    imgW = image.naturalWidth;
    imgH = image.naturalHeight;
    imageReady = true;
    buildSourceMap();
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onPointerLeave);
  window.addEventListener("blur", onPointerLeave);
  window.addEventListener("resize", () => {
    rebuild();
    buildSourceMap();
  });

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!prefersReduced.matches) {
    loop();
  }

  prefersReduced.addEventListener("change", event => {
    if (event.matches) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
      if (imageReady) {
        // 减少动效时退化为静态纹理平铺
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.drawImage(image, 0, 0, imgW, imgH, (width - imgW * imageScale) / 2, (height - imgH * imageScale) / 2, imgW * imageScale, imgH * imageScale);
      }
      return;
    }
    if (!rafId) {
      rebuild();
      buildSourceMap();
      loop();
    }
  });
}
