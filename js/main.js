/* 共用版型：導覽列與頁尾的渲染、語言切換、行動版選單。
   每個 .html 頁面只要放 <header id="site-header"></header> 與 <footer id="site-footer"></footer>
   兩個空容器，並在 <body data-page="xxx"> 標記目前頁面，這裡就會自動把內容補上去。 */

// 卡片頂部圖片：image 欄位有值時回傳一個 <img>，放在標題和內文之上、卡片最頂端；
// 沒有圖片時回傳空字串，卡片就只剩文字區塊，底色用 .card 預設的半透明亮紫。
function cardImageHtml(image) {
  if (!image) return "";
  return `<img class="card-image" src="${image}" alt="">`;
}

const NAV_ITEMS = [
  { page: "research", href: "research.html", key: "nav_research" },
  { page: "team", href: "team.html", key: "nav_team" },
  { page: "publications", href: "publications.html", key: "nav_publications" },
  { page: "contact", href: "contact.html", key: "nav_contact" },
];

// hero 用 calc(100vh - var(--header-height)) 填滿剩餘高度，這裡量出 nav-bar 實際高度寫回 CSS 變數。
function syncHeaderHeightVar() {
  const header = document.getElementById("site-header");
  if (!header) return;
  document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;

  const currentPage = document.body.dataset.page;

  const linksHtml = NAV_ITEMS.map((item) => {
    const activeClass = item.page === currentPage ? " active" : "";
    return `<li><a href="${item.href}" class="${activeClass.trim()}">${t(item.key)}</a></li>`;
  }).join("");

  el.innerHTML = `
    <div class="nav-bar">
      <a href="index.html" class="nav-brand">
        <img alt="${t("brand_name")}" class="nav-logo" id="nav-logo">
        <span class="dot" id="nav-logo-dot"></span>
      </a>
      <div class="nav-right">
        <ul class="nav-links" id="nav-links">
          ${linksHtml}
        </ul>
        <div class="nav-actions">
          <button class="lang-toggle" id="lang-toggle-btn">${t("lang_toggle_label")}</button>
          <button class="nav-toggle-btn" id="nav-toggle-btn" aria-label="Menu">&#9776;</button>
        </div>
      </div>
    </div>
  `;

  // 還沒放 logo.png 之前用一個小圓點當佔位符；圖片放好後改顯示圖片、隱藏圓點。
  // 監聽器要在設定 src 之前掛上，避免圖片從快取瞬間載入時錯過 load 事件。
  const logoImg = document.getElementById("nav-logo");
  const logoDot = document.getElementById("nav-logo-dot");
  logoImg.style.display = "none";
  logoImg.addEventListener("load", () => {
    logoImg.style.display = "block";
    logoDot.style.display = "none";
    syncHeaderHeightVar();
  });
  logoImg.src = "assets/img/logo/logo.png";

  document.getElementById("nav-toggle-btn").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
  });

  document.getElementById("lang-toggle-btn").addEventListener("click", () => {
    toggleLang();
    renderHeader();
    renderFooter();
    document.dispatchEvent(new CustomEvent("langchange"));
  });

  syncHeaderHeightVar();
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;

  const phonesHtml = CONTACT_DATA.phones
    .map((p) => `${pick(p.label)}: ${p.number}`)
    .join("<br>");

  // email 若不含 @（例如刻意寫成 "xxx [at] xxx" 來避免被機器人爬到信箱），就不做成 mailto 連結，純文字顯示。
  const emailHtml = CONTACT_DATA.email.includes("@")
    ? `<a href="mailto:${CONTACT_DATA.email}">${CONTACT_DATA.email}</a>`
    : CONTACT_DATA.email;

  const year = new Date().getFullYear();

  el.innerHTML = `
    <div class="footer-inner">
      <div>
        <strong>${t("brand_name")}</strong><br>
        ${t("footer_address_label")}: ${pick(CONTACT_DATA.address)}
      </div>
      <div>
        ${t("footer_email_label")}: ${emailHtml}<br>
        ${t("footer_phone_label")}: ${phonesHtml}
      </div>
    </div>
    <div class="footer-bottom">&copy; ${year} ${t("brand_name")}. ${t("footer_rights")} &nbsp;&middot;&nbsp; <a href="https://ultra-lab.tail9f8e08.ts.net/" target="_blank" rel="noopener">${t("footer_member_portal")}</a></div>
  `;
}

function handleHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}

/* 這支 script 標籤放在 </body> 之前，DOM 此時已經解析完畢，
   所以直接呼叫渲染函式即可，不需要等待 DOMContentLoaded（那時機已經過了）。 */
renderHeader();
renderFooter();
window.addEventListener("scroll", handleHeaderScroll);
window.addEventListener("resize", syncHeaderHeightVar);
