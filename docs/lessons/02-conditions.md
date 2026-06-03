# Lesson 02: Conditions

## Goals

- 會使用 `if` / `else if` / `else`。
- 會把題目條件轉成 case analysis。
- 會處理簡單邊界條件。

## Required C++ Syntax

```cpp
if (condition) {
    // ...
} else {
    // ...
}
```

## Competitive Programming Idea

條件題先列出所有 case，再確認每個輸入只會落在其中一個 case。

## Guided Problem

### Product

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: AtCoder
- Link: https://atcoder.jp/contests/abs/tasks/abc086_a
- Difficulty: basic
- Topic: condition, parity
- Recommended timing: guided

</div>

#### Why this problem

這題用很小的程式練習條件判斷與奇偶性。

#### Hint 1

如果兩個數都是 odd，乘積才會是 odd。

#### Hint 2

可以用 `% 2` 判斷奇偶。

#### Solution idea

讀入 `a`、`b`，如果 `a * b` 是奇數輸出 `Odd`，否則輸出 `Even`。

#### Reference code

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

## In-class Practice

- basic：判斷奇偶或大小關係。
- standard：有 3 個以上 cases 的條件題。
- challenge：需要先推導條件再寫 code 的題。

## Common Mistakes

- 把 `=` 寫成條件判斷，應使用 `==`。
- case 沒有互斥，導致答案被覆蓋。
- 忘記處理等於的情況。

## Homework

- basic：AtCoder Beginners Selection - ABC081A Placing Marbles。
- standard：ZeroJudge 一題條件判斷中文題。
- challenge：Kattis - Which Kind of Triangle。

## Extra Problems

- 收集 3 題不同形式的 case analysis 題。
