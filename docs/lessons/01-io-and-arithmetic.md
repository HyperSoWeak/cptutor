# Lesson 01: I/O + arithmetic

## 學習目標

- 熟悉 `cin` / `cout`。
- 會做整數四則運算。
- 理解整數除法與取餘數。

## 本堂會用到的 C++ 語法

```cpp
int x;
long long y;
cin >> x;
cout << x << '\n';
```

## 競賽觀念

題目通常會把輸入格式寫得很精確。先照格式讀資料，再處理答案。

## 示範題

### PracticeA

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: AtCoder
- Link: https://atcoder.jp/contests/abs/tasks/practice_1
- Difficulty: basic
- Topic: input, output, arithmetic, string
- 建議練習時機：示範題

</div>

#### 為什麼做這題

這題同時練習讀整數、讀字串、做加法、輸出混合結果。

#### 提示 1

題目有三行輸入，但可以照順序用 `cin` 讀。

#### 提示 2

字串用 `string s;`。

#### 解題想法

讀入 `a`、`b`、`c`、`s`，輸出 `a + b + c` 和 `s`。

#### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b, c;
    string s;
    cin >> a >> b >> c >> s;
    cout << a + b + c << ' ' << s << '\n';

    return 0;
}
```

## 課堂練習

- basic：一題 A+B 或四則運算題。
- standard：一題需要整數除法或取餘數的題。
- challenge：一題需要讀多個數字並組合公式的題。

## 常見錯誤

- 把整數除法當成小數除法。
- 忘記每個答案的輸出格式。
- 使用過小的型別導致 overflow。

## 回家練習

- basic：AtCoder Beginners Selection - ABC086A Product。
- standard：Kattis - Tarifa。
- challenge：Kattis - Planina。

## 進階練習

- 從 ZeroJudge 挑一題只需要輸入、輸出、四則運算的中文題。
