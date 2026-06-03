# Lesson 02: 條件判斷

## 學習目標

- 會使用 `if` / `else if` / `else`。
- 會把題目條件轉成 case analysis。
- 會處理簡單邊界條件。

## 本堂會用到的 C++ 語法

```cpp
if (condition) {
    // ...
} else {
    // ...
}
```

## 競賽觀念

條件題先列出所有 case，再確認每個輸入只會落在其中一個 case。

## 示範題

### Product

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: AtCoder
- Link: https://atcoder.jp/contests/abs/tasks/abc086_a
- Difficulty: basic
- Topic: condition, parity
- 建議練習時機：示範題

</div>

#### 為什麼做這題

這題用很小的程式練習條件判斷與奇偶性。

#### 提示 1

如果兩個數都是 odd，乘積才會是 odd。

#### 提示 2

可以用 `% 2` 判斷奇偶。

#### 解題想法

讀入 `a`、`b`，如果 `a * b` 是奇數輸出 `Odd`，否則輸出 `Even`。

#### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b;
    cin >> a >> b;

    if ((a * b) % 2 == 1) {
        cout << "Odd\n";
    } else {
        cout << "Even\n";
    }

    return 0;
}
```

## 課堂練習

- basic：[AtCoder Beginners Selection - ABC086A Product](https://atcoder.jp/contests/abs/tasks/abc086_a)
- standard：[ZeroJudge a004. 文文的求婚](https://zerojudge.tw/ShowProblem?problemid=a004)
- challenge：[AtCoder ABC083A - Libra](https://atcoder.jp/contests/abc083/tasks/abc083_a)

## 常見錯誤

- 把 `=` 寫成條件判斷，應使用 `==`。
- case 沒有互斥，導致答案被覆蓋。
- 忘記處理等於的情況。

## 回家練習

- basic：[AtCoder Beginners Selection - ABC081A Placing Marbles](https://atcoder.jp/contests/abs/tasks/abc081_a)
- standard：[ZeroJudge a004. 文文的求婚](https://zerojudge.tw/ShowProblem?problemid=a004)
- challenge：[AtCoder ABC083A - Libra](https://atcoder.jp/contests/abc083/tasks/abc083_a)

## 進階練習

- [AtCoder ABC088A - Infinite Coins](https://atcoder.jp/contests/abc088/tasks/abc088_a)
