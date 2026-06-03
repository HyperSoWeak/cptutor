# CP Tutor

這是一份演算法競賽入門講義，目標是讓只有少量 Python 經驗、未學過 C++ 的學生，能用 C++17 在 online judge 上自行解題。

教材採用 Markdown-first，由 VitePress 產生網站並部署到 GitHub Pages。

## 使用方式

- 老師依序使用 `lessons/` 上課。
- 學生每堂課完成 guided problem 與 in-class practice。
- 回家作業放在 `problemsets/`。
- 進度快的學生使用 `extras/` 的 reserve problems。

## 課程節奏

每次課程 2 小時：

| Time | Activity |
| --- | --- |
| 0:00-0:15 | 本堂主題與必要 C++ 語法 |
| 0:15-0:35 | 老師帶解一題 |
| 0:35-1:15 | 學生自行實作 2-3 題 |
| 1:15-1:40 | 討論常見錯誤與 edge cases |
| 1:40-2:00 | challenge 題或個別進度 |

## Local workflow

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
