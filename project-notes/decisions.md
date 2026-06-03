# 決策紀錄

本頁記錄已確認的教材決策，讓課程設計可以重現。這份文件是專案內部紀錄，不放在學生網站導覽中。

## 目標受眾

- 教材用途：演算法競賽教學講義。
- 目標受眾：有一點 Python 經驗，但幾乎可視為初學者；未學過 C++。
- 語言：教材使用繁體中文，技術名詞與程式碼保留 English。
- 教學型態：可能一對多，每個人進度不同。
- 課程長度：無限次。
- 每次時間：2 小時。

## 網站

- 教材呈現：VitePress static site。
- 內容來源：Markdown-first。
- 部署目標：GitHub Pages。
- GitHub Pages base path：目前假設 repo name 是 `cptutor`，所以 VitePress `base` 設為 `/cptutor/`。
- 不使用 pure Vite 作為第一版，因為目前需求是講義、章節導覽、題單與 code block，不是 app-like interactive features。
- 第一版採 Approach A：VitePress 教材站 + Markdown 題單。
- 學生網站不包含給老師看的語氣或內部決策頁。

## 課程模式

- 每堂課用一個競賽主題帶 C++ 語法。
- 每堂課都要搭配課堂題目與回家練習題。
- 題目安排要讓學生有成就感，前期避免太多 trick 題。
- 題目難度策略：正常競賽入門。
- 每堂題目分層：
  - basic：簡單、建立成就感。
  - standard：需要思考本堂核心觀念。
  - challenge：給進度快的人。
- 解題內容：題目 + 分層提示 + 參考解法。

## C++ 與 local setup

- C++ 標準：C++17。
- C++ 教法：一開始就使用競賽常見模板。
- 主線環境：macOS / Linux-like terminal workflow。
- Windows 支援方式：用 WSL2 取得 Linux-like terminal，所以後續共用同一套指令。
- 編譯與執行指令：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```

## OJ 題源

- 主力：
  - ZeroJudge：中文題、入門題、台灣學生友善。
  - AtCoder Beginners Selection / ABC A-B：入門競賽題品質穩。
  - Kattis：英文簡題、stdin/stdout 訓練好。
- 中後期：
  - CSES：演算法主題完整。
  - TIOJ / Sprout OJ：中文競賽題補充。
  - Codeforces 800-1000：補充與混合練習，不放太前期主線。

## 課程格式

```text
# Lesson N: Topic

## Goals
## Required C++ Syntax
## Competitive Programming Idea
## Template
## 示範題
## In-class Practice
## Common Mistakes
## Homework
## Extra Problems
```

## 題目格式

```text
## Problem Name

- OJ:
- Link:
- Difficulty: basic / standard / challenge
- Topic:
- Recommended timing: 示範題 / in-class / homework / extra

### Why this problem
### Hint 1
### Hint 2
### Solution idea
### Reference code
```
