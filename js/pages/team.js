/* Team 頁面渲染：主持人區塊（照片＋姓名＋職稱清單＋學歷＋ORCID＋Email）
   與三類成員卡片清單（現有成員／訪問學者／畢業成員）。
   三個分類各自對應一個 <section>，陣列是空的時候該整個 section 會被隱藏。 */

// 主持人卡片右上角的連結圖示。新增連結 type 時，這裡補一個 SVG，
// 沒有對應 SVG 的 type 會自動用 default 的通用連結圖示。
const TEAM_LINK_ICONS = {
  website: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z"/></svg>`,
  scholar: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5 12.2V17c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.8l-7 3.8-7-3.8z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.9 8.75 22 11.2 22 14.4V21h-4v-6c0-1.4-.03-3.2-2-3.2-2 0-2.3 1.5-2.3 3.1V21h-4V9z"/></svg>`,
  default: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14 20 4M14 4h6v6M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>`,
};

const TEAM_LINK_LABEL_KEYS = {
  website: "team_website_label",
  scholar: "team_scholar_label",
  linkedin: "team_linkedin_label",
};

function teamLinksHtml(links) {
  if (!links || !links.length) return "";
  const itemsHtml = links
    .map((link) => {
      const icon = TEAM_LINK_ICONS[link.type] || TEAM_LINK_ICONS.default;
      const label = t(TEAM_LINK_LABEL_KEYS[link.type] || "team_link_default_label");
      return `<a class="team-pi-link" href="${link.url}" target="_blank" rel="noopener" title="${label}" aria-label="${label}">${icon}</a>`;
    })
    .join("");
  return `<div class="team-pi-links">${itemsHtml}</div>`;
}

function memberCardHtml(member) {
  const graduateLine =
    pick(member.graduateSchool) && member.graduateYear
      ? `<p class="team-meta">${pick(member.graduateSchool)}（${member.graduateYear}）</p>`
      : "";
  // email 若不含 @（例如刻意寫成 "xxx [at] xxx" 來避免被機器人爬到信箱），就不做成 mailto 連結，純文字顯示。
  const emailLine = member.email
    ? `<p class="team-meta">${
        member.email.includes("@") ? `<a href="mailto:${member.email}">${member.email}</a>` : member.email
      }</p>`
    : "";

  return `
    <div class="team-member">
      <div class="team-member-photo-wrap">
        <img class="team-member-photo" src="${member.photo}" alt="${pick(member.name)}" onerror="this.style.display='none'">
      </div>
      <div class="team-member-info">
        <h3>${pick(member.name)}</h3>
        ${pick(member.role) ? `<p class="team-role">${pick(member.role)}</p>` : ""}
        <div class="team-extra">
          ${emailLine}
          ${graduateLine}
        </div>
      </div>
    </div>
  `;
}

function renderMemberSection(sectionId, gridId, members) {
  const section = document.getElementById(sectionId);
  const grid = document.getElementById(gridId);
  if (!members.length) {
    section.style.display = "none";
    return;
  }
  section.style.display = "";
  grid.innerHTML = members.map(memberCardHtml).join("");
}

function renderTeamPage() {
  document.getElementById("team-pi-title").textContent = t("team_pi_title");
  document.getElementById("team-members-title").textContent = t("team_members_title");
  document.getElementById("team-visiting-title").textContent = t("team_visiting_title");
  document.getElementById("team-alumni-title").textContent = t("team_alumni_title");

  const pi = TEAM_DATA.pi;
  const titlesHtml = pi.titles.map((title) => `<p class="team-role">${pick(title)}</p>`).join("");
  // email 若不含 @（例如刻意寫成 "xxx [at] xxx" 來避免被機器人爬到信箱），就不做成 mailto 連結，純文字顯示。
  const emailHtml = pi.email.includes("@")
    ? `<a href="mailto:${pi.email}">${pi.email}</a>`
    : pi.email;
  const dissertationHtml = pick(pi.dissertation)
    ? `<p>${t("team_dissertation_label")}: ${pick(pi.dissertation)}</p>`
    : "";

  document.getElementById("team-pi").innerHTML = `
    ${teamLinksHtml(pi.links)}
    <div class="team-pi-photo-wrap">
      <img class="team-pi-photo" src="${pi.photo}" alt="${pick(pi.name)}" onerror="this.style.display='none'">
    </div>
    <div class="team-pi-info">
      <h3>${pick(pi.name)}</h3>
      ${titlesHtml}
      <div class="team-extra">
        <p>${pick(pi.education)}</p>
        ${dissertationHtml}
        <p><a href="https://orcid.org/${pi.orcid}" target="_blank" rel="noopener">${t("team_orcid_label")}: ${pi.orcid}</a></p>
        <p>${emailHtml}</p>
      </div>
    </div>
  `;

  renderMemberSection("team-members-section", "team-members-grid", TEAM_DATA.currentMembers);
  renderMemberSection("team-visiting-section", "team-visiting-grid", TEAM_DATA.visitingScholars);
  renderMemberSection("team-alumni-section", "team-alumni-grid", TEAM_DATA.alumni);
}

renderTeamPage();
document.addEventListener("langchange", renderTeamPage);
