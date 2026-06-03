import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CP Tutor",
  description: "演算法競賽入門講義",
  base: "/cptutor/",
  cleanUrls: true,
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
          { text: "00. 開發環境與 OJ 流程", link: "/lessons/00-local-setup-and-oj" }
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
