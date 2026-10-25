/* 成員資料。pi 是實驗室主持人，成員依類別拆成三個陣列：
   currentMembers（現有成員）、visitingScholars（訪問學者）、alumni（畢業成員）。
   team.html 會依序讀取這三個陣列，陣列是空的（[]）時該分類整個區塊會自動隱藏。

   photo：照片路徑，請放到 assets/img/team/ 底下並對應檔名；檔案不存在時會自動隱藏圖片，不會顯示破圖。
   role（選填）：職稱或學年（例如博士生、碩士生），留空字串就不會顯示。
   email（選填）：留空字串就不會顯示。
   graduateSchool / graduateYear（選填）：畢業學校與畢業年份，兩個都有值才會顯示那一行；
   現有成員通常留空，畢業成員（alumni）可以填上。

   pi.dissertation（選填）：博士論文題目，留空（{en:"",zh:""}）就不會顯示那一行。
   pi.links（選填）：顯示在主持人卡片右上角的連結圖示，陣列，每個 { type, url } 物件對應一個圖示。
   type 目前內建圖示有 "website"（個人網頁）、"scholar"（Google Scholar）、"linkedin"（LinkedIn），
   其他沒有對應圖示的 type 會顯示通用連結圖示，要新增更多連結依樣加一個物件即可。 */

const TEAM_DATA = {
  pi: {
    photo: "assets/img/team/bo-han-chen.jpg",
    name: { en: "Bo-Han Chen", zh: "陳柏翰" },
    // titles 是陣列，主持人若同時有多個職稱，依序新增 { en: "...", zh: "..." } 物件即可，
    // 例如同時掛名某中心主任，就再加一個 { en: "Director of ...", zh: "...主任" }。
    titles: [
      { en: "Assistant Professor", zh: "助理教授" },
      { en: "Visiting Scientist, RIKEN", zh: "日本理化學研究所 訪問科學家" }
    ],
    email: "bohan.chen [at] ee.nthu.edu.tw",
    education: {
      en: "Dr. rer. nat., Ludwig Maximilian University of Munich (LMU), Germany, 2019",
      zh: "德國慕尼黑大學（LMU）博士，2019 年",
    },
    orcid: "0000-0002-3806-8962",
    dissertation: { en: "Single-cycle Mid-infrared Pulse Generation via Nonlinear Optics", zh: "Single-cycle Mid-infrared Pulse Generation via Nonlinear Optics" },
    links: [
      { type: "website", url: "https://bchen-tw.github.io/" },
      { type: "scholar", url: "https://scholar.google.com.tw/citations?hl=zh-TW&user=MStXw30AAAAJ" },
    ],
  },

  currentMembers: [
    {
      photo: "assets/img/team/yen-hung-chen.jpg",
      name: { en: "Yen-Hung Chen", zh: "陳彥宏" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "hubert102267 [at] gmail.com",
      graduateSchool: { en: "B.S. @ Department of Physics, National Tsing-Hua University, Taiwan", zh: "國立清華大學物理系學士" },
      graduateYear: "2023",
    },
    {
      photo: "assets/img/team/tian-tsz-hsieh.jpg",
      name: { en: "Tian-Tsz Hsieh", zh: "謝天慈" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "tiantsz114 [at] gapp.nthu.edu.tw",
      graduateSchool: { en: "B.S. @ College of Science and Technology, National Chi Nan University, Taiwan", zh: "國立暨南國際大學科技學院學士班" },
      graduateYear: "2025",
    },
    {
      photo: "assets/img/team/pai-sheng-huang.jpg",
      name: { en: "Pai-Sheng Huang", zh: "黃栢聖" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "benson04056 [at] gmail.com",
      graduateSchool: { en: "B.S. @ Department of Electrical and Computer Engineering, Tamkang University, Taiwan", zh: "淡江大學電機工程學系" },
      graduateYear: "2025",
    },
    {
      photo: "assets/img/team/wei-hong-wang.jpeg",
      name: { en: "Wei-Hong Wang", zh: "王崴弘" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "weihong930227 [at] gmail.com",
      graduateSchool: { en: "B.S. @ Department of Electrical Engineering, National Changhua University of Education,Taiwan", zh: "彰化師範大學電機工程學系" },
      graduateYear: "2026",
    },
    {
      photo: "assets/img/team/cheng-lin-kuo.jpg",
      name: { en: "Cheng-Lin Kuo", zh: "郭承霖" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "jerryjimmy34 [at] gmail.com",
      graduateSchool: { en: "B.S. @ Department of Physics, National Changhua University of Education, Taiwan", zh: "彰化師範大學物理系" },
      graduateYear: "2026",
    },
    {
      photo: "assets/img/team/cheng-yu-wu.jpg",
      name: { en: "Cheng-Yu Wu", zh: "吳正宇" },
      role: { en: "Master Student", zh: "碩士生" },
      email: "99054toronto [at] gmail.com",
      graduateSchool: { en: "B.S. @Department of Electronic Engineering, National Changhua University of Education, Taiwan", zh: "彰化師範大學電子工程學系" },
      graduateYear: "2026",
    },
  ],

  visitingScholars: [
    // 訪問學者目前沒有資料，格式同 currentMembers，之後有人再依樣新增物件即可。
  ],

  alumni: [
    // 畢業成員目前沒有資料，格式同 currentMembers，建議連同 graduateSchool / graduateYear 一起填上。
  ],
};
