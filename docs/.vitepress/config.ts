import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CP Tutor",
  description: "演算法競賽入門講義",
  base: "/cptutor/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "課程講義", link: "/lessons/00-local-setup-and-oj" },
      { text: "練習題", link: "/problemsets/week-01" }
    ],
    sidebar: [
      {
        text: "開始使用",
        items: [
          { text: "首頁", link: "/" }
        ]
      },
      {
        text: "課程講義",
        items: [
          { text: "00. 開發環境與 OJ 流程", link: "/lessons/00-local-setup-and-oj" },
          { text: "01. I/O + arithmetic", link: "/lessons/01-io-and-arithmetic" },
          { text: "02. 條件判斷", link: "/lessons/02-conditions" }
        ]
      },
      {
        text: "練習題",
        items: [
          { text: "第 1 週", link: "/problemsets/week-01" },
          { text: "進階練習", link: "/extras/extra-practice" }
        ]
      }
    ],
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3]
    }
  }
});
