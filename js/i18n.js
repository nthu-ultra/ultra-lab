/* UI 介面文字（導覽列、頁尾、按鈕等固定文字）的中英對照表。
   各頁面內容資料（研究主題、成員、發表清單...）放在 js/data/ 底下，不在這裡。 */

const UI_TEXT = {
  nav_research: { en: "Research", zh: "研究方向" },
  nav_team: { en: "Team", zh: "成員" },
  nav_publications: { en: "Publications", zh: "發表著作" },
  nav_contact: { en: "Contact Us", zh: "聯絡我們" },

  brand_name: { en: "ULTRA Lab", zh: "ULTRA Lab" },

  footer_address_label: { en: "Address", zh: "地址" },
  footer_email_label: { en: "Email", zh: "電子信箱" },
  footer_phone_label: { en: "Phone", zh: "電話" },
  footer_rights: { en: "All rights reserved.", zh: "版權所有。" },
  footer_member_portal: { en: "Member Portal", zh: "成員入口" },

  lang_toggle_label: { en: "中文", zh: "EN" },

  hero_cta: { en: "Explore Our Research", zh: "了解我們的研究" },

  research_section_title: { en: "Research Focus", zh: "研究方向" },
  research_intro: {
    en: "Ultrafast lasers generally refer to laser pulses with pulse durations shorter than the nanosecond time scale, typically in the picosecond or even femtosecond regimes. Because the laser energy is compressed and delivered within an extremely short time window, ultrafast lasers enable the excitation and probing of physical processes on ultrafast time scales. As a result, they are particularly well suited for investigating the dynamics of electrons, atoms, and molecules, including processes such as energy transfer, charge transfer, and structural rearrangements. In addition, the extremely high instantaneous electric field associated with ultrafast laser pulses is sufficient to drive or even ionize electrons in materials, thereby inducing a variety of nonlinear optical effects.",
    zh: "超快雷射（ultrafast laser）通常指脈衝寬度（pulse duration）短於奈秒（nanosecond）尺度的雷射脈衝，常見的時間範圍包括皮秒（picosecond）甚至飛秒（femtosecond）等級。由於雷射能量被壓縮並集中在極短的時間內，超快雷射能夠在極短的時間尺度上激發並探測物質中的動態過程，因此特別適合用來觀測電子、原子與分子等系統中的超快動態行為，例如能量轉移、電荷轉移以及結構重排等現象。此外，超快雷射所產生的瞬時電場強度非常高，足以驅動甚至游離材料中的電子，進而誘發各種非線性光學效應。",
  },

  news_section_title: { en: "News & Events", zh: "最新消息" },
  news_show_more: { en: "Show more", zh: "顯示更多" },
  news_show_less: { en: "Show less", zh: "顯示較少" },

  funding_section_title: { en: "Funding Source", zh: "經費補助" },

  team_pi_title: { en: "Principal Investigator", zh: "主持人" },
  team_members_title: { en: "Current Members", zh: "現有成員" },
  team_visiting_title: { en: "Visiting Scholars", zh: "訪問學者" },
  team_alumni_title: { en: "Alumni", zh: "畢業成員" },
  team_orcid_label: { en: "ORCID", zh: "ORCID" },
  team_dissertation_label: { en: "Ph.D. Dissertation", zh: "博士論文" },
  team_website_label: { en: "Personal Website", zh: "個人網頁" },
  team_scholar_label: { en: "Google Scholar", zh: "Google Scholar" },
  team_linkedin_label: { en: "LinkedIn", zh: "LinkedIn" },
  team_link_default_label: { en: "Link", zh: "連結" },

  publications_journal_title: { en: "Journal Articles", zh: "期刊論文" },
  publications_conference_title: { en: "Conference Papers", zh: "研討會論文" },
  publications_patent_title: { en: "Patents", zh: "專利" },

  publications_filter_year_label: { en: "Year:", zh: "年份：" },
  publications_filter_type_label: { en: "Type:", zh: "類型：" },
  publications_filter_author_placeholder: { en: "Search by author name…", zh: "搜尋作者姓名…" },
  publications_filter_clear: { en: "Clear Filters", zh: "清除篩選" },
  publications_filter_empty: { en: "No publications match the current filters.", zh: "沒有符合篩選條件的發表著作。" },
};

const I18N_STORAGE_KEY = "ultraLab_lang";

function getLang() {
  return localStorage.getItem(I18N_STORAGE_KEY) || "en";
}

function setLang(lang) {
  localStorage.setItem(I18N_STORAGE_KEY, lang);
}

function toggleLang() {
  setLang(getLang() === "en" ? "zh" : "en");
}

// 取得 UI 固定文字。key 對應 UI_TEXT 裡的項目。
function t(key) {
  const entry = UI_TEXT[key];
  if (!entry) return key;
  return entry[getLang()] || entry.en;
}

// 取得資料物件裡雙語欄位的文字，例如 pick(item.title) -> "Mid-infrared Generation" 或對應中文。
function pick(field) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[getLang()] || field.en || "";
}
