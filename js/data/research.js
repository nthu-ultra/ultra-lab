/* 研究主題清單。要新增/修改/刪除研究方向，直接編輯這個陣列即可，
   首頁與 research.html 都會自動讀取這份資料。
   image：淡淡的卡片背景圖路徑，圖片請放到 assets/img/research/ 底下並對應檔名；
   檔案不存在時卡片會自動顯示預設底色，不會報錯。
   showOnHome：是否要出現在首頁「研究方向」預覽卡片（最多顯示前 3 個 showOnHome 為 true 的項目）。
   showOnResearchPage：是否要出現在 research.html 完整列表。
   兩個標籤互相獨立，例如可以讓一個主題只出現在 research.html、暫時不放進首頁預覽。
   summary：首頁預覽卡片用的精簡版說明（一兩句話）。
   detail（選填）：research.html 長文頁用的完整介紹，格式為陣列，每段一個 {en, zh} 物件，
   例如 detail: [{ en: "...", zh: "..." }, { en: "...", zh: "..." }]，會依序渲染成多個 <p>。
   沒有填 detail 時，research.html 會自動改用 summary 頂著顯示。 */

const RESEARCH_DATA = [
  {
    image: "assets/img/research/pulse-compression.png",
    title: {
      en: "Ultrashort Pulse Compression & Measurement",
      zh: "超短脈衝壓縮與量測",
    },
    summary: {
      en: "We generate extremely short laser pulses by broadening the spectrum through nonlinear effects and compensating the phase across spectral components, developing techniques for spectral broadening, pulse compression, and novel ultrafast light sources.",
      zh: "透過非線性效應展寬光譜，並補償各頻譜成份間的相位差異，產生極短的雷射脈衝；同時發展光譜展寬、脈衝壓縮與新型超快光源等技術。",
    },
    detail: [
      { en: "Through nonlinear optical effects, the spectrum of a pulsed laser can be significantly broadened, enabling it to cover a wider range of frequencies. By carefully compensating the phase differences among the various spectral components (e.g., using techniques such as dispersion compensation or pulse compression), the temporal width of the laser pulse can be further shortened to the femtosecond or even sub-femtosecond regime. This combination of spectral broadening and precise dispersion management represents one of the key approaches for generating extremely short laser pulses. The Ultrafast Laser Technologies, Research and Applications Laboratory (ULTRA LAB) focuses on the development of techniques for generating and controlling ultrashort laser pulses. Our research includes nonlinear spectral broadening, pulse compression, and the design and realization of novel ultrafast light sources.", zh: "透過非線性光學效應（nonlinear optical effects），脈衝雷射的頻譜可以被有效展寬，使其涵蓋更寬廣的頻率範圍。再經由精確補償各頻率成分之間的相位差，例如利用色散補償元件或脈衝壓縮技術，便能將雷射脈衝的時間寬度進一步縮短至飛秒甚至次飛秒尺度。這種結合頻譜展寬與相位控制的技術，是產生極短雷射脈衝的關鍵方法之一。超快雷射技術與應用實驗室（ULTRA LAB）專注於開發極短脈衝雷射的產生與控制技術，研究內容涵蓋非線性頻譜展寬、脈衝壓縮以及新型超快光源的設計與實現。" }
    ],
    showOnHome: true,
    showOnResearchPage: true,
  },
  {
    image: "assets/img/research/mid-infrared.png",
    title: {
      en: "Mid-infrared Generation and Application",
      zh: "中紅外光產生與應用",
    },
    summary: {
      en: "Many molecular vibrational transitions occur in the mid-infrared range, making it ideal for highly selective molecular analysis. Combined with ultrashort pulses, we develop next-generation ultrafast MIR sources and apply them to molecular spectroscopy and precision semiconductor processing.",
      zh: "許多分子振動轉換發生在中紅外波段，因此非常適合用於高選擇性的分子分析。結合超短脈衝技術，我們開發次世代超快中紅外光源，並應用於分子光譜學與精密半導體製程。",
    },
    detail: [
      { en: "The mid-infrared (MIR) spectral region is often referred to as the molecular fingerprint region, as many molecular vibrational transitions occur within this wavelength range. As a result, MIR spectroscopy provides highly selective information about molecular structures and chemical compositions. This capability makes MIR spectroscopy a powerful tool for applications in chemical sensing, materials characterization, environmental monitoring, and biomedical diagnostics.", zh: "中紅外光（mid-infrared, MIR）光譜區域常被稱為「分子指紋區」（molecular fingerprint region），因為多數分子的振動躍遷都位於此波段，使得中紅外光能夠提供高度選擇性的化學與分子結構資訊。因此，中紅外光譜技術在化學分析、材料鑑定、環境監測以及生醫檢測等領域中具有極為重要的應用價值。" },
      { en: "When combined with ultrashort laser technology, MIR light enables a new class of ultrafast spectroscopic techniques. Ultrafast MIR spectroscopy allows researchers to directly observe molecular vibrations, energy transfer processes, and charge dynamics on femtosecond time scales, providing critical insight into fundamental light–matter interactions.", zh: "當中紅外光與超短脈衝雷射技術結合時，其應用範圍更進一步拓展至超快光譜研究。透過中紅外超快光譜量測，研究人員可以在飛秒時間尺度上直接觀測分子振動、能量轉移與電荷動態等過程，為理解光與物質交互作用提供重要工具。" },
      { en: "Beyond spectroscopy, ultrafast MIR laser pulses are also emerging as promising tools for precision laser processing in semiconductor materials. Because MIR wavelengths strongly couple to molecular vibrational modes, they enable selective bond excitation, reduced thermal damage, and the fabrication of novel micro- and nanoscale structures. These unique capabilities open new opportunities in advanced manufacturing and photonic technologies.", zh: "除了光譜學之外，中紅外超快雷射亦逐漸展現出在精密半導體材料加工上的潛力。由於中紅外光能有效耦合材料中的振動模式，中紅外雷射可用於選擇性鍵結激發、低熱影響加工，以及新型微奈米結構製作，為先進製造與光電技術帶來新的可能性。" },
      { en: "In ULTRA LAB, we will focus on the development of next-generation ultrafast MIR light sources and their applications. By utilizing nonlinear optical techniques to generate broadband and ultrashort MIR pulses, we aim to advance ultrafast MIR spectroscopy, molecular dynamics studies, and precision MIR laser processing. Through these efforts, we seek to expand the frontiers of MIR photonics for both fundamental science and emerging technological applications.", zh: "本實驗室致力於發展新一代中紅外超短脈衝光源與相關應用。我們的研究聚焦於利用非線性光學技術產生寬頻且極短的中紅外雷射脈衝，並探索其在超快中紅外光譜、分子動力學研究以及中紅外雷射精密加工等領域中的應用，期望藉此推動中紅外光子技術在基礎科學與工程領域中的發展。" }
    ],

    showOnHome: true,
    showOnResearchPage: true,
  },
  {
    image: "assets/img/research/time-resolved.png",
    title: {
      en: "Time-resolved Spectroscopy",
      zh: "時間解析光譜學",
    },
    summary: {
      en: "By combining ultrafast pulses with spectroscopic techniques, we observe ultrafast molecular dynamics and energy transfer processes on femtosecond timescales.",
      zh: "結合超快脈衝與光譜技術，我們在飛秒時間尺度上觀測分子的超快動態行為與能量轉移過程。",
    },
    showOnHome: true,
    showOnResearchPage: false,
  },
  {
    image: "assets/img/research/nonlinear-conversion.jpg",
    title: {
      en: "Nonlinear Optical Conversion",
      zh: "非線性光轉換",
    },
    summary: {
      en: "Using nonlinear crystals and waveguides, we convert laser wavelengths to spectral regions that are otherwise hard to access directly, enabling new light sources for spectroscopy and sensing applications.",
      zh: "利用非線性晶體與波導元件，將雷射波長轉換到原本難以直接取得的光譜範圍，為光譜學與感測應用開發新的光源。",
    },
    showOnHome: false,
    showOnResearchPage: false,
  },
  {
    image: "assets/img/research/optical-system.jpg",
    title: {
      en: "Optical System Design",
      zh: "光學系統設計",
    },
    summary: {
      en: "We design and build custom ultrafast optical systems, from laser sources to beam delivery and detection, tailored to the specific requirements of each experiment.",
      zh: "我們設計並建構客製化的超快光學系統，從雷射光源到光路傳遞與訊號偵測，依據各項實驗需求量身打造。",
    },
    showOnHome: false,
    showOnResearchPage: false,
  },
  {
    image: "assets/img/research/inspection.jpg",
    title: {
      en: "Non-destructive Optical Inspection",
      zh: "非破壞光學檢測",
    },
    summary: {
      en: "We develop optical inspection methods that characterize materials and devices without causing damage, useful for quality control in semiconductor and materials research.",
      zh: "開發不破壞材料與元件的光學檢測方法，可應用於半導體與材料研究中的品質檢測。",
    },
    showOnHome: false,
    showOnResearchPage: false,
  },
  {
    image: "assets/img/research/micro-processing.jpg",
    title: {
      en: "Laser Micro-processing",
      zh: "雷射微加工",
    },
    summary: {
      en: "Using precisely controlled ultrafast laser pulses, we explore micro-scale material processing techniques for advanced manufacturing applications.",
      zh: "利用精準控制的超快雷射脈衝，探索微尺度材料加工技術，應用於先進製造領域。",
    },
    showOnHome: false,
    showOnResearchPage: false,
  },
];
