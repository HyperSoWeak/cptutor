# CP Tutor

這是一份演算法競賽入門講義，目標是讓只有少量 Python 經驗、未學過 C++ 的學生，能用 C++17 在 online judge 上自行解題。

教材採用 Markdown-first，由 VitePress 產生網站並部署到 GitHub Pages。

## 怎麼使用這份講義

- 從 [Lesson 0: C++ 開發環境與 Online Judge 基本流程](/lessons/00-local-setup-and-oj) 開始。
- 依序閱讀每堂講義。
- 每堂課完成示範題與課堂練習。
- 回家練習放在 `problemsets/`。
- 進度較快時，可以繼續做 `extras/` 的進階練習題。

## 課程節奏

每次課程 2 小時：

| Time | Activity |
| --- | --- |
| 0:00-0:15 | 本堂主題與必要 C++ 語法 |
| 0:15-0:35 | 一起拆解一題 |
| 0:35-1:15 | 學生自行實作 2-3 題 |
| 1:15-1:40 | 討論常見錯誤與 edge cases |
| 1:40-2:00 | challenge 題或個別進度 |

## Local workflow

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
