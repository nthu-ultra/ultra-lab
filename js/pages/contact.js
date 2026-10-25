/* Contact 頁面渲染：左側聯絡資訊（Email／地址／分機電話，資料跟頁尾共用同一份
   js/data/contact.js 的 CONTACT_DATA），右側用 Google Maps 內嵌地圖（依 CONTACT_DATA.mapCoords
   的座標＋zoom 組成嵌入網址，不需要 Maps API key）。改用座標而不是地名查詢字串，是因為地名查詢
   會讓 Google 疊一張地點資訊卡蓋住畫面、置中也不準，座標查詢則會精準置中且沒有疊加卡片。 */

function renderContactPage() {
  document.getElementById("contact-title").textContent = t("nav_contact");

  document.getElementById("contact-email-label").textContent = t("footer_email_label");
  // email 若不含 @（例如刻意寫成 "xxx [at] xxx" 來避免被機器人爬到信箱），就不做成 mailto 連結，純文字顯示。
  document.getElementById("contact-email-value").innerHTML = CONTACT_DATA.email.includes("@")
    ? `<a href="mailto:${CONTACT_DATA.email}">${CONTACT_DATA.email}</a>`
    : CONTACT_DATA.email;

  document.getElementById("contact-address-label").textContent = t("footer_address_label");
  document.getElementById("contact-address-value").textContent = pick(CONTACT_DATA.address);

  document.getElementById("contact-phone-label").textContent = t("footer_phone_label");
  document.getElementById("contact-phone-list").innerHTML = CONTACT_DATA.phones
    .map((p) => `<p class="contact-value">${pick(p.label)}: ${p.number}</p>`)
    .join("");

  const { lat, lng, zoom } = CONTACT_DATA.mapCoords;
  document.getElementById("contact-map-iframe").src =
    `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

renderContactPage();
document.addEventListener("langchange", renderContactPage);
