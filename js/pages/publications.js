/* Publications 頁面渲染：journals 用「封面/編號＋標題＋作者＋期刊資訊」卡片排版（由新到舊）。
   conferences／patents 文字排版仿效 journals（標題粗體、作者較淡、出處資訊＋Link，Poster/獎項標籤
   另起一行），但一律用編號（不顯示圖片）。三類清單都依年份由新到舊排序。
   頁面上方有篩選列（年份／類型／作者搜尋），篩選只決定要不要顯示某筆，不會影響編號（見
   numberPublications() 的說明）。 */

// 從 journalInfo／info 文字尾端抓出像「(Poster Presentation, Best Paper Award)」這種純文字附註
// （必須整個被括號包住、以英文字母開頭，跟年份「(2026).」這種數字括號區分開），拆成獨立的標籤陣列，
// 拆分純粹是渲染時的文字處理，不會改到資料本身的文字內容。
function splitInfoTags(text) {
  const m = text.match(/^(.*?)\s*\(([A-Za-z][^()]*)\)\s*$/s);
  if (!m) return { base: text, tags: [] };
  return { base: m[1], tags: m[2].split(/,\s*/) };
}

function infoTagsHtml(tags) {
  return tags.map((tag) => `<span class="pub-card-tag">${tag}</span>`).join(" ");
}

// 依年份新到舊排序（畫面顯示順序）。同年份打平手時，用「資料檔裡原始位置」當第二排序鍵：
// 同一年裡資料檔排比較後面的那篇視為比較新（顯示在比較上面、編號比較大），跟 Bo-Han 確認過的規則一致。
function sortByYearNewestFirst(list) {
  return list
    .map((item, idx) => ({ item, idx }))
    .sort((a, b) => b.item.year - a.item.year || b.idx - a.idx)
    .map((entry) => entry.item);
}

// 把作者欄位裡的 <strong><u>...</u></strong> 之類的標籤拿掉，只留純文字，供作者搜尋比對用。
function stripTags(html) {
  return html.replace(/<[^>]+>/g, "");
}

// 把整份清單依年份排序＋算好「最舊 = 1，最新 = 最大」的固定編號（見 renderJournalSection 的說明）。
// 這個編號只看完整資料，跟篩選結果無關，所以篩選只是把不符合的項目從這份清單中濾掉，不會讓編號跳動。
function numberPublications(list) {
  const sorted = sortByYearNewestFirst(list);
  return sorted.map((item, i) => ({ item, number: sorted.length - i }));
}

// journal 卡片：封面圖／編號（依寬度切換，沒有 cover 時一律退回顯示編號）＋標題＋作者＋期刊資訊＋Link。
function journalItemHtml(journal, number) {
  const coverClass = journal.cover ? "has-cover" : "no-cover";
  const coverImg = journal.cover ? `<img src="${journal.cover}" alt="" loading="lazy">` : "";
  const linkHtml = journal.link
    ? ` <a class="pub-card-link" href="${journal.link}" target="_blank" rel="noopener">${t("team_link_default_label")}</a>`
    : "";
  const { base, tags } = splitInfoTags(journal.journalInfo);
  const tagsHtml = tags.length ? `<p class="pub-card-tags">${infoTagsHtml(tags)}</p>` : "";
  return `
    <li class="journal-item">
      <div class="journal-cover ${coverClass}">
        ${coverImg}
        <span class="journal-number">${number}.</span>
      </div>
      <div class="pub-card-body">
        <p class="pub-card-title">${journal.title}</p>
        <p class="pub-card-authors">${journal.authors}</p>
        <p class="pub-card-info">${base}${linkHtml}</p>
        ${tagsHtml}
      </div>
    </li>`;
}

// conference／patent 卡片：固定編號方塊（不顯示圖片）＋標題＋作者＋出處資訊＋Link。
// flag（選填，目前只有 patents 在用）：國旗圖片路徑，放在出處資訊文字最前面。
function pubCardHtml(pub, number) {
  const flagHtml = pub.flag ? `<img class="pub-card-flag" src="${pub.flag}" alt="">` : "";
  const linkHtml = pub.link
    ? ` <a class="pub-card-link" href="${pub.link}" target="_blank" rel="noopener">${t("team_link_default_label")}</a>`
    : "";
  const { base, tags } = splitInfoTags(pub.info);
  const tagsHtml = tags.length ? `<p class="pub-card-tags">${infoTagsHtml(tags)}</p>` : "";
  return `
    <li class="pub-card-item">
      <div class="pub-card-number">${number}.</div>
      <div class="pub-card-body">
        <p class="pub-card-title">${pub.title}</p>
        <p class="pub-card-authors">${pub.authors}</p>
        <p class="pub-card-info">${flagHtml}${base}${linkHtml}</p>
        ${tagsHtml}
      </div>
    </li>`;
}

// 篩選狀態：years 是 Set（空集合＝不篩年份，全部顯示）；types 是三個類型各自的勾選狀態；
// authorQuery 是搜尋框文字（已轉小寫），三種條件是「且」的關係。
const pubFilterState = {
  years: new Set(),
  types: { journal: true, conference: true, patent: true },
  authorQuery: "",
};

function matchesAuthorQuery(authorsHtml) {
  if (!pubFilterState.authorQuery) return true;
  return stripTags(authorsHtml).toLowerCase().includes(pubFilterState.authorQuery);
}

function matchesYear(year) {
  return !pubFilterState.years.size || pubFilterState.years.has(year);
}

// publications 篩選後是空清單時，把整個 section（標題＋清單）隱藏，不要顯示一個空標題；
// 回傳實際渲染了幾筆，讓 renderPublicationLists() 判斷要不要顯示「沒有符合篩選條件」的提示。
function renderJournalSection(sectionId, listId, journals) {
  const section = document.getElementById(sectionId);
  if (!pubFilterState.types.journal) {
    section.style.display = "none";
    return 0;
  }
  const visible = numberPublications(journals).filter(
    ({ item }) => matchesYear(item.year) && matchesAuthorQuery(item.authors)
  );
  if (!visible.length) {
    section.style.display = "none";
    return 0;
  }
  section.style.display = "";
  document.getElementById(listId).innerHTML = visible.map(({ item, number }) => journalItemHtml(item, number)).join("");
  return visible.length;
}

function renderPubCardSection(sectionId, listId, publications, typeKey) {
  const section = document.getElementById(sectionId);
  if (!pubFilterState.types[typeKey]) {
    section.style.display = "none";
    return 0;
  }
  const visible = numberPublications(publications).filter(
    ({ item }) => matchesYear(item.year) && matchesAuthorQuery(item.authors)
  );
  if (!visible.length) {
    section.style.display = "none";
    return 0;
  }
  section.style.display = "";
  document.getElementById(listId).innerHTML = visible.map(({ item, number }) => pubCardHtml(item, number)).join("");
  return visible.length;
}

function renderPublicationLists() {
  const journalCount = renderJournalSection(
    "publications-journal-section",
    "publications-journal-list",
    PUBLICATIONS_DATA.journals
  );
  const conferenceCount = renderPubCardSection(
    "publications-conference-section",
    "publications-conference-list",
    PUBLICATIONS_DATA.conferences,
    "conference"
  );
  const patentCount = renderPubCardSection(
    "publications-patent-section",
    "publications-patent-list",
    PUBLICATIONS_DATA.patents,
    "patent"
  );
  document.getElementById("pub-filter-empty-msg").style.display =
    journalCount + conferenceCount + patentCount === 0 ? "" : "none";
}

function getAllPublicationYears() {
  const years = new Set();
  PUBLICATIONS_DATA.journals.forEach((j) => years.add(j.year));
  PUBLICATIONS_DATA.conferences.forEach((c) => years.add(c.year));
  PUBLICATIONS_DATA.patents.forEach((p) => years.add(p.year));
  return Array.from(years).sort((a, b) => b - a);
}

// 篩選列的 DOM 結構（年份標籤、checkbox、搜尋框、清除按鈕）只需要建立一次並綁好事件；
// 之後切換語言只要更新文字（見 renderPublicationsPage()），不需要重建、也不會清掉使用者選的篩選條件。
function setupFilterBar() {
  const yearChipsEl = document.getElementById("pub-filter-year-chips");
  yearChipsEl.innerHTML = getAllPublicationYears()
    .map((year) => `<button type="button" class="pub-filter-chip" data-year="${year}">${year}</button>`)
    .join("");
  yearChipsEl.querySelectorAll(".pub-filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const year = Number(chip.dataset.year);
      if (pubFilterState.years.has(year)) {
        pubFilterState.years.delete(year);
        chip.classList.remove("active");
      } else {
        pubFilterState.years.add(year);
        chip.classList.add("active");
      }
      renderPublicationLists();
    });
  });

  const typeCheckboxes = {
    journal: document.getElementById("pub-filter-type-journal"),
    conference: document.getElementById("pub-filter-type-conference"),
    patent: document.getElementById("pub-filter-type-patent"),
  };
  Object.keys(typeCheckboxes).forEach((typeKey) => {
    typeCheckboxes[typeKey].addEventListener("change", (e) => {
      pubFilterState.types[typeKey] = e.target.checked;
      renderPublicationLists();
    });
  });

  document.getElementById("pub-filter-author").addEventListener("input", (e) => {
    pubFilterState.authorQuery = e.target.value.trim().toLowerCase();
    renderPublicationLists();
  });

  document.getElementById("pub-filter-clear").addEventListener("click", () => {
    pubFilterState.years.clear();
    pubFilterState.types.journal = true;
    pubFilterState.types.conference = true;
    pubFilterState.types.patent = true;
    pubFilterState.authorQuery = "";
    yearChipsEl.querySelectorAll(".pub-filter-chip").forEach((chip) => chip.classList.remove("active"));
    Object.values(typeCheckboxes).forEach((checkbox) => (checkbox.checked = true));
    document.getElementById("pub-filter-author").value = "";
    renderPublicationLists();
  });
}

function renderPublicationsPage() {
  document.getElementById("publications-journal-title").textContent = t("publications_journal_title");
  document.getElementById("publications-conference-title").textContent = t("publications_conference_title");
  document.getElementById("publications-patent-title").textContent = t("publications_patent_title");

  document.getElementById("pub-filter-year-label").textContent = t("publications_filter_year_label");
  document.getElementById("pub-filter-type-label").textContent = t("publications_filter_type_label");
  document.getElementById("pub-filter-type-journal-label").textContent = t("publications_journal_title");
  document.getElementById("pub-filter-type-conference-label").textContent = t("publications_conference_title");
  document.getElementById("pub-filter-type-patent-label").textContent = t("publications_patent_title");
  document.getElementById("pub-filter-author").placeholder = t("publications_filter_author_placeholder");
  document.getElementById("pub-filter-clear").textContent = t("publications_filter_clear");
  document.getElementById("pub-filter-empty-msg").textContent = t("publications_filter_empty");

  renderPublicationLists();
}

setupFilterBar();
renderPublicationsPage();
document.addEventListener("langchange", renderPublicationsPage);
