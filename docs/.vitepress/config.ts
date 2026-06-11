import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CP Tutor",
  description: "演算法競賽入門講義",
  base: "/cptutor/",
  cleanUrls: true,
  markdown: {
    math: true,
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha"
    }
  },
  themeConfig: {
    nav: [
      { text: "課程講義", link: "/lessons/00-local-setup-and-oj" }
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
          { text: "L0：開發環境與 OJ 流程", link: "/lessons/00-local-setup-and-oj" },
          { text: "L1：整數、條件判斷與迴圈", link: "/lessons/01-integers-conditions-loops" },
          { text: "L2：陣列與序列統計", link: "/lessons/02-arrays-vectors-sequence-statistics" }
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
