/* 首頁「最新消息」清單。最新的事件放最上面（陣列第一筆）。
   date 直接用文字（例如 "2026.03"），不需要嚴格的日期格式。
   image（選填）：點開單篇消息要顯示的照片，放在 assets/img/news/ 底下，沒有就留空字串。
   detail（選填）：點開單篇消息要顯示的完整內容；沒填的話點開只會顯示 text 欄位。
   這裡先放草稿項目，請依實際狀況增刪修改。 */

const NEWS_DATA = [
  {
    date: { en: "2026.02", zh: "2026.02" },
    text: {
      en: "Joint Year-end party of ULTRA Lab and Ultrafast Photonics Lab @ Lakeshore Hotel, Hsinchu.",
      zh: "與超快光電實驗室聯合尾牙 @ 煙波大飯店。",
    },
    image: "assets/img/news/260210_group_lunch.jpg",
    detail: null,
  },
  {
    date: { en: "2025.11", zh: "2025.11" },
    text: {
      en: "Prof. Chen gave an invited talk at Annual Meeting of the Physical Society of Taiwan, 2026.",
      zh: "陳教授於物理年會受邀演講，主題為中紅外超快光源。",
    },
    image: "assets/img/news/260113_TPS_invited_talk.jpg",
    detail: null,
  },
  {
    date: { en: "2025.09", zh: "2025.09" },
    text: {
      en: "Pharos laser from Light Conversion is installed in ULTRA Lab!",
      zh: "Pharos雷射系統已安裝於 ULTRA Lab!",
    },
    image: "assets/img/news/251007_Laser_Installation.jpg",
    detail: null,
  },
  {
    date: { en: "2025.02", zh: "2025.02" },
    text: {
      en: "Optical table is installed in ULTRA Lab.",
      zh: "光學桌安裝完成。",
    },
    image: "assets/img/news/250227_optical_table_installation.jpg",
    detail: null,
  },
  {
    date: { en: "2024.09", zh: "2024.09" },
    text: {
      en: "ULTRA Lab officially established at NTHU Department of Electrical Engineering.",
      zh: "ULTRA Lab 正式於清華大學電機系成立。",
    },
    image: "assets/img/news/240930_lab_established.jpg",
    detail: null,
  },
];
