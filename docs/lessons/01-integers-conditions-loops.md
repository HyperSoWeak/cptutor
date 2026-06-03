# Lesson 1：整數、條件判斷與迴圈

## 本課目標

完成後應具備以下能力：

- 宣告整數變數並讀入多個整數。
- 使用四則運算與 `%` 運算子。
- 使用 `if` / `else if` / `else` 進行條件判斷。
- 使用 `for` 與 `while` 迴圈重複執行程式碼。
- 理解 `int` 與 `long long` 的使用時機。

## 整數型別與基本運算

### int 與 long long

C++ 需要明確宣告變數型別。常用的整數型別有兩種：

| 型別 | 大小 | 可表示範圍 |
|------|------|-----------|
| `int` | 32-bit | 約 $\pm 2.1 \times 10^9$ |
| `long long` | 64-bit | 約 $\pm 9.2 \times 10^{18}$ |

一般情況下先使用 `int`。當題目說明數值可能超過 $10^9$，或計算過程中會產生大數時，改用 `long long`。

### 四則運算與整數除法

```cpp
int a = 7, b = 2;
cout << a + b << '\n';  // 9
cout << a - b << '\n';  // 5
cout << a * b << '\n';  // 14
cout << a / b << '\n';  // 3（整數除法，捨去小數）
cout << a % b << '\n';  // 1（餘數）
```

`/` 在兩個整數相除時會捨去小數部分，與 Python 的 `//` 行為相同。`%` 取餘數的行為也與 Python 一致。

### 多值輸入

`cin >>` 可以連續讀入多個值，以空白或換行分隔：

```cpp
int a, b, c;
cin >> a >> b >> c;
```

## 條件判斷

### if / else if / else

```cpp
if (a > b) {
    cout << "a 較大\n";
} else if (a < b) {
    cout << "b 較大\n";
} else {
    cout << "相等\n";
}
```

Python 的 `elif` 在 C++ 寫成 `else if`。

### 比較與邏輯運算子

比較運算子：`==`、`!=`、`<`、`>`、`<=`、`>=`

邏輯運算子：

| Python | C++ |
|--------|-----|
| `and`  | `&&` |
| `or`   | `\|\|` |
| `not`  | `!` |

```cpp
if (a >= 0 && a <= 100) {
    cout << "在範圍內\n";
}
```

## 迴圈

### for 迴圈

```cpp
for (int i = 1; i <= 5; i++) {
    cout << i << '\n';
}
```

語法為 `for (初始化; 條件; 更新)`。與 Python 對照：

| Python | C++ |
|--------|-----|
| `for i in range(1, 6):` | `for (int i = 1; i <= 5; i++)` |
| `for i in range(n):` | `for (int i = 0; i < n; i++)` |

`i++` 等同於 `i += 1`。

### while 迴圈

當不確定迭代次數時使用 `while`：

```cpp
while (n > 1) {
    if (n % 2 == 0) n /= 2;
    else n = 3 * n + 1;
}
```

## 示範題：ZeroJudge a002 簡易加法

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: ZeroJudge
- Link: https://zerojudge.tw/ShowProblem?problemid=a002
- Difficulty: basic
- Topic: 整數輸入、加法
- 建議時機: 示範題

</div>

### 題目重點

讀入兩個整數，輸出其和。

### 解題想法

宣告兩個 `int`，讀入後相加輸出。

### 參考程式碼

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

## 示範題：AtCoder ABC086A Product

<span class="difficulty basic">basic</span>

<div class="problem-meta">

- OJ: AtCoder
- Link: https://atcoder.jp/contests/abc086/tasks/abc086_a
- Difficulty: basic
- Topic: 條件判斷、整數乘法
- 建議時機: 示範題

</div>

### 題目重點

給定兩個正整數 $A$ 和 $B$，若 $A \times B$ 為奇數輸出 `Odd`，否則輸出 `Even`。

### 提示 1

用 `%` 判斷一個數是否為奇數。

### 提示 2

直接計算 $A \times B$，再判斷奇偶。

### 解題想法

只有奇數 × 奇數才是奇數，其餘均為偶數。計算乘積後以 `% 2` 判斷即可。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int a, b;
    cin >> a >> b;
    if ((a * b) % 2 == 0) cout << "Even\n";
    else cout << "Odd\n";

    return 0;
}
```

## 練習

### 課堂練習

- [CSES 1068 Weird Algorithm](https://cses.fi/problemset/task/1068) <span class="difficulty standard">standard</span>
- [ZeroJudge a010 因數分解](https://zerojudge.tw/ShowProblem?problemid=a010) <span class="difficulty challenge">challenge</span>

### 回家練習

- [AtCoder ABC051B Sum of Three Integers](https://atcoder.jp/contests/abc051/tasks/abc051_b) <span class="difficulty standard">standard</span>

## 常見錯誤

- `int` 溢位：兩個 `int` 相乘可能超出範圍，必要時宣告 `long long`。
- 整數除法：`7 / 2` 在 C++ 是 `3`，不是 `3.5`。若需要小數，使用 `double`。
- `=` 與 `==` 混淆：`=` 是賦值，`==` 是比較，兩者在條件式中行為截然不同。
- `for` 迴圈邊界：`i <= n` 與 `i < n` 差一次迭代，確認題目要求的範圍。
