/* Research 頁面渲染：把 js/data/research.js 裡的全部研究主題畫成上下排列的長文清單
   （標題置中、圖片置中、文字段落兩端對齊），不用卡片呈現，參考系上原網站的研究頁排版。
   每個主題的內文：有 detail（陣列）就依序渲染成多個 <p>，沒有的話用 summary 頂著顯示一段。 */

function renderResearchPage() {
  document.getElementById("research-intro").textContent = t("research_intro");

  const list = document.getElementById("research-grid");
  list.innerHTML = RESEARCH_DATA.filter((item) => item.showOnResearchPage !== false)
    .map((item) => {
      const paragraphs = item.detail && item.detail.length ? item.detail : [item.summary];
      const paragraphsHtml = paragraphs.map((p) => `<p>${pick(p)}</p>`).join("");
      return `
        <article class="research-topic">
          <h2>${pick(item.title)}</h2>
          ${item.image ? `<img class="research-image" src="${item.image}" alt="">` : ""}
          ${paragraphsHtml}
        </article>
      `;
    })
    .join("");
}

renderResearchPage();
document.addEventListener("langchange", renderResearchPage);
