# 教材規範

本文件記錄可重複套用的教材規範。

## 受眾與語言

- 受眾：有少量 Python 經驗，但幾乎可視為初學者；未學過 C++。
- 教材語言：繁體中文。
- 程式碼、指令、技術名詞可保留 English，例如 `g++`、`cin`、`online judge`。
- 學生網站只寫給學生看，不使用給授課者看的語氣或內部決策內容。
- 文字語氣採正式講義式，避免過度口語或過度友善。

## 網站與部署

- 技術：VitePress。
- 部署：GitHub Pages。
- Package manager：pnpm。
- GitHub Pages base path 目前依 repo name 使用 `/cptutor/`。
- 不引入額外前端框架。

## 課程設計

- 新增 lesson 內容前，必須先與使用者討論高層次課程方向，確認後才開始撰寫。
- Lesson 是一次可完整學習的課程單元，不是單一主題百科。
- 每個 lesson 以一組競賽題型或解題流程為核心，帶入必要 C++ 語法。
- Lesson 內容應能順著閱讀與講解，避免教案表格式 section。
- 練習題放在 lesson 內，不做獨立 `problemsets/` 目錄。
- 每堂課應包含較充足的課堂練習與回家作業，讓學生有足夠題量熟悉本課核心觀念。
- 課堂練習與回家作業都應包含多題，避免每類只放一題。
- 課堂練習建議約 3 題，比例大致為 1 題 basic、1 題 standard、1 題 challenge。
- 回家練習題數原則上應多於課堂練習，建議約 6 題，比例大致為 2 題 basic、3 題 standard、1 題 challenge。
- 題數與比例可依課程難度微調，但應保留 basic、standard、challenge 的難度分層。
- 練習題應以本課或前面已教過的技巧為主，不應依賴尚未正式教學的核心主題。
- 題目難度分層：
  - basic：建立成就感。
  - standard：練習本課核心觀念。
  - challenge：給進度較快的人。

## Lesson 格式

頁面標題使用：

```text
Lesson N：課程名稱
```

sidebar 顯示使用短格式：

```text
LN：課程名稱
```

例如 `L0：開發環境與 OJ 流程`、`L1：整數、條件判斷與迴圈`。

不要使用 `Lesson 00` 或 `00.` 作為顯示文字；檔名可以保留排序用數字，例如 `00-local-setup-and-oj.md`。

建議 lesson 結構：

```text
# Lesson N：課程名稱

## 本課目標
## 主題背景或工作流程
## 必要語法與觀念
## 示範題
## 練習
## 常見錯誤
```

## 題目規範

- 所有正式列入教材的題目都必須附上 online judge link。
- 挑選新 lesson 題目時，中文題目比例應約為 30%–50%，優先使用 ZeroJudge、TIOJ 或洛谷等中文題源。
- 選題完成後，必須逐題檢查所需核心技巧是否已在本課或前面課程教過；若題目主要依賴尚未正式教學的主題，應更換或延後。
- 題目應標示 `basic`、`standard` 或 `challenge`。
- 題目名稱直接使用 Markdown link，不另外列裸網址。
- 題目 metadata 只保留 `Difficulty` 與 `Topic`。
- `Difficulty` 使用 badge，例如 `<span class="difficulty basic">basic</span>`。
- 若標題已標示 `示範題`、`課堂練習`、`回家練習` 或 `進階練習`，不要再於 metadata 重複列出建議時機。
- 解題內容採「題目 + 分層提示 + 解題想法 + 參考程式碼」。
- 題目格式：

```text
## 示範題：[Problem Name](https://example.com/problem)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: topic names

### 題目重點
### 提示 1
### 提示 2
### 解題想法
### 參考程式碼
```

## 數學標記

- 教材中的數學式使用 LaTeX 語法，例如 `$\pm 2.1 \times 10^9$`、`$A \times B$`。
- 行內公式用 `$...$`，獨立公式用 `$$...$$`。
- 純文字說明中出現的數字與變數若有數學意義，應使用 LaTeX。

## OJ 題源

### 入門期

- ZeroJudge：中文題敘，適合語法、條件判斷、迴圈、陣列與簡單模擬
- AtCoder Beginners Selection（ABS）：適合熟悉基本輸入輸出與簡單思考題
- AtCoder ABC A/B 題：短題敘、難度穩定，適合入門練習
- CSES Introductory Problems：挑選簡單題使用，不建議整包照順序刷

### 基礎建立期

- CSES：中期主線，演算法分類完整，適合主題式訓練
- AtCoder ABC C/D 題：練習基礎演算法、實作能力與比賽感
- Codeforces 800–1200：作為補充練習，不建議當主線
- Kattis：補充題源，適合練英文題敘與雜題

### 中文補充

- TIOJ：台灣競賽題來源，適合中後期練習
- ZeroJudge：APCS、中文題敘與特定主題補充
- 洛谷：題單完整，適合作為中文演算法補充；P 題難度標記不穩定，選題時需自行確認

### 不建議前期作為主線

- Codeforces：題目混雜、trick 較多，門檻偏高
- LeetCode：面試導向，不是競賽主線
- HackerRank：偏語法與面試訓練，不太適合作為競程主線
