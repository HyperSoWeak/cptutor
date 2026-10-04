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
          { text: "L2：陣列與序列統計", link: "/lessons/02-arrays-vectors-sequence-statistics" },
          { text: "L3：排序與資料整理", link: "/lessons/03-sorting-and-data-organization" },
          { text: "L4：字串、字元與函式", link: "/lessons/04-strings-chars-functions" },
          { text: "L5：時間複雜度、暴力解與預處理", link: "/lessons/05-time-complexity-bruteforce-preprocessing" },
          { text: "L6：遞迴入門與枚舉", link: "/lessons/06-recursion-enumeration" },
          { text: "L7：二分搜", link: "/lessons/07-binary-search" }
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
