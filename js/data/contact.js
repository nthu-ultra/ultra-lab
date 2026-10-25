/* 聯絡資訊。修改這裡的值即可同步更新聯絡頁與頁尾。 */

const CONTACT_DATA = {
  email: "bohan.chen [at] ee.nthu.edu.tw",
  address: {
    en: "R806, EECS Bldg. (C.L. Liu Building), No. 101, Sec. 2, Kuang-Fu Rd., East Dist., Hsinchu City 300, Taiwan",
    zh: "300 新竹市東區光復路二段101號 電機館（劉炯朗館）806室",
  },
  phones: [
    {
      label: { en: "Lab (C.L. Liu Building, Rm. 806)", zh: "實驗室（劉炯朗館 806室）" },
      number: "+886-3-5715131 #34059",
    },
    {
      label: { en: "Office (Delta Building, Rm. 862)", zh: "辦公室（台達館 862室）" },
      number: "+886-3-5715131 #62434",
    },
  ],
  mapQuery: "EECS Building National Tsing Hua University",
  // 地圖嵌入用座標（劉炯朗館，反查自上面的 mapQuery）。直接用座標＋zoom 嵌入才能讓圖釘精準置中；
  // 若用地名查詢字串嵌入，Google 會疊一張地點資訊卡蓋住畫面，置中位置也不準。
  // 如果之後地址變了，要重新反查新地址的座標（在瀏覽器開 Google 地圖搜尋新地址，網址列的
  // @緯度,經度,zoom 那一段就是新的 lat/lng/zoom）。
  mapCoords: { lat: 24.795434, lng: 120.9917006, zoom: 17 },
};
