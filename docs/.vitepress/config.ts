import { defineConfig } from "vitepress";

export default defineConfig({
  title: "CP Tutor",
  description: "演算法競賽入門講義",
  base: "/cptutor/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Setup", link: "/setup/" },
      { text: "Lessons", link: "/lessons/00-local-setup-and-oj" },
      { text: "Problemsets", link: "/problemsets/week-01" },
      { text: "Decisions", link: "/decisions" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Home", link: "/" },
          { text: "Decisions", link: "/decisions" }
        ]
      },
      {
        text: "Setup",
        items: [
          { text: "Overview", link: "/setup/" },
          { text: "macOS", link: "/setup/macos" },
          { text: "Linux", link: "/setup/linux" },
          { text: "Windows WSL2", link: "/setup/windows-wsl2" }
        ]
      },
      {
        text: "Lessons",
        items: [
          { text: "00. Local setup + OJ", link: "/lessons/00-local-setup-and-oj" },
          { text: "01. I/O + arithmetic", link: "/lessons/01-io-and-arithmetic" },
          { text: "02. Conditions", link: "/lessons/02-conditions" }
        ]
      },
      {
        text: "Problemsets",
        items: [
          { text: "Week 01", link: "/problemsets/week-01" },
          { text: "Reserve problems", link: "/extras/reserve-problems" }
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
