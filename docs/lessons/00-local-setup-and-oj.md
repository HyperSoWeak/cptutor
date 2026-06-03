# Lesson 00: Local setup + OJ submit

## 學習目標

- 會在 local terminal 編譯並執行單一 `.cpp` 檔。
- 會用 input file 測試程式。
- 會把 C++17 程式提交到 online judge。

## 本堂會用到的 C++ 語法

- `#include <bits/stdc++.h>`
- `using namespace std;`
- `int main()`
- `cin`
- `cout`

## 競賽觀念

OJ 通常只看標準輸入與標準輸出。程式不需要互動式提示文字。

## 程式模板

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    return 0;
}
```

## 示範題

### A + B

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: local / any A+B problem
- Difficulty: basic
- Topic: input, output, arithmetic
- 建議練習時機：示範題

</div>

#### 為什麼做這題

第一題只確認 compile、run、stdin/stdout、submit 流程。

#### 提示 1

用 `cin >> a >> b` 讀入兩個整數。

#### 提示 2

輸出時不要印提示文字，只印答案。

#### 解題想法

讀入兩個整數，輸出它們的和。

#### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b;
    cin >> a >> b;
    cout << a + b << '\n';

    return 0;
}
```

## 課堂練習

- 找一題 OJ 上的 A+B 題提交。
- 建立 `1.in`，練習 `./a.out < 1.in`。

## 常見錯誤

- 印出 `answer is ...` 之類的提示文字，導致 Wrong Answer。
- 忘記從 terminal 所在資料夾執行。
- Windows 沒有進入 WSL2 Ubuntu terminal。

## 回家練習

- 完成至少 1 題 basic input/output 題。
- 記錄一次 Wrong Answer 或 Compile Error 的原因。

## 進階練習

- 嘗試一題 AtCoder Beginners Selection 的 PracticeA。
