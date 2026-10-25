/* 首頁渲染：hero CTA、研究主題預覽卡片、最新消息清單（含展開更多／點開單篇彈窗）。 */

const RESEARCH_PREVIEW_COUNT = 3;
const NEWS_VISIBLE_COUNT = 5;

let newsExpanded = false;

function renderHero() {
  document.getElementById("hero-cta").textContent = t("hero_cta");
}

function renderResearchPreview() {
  document.getElementById("research-section-title").textContent = t("research_section_title");

  const grid = document.getElementById("research-preview-grid");
  grid.innerHTML = RESEARCH_DATA.filter((item) => item.showOnHome !== false)
    .slice(0, RESEARCH_PREVIEW_COUNT)
    .map(
      (item) => `
        <div class="card">
          ${cardImageHtml(item.image)}
          <div class="card-body">
            <h3>${pick(item.title)}</h3>
            <p>${pick(item.summary)}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function openNewsModal(item) {
  const body = document.getElementById("news-modal-body");
  const imageHtml = item.image ? `<img src="${item.image}" alt="">` : "";
  const detailText = item.detail ? pick(item.detail) : pick(item.text);

  body.innerHTML = `
    ${imageHtml}
    <div class="modal-date">${pick(item.date)}</div>
    <p>${detailText}</p>
  `;

  document.getElementById("news-modal-overlay").classList.add("open");
}

function closeNewsModal() {
  document.getElementById("news-modal-overlay").classList.remove("open");
}

function renderNews() {
  document.getElementById("news-section-title").textContent = t("news_section_title");

  const visibleData = newsExpanded ? NEWS_DATA : NEWS_DATA.slice(0, NEWS_VISIBLE_COUNT);

  const list = document.getElementById("news-list");
  list.innerHTML = visibleData
    .map(
      (item, index) => `
      <li class="news-item" data-index="${index}">
        <span class="news-date">${pick(item.date)}</span>
        <span class="news-text">${pick(item.text)}</span>
      </li>
    `
    )
    .join("");

  list.querySelectorAll(".news-item").forEach((el) => {
    el.addEventListener("click", () => openNewsModal(visibleData[Number(el.dataset.index)]));
  });

  const toggleBtn = document.getElementById("news-toggle-btn");
  if (NEWS_DATA.length <= NEWS_VISIBLE_COUNT) {
    toggleBtn.style.display = "none";
  } else {
    toggleBtn.style.display = "inline-block";
    toggleBtn.textContent = newsExpanded ? t("news_show_less") : t("news_show_more");
  }
}

function renderFunding() {
  document.getElementById("funding-section-title").textContent = t("funding_section_title");

  const grid = document.getElementById("funding-grid");
  grid.innerHTML = FUNDING_DATA.map(
    (item) => `
      <div class="card funding-card">
        ${item.logo ? `<img class="funding-logo" src="${item.logo}" alt="${pick(item.name)}">` : ""}
        <div class="card-body">
          <h3>${pick(item.name)}</h3>
        </div>
      </div>
    `
  ).join("");
}

function renderHomePage() {
  renderHero();
  renderResearchPreview();
  renderNews();
  renderFunding();
}

document.getElementById("news-toggle-btn").addEventListener("click", () => {
  newsExpanded = !newsExpanded;
  renderNews();
});

document.getElementById("news-modal-close").addEventListener("click", closeNewsModal);
document.getElementById("news-modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "news-modal-overlay") closeNewsModal();
});

renderHomePage();
document.addEventListener("langchange", renderHomePage);
