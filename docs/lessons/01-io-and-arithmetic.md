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

- basic：[AtCoder Beginners Selection - ABC086A Product](https://atcoder.jp/contests/abs/tasks/abc086_a)
- standard：[Kattis - Tarifa](https://open.kattis.com/problems/tarifa)
- challenge：[Kattis - Planina](https://open.kattis.com/problems/planina)

## 常見錯誤

- 把整數除法當成小數除法。
- 忘記每個答案的輸出格式。
- 使用過小的型別導致 overflow。

## 回家練習

- basic：[AtCoder Beginners Selection - ABC081A Placing Marbles](https://atcoder.jp/contests/abs/tasks/abc081_a)
- standard：[ZeroJudge a001. 哈囉](https://zerojudge.tw/ShowProblem?problemid=a001)
- challenge：[AtCoder Beginners Selection - ABC081B Shift only](https://atcoder.jp/contests/abs/tasks/abc081_b)

## 進階練習

- [ZeroJudge a005. Eva 的回家作業](https://zerojudge.tw/ShowProblem?problemid=a005)
