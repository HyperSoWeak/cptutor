# Lesson 7：Binary Search

## 本課目標

完成後應具備以下能力：

- 理解 binary search 適用於有序資料或單調條件。
- 使用 `binary_search` 判斷數字是否存在。
- 使用 `lower_bound` 找第一個大於等於 $X$ 的位置。
- 使用 `upper_bound` 找第一個大於 $X$ 的位置。
- 用 `lower_bound` 與 `upper_bound` 統計範圍內的數量。
- 手寫 binary search 找最後一個可行答案。
- 理解 answer binary search 的基本形式。

## 為什麼可以折半查找

若一串數字沒有排序，要找某個數字通常只能從頭到尾檢查。

```text
8 3 10 1 6 4
```

但若資料已經排序：

```text
1 3 4 6 8 10
```

要找 $6$ 時，可以先看中間位置。若中間值太小，答案只可能在右半邊；若中間值太大，答案只可能在左半邊。每次都能丟掉大約一半範圍，因此查找速度很快。

Binary search 的複雜度是 $O(\log N)$。當 $N = 10^5$ 時，大約只需要十幾次到二十次檢查。

## 使用 STL 查找

C++ 已經提供常用的 binary search 工具。使用前必須先確認資料已排序。

### 判斷是否存在

```cpp
sort(a.begin(), a.end());

if (binary_search(a.begin(), a.end(), x)) {
    cout << "found\n";
} else {
    cout << "not found\n";
}
```

`binary_search` 只回答是否存在，不告訴你位置。

### lower_bound

`lower_bound(a.begin(), a.end(), x)` 會回傳第一個大於等於 $x$ 的位置。

```cpp
auto it = lower_bound(a.begin(), a.end(), x);
int idx = it - a.begin();
```

若 `it == a.end()`，代表所有元素都小於 $x$。

### upper_bound

`upper_bound(a.begin(), a.end(), x)` 會回傳第一個大於 $x$ 的位置。

```cpp
auto it = upper_bound(a.begin(), a.end(), x);
int idx = it - a.begin();
```

若資料中有重複元素，`lower_bound` 與 `upper_bound` 可以用來找出同一個值的範圍。

```text
a = [1, 2, 2, 2, 5, 8]
lower_bound(2) -> index 1
upper_bound(2) -> index 4
```

所以 $2$ 的出現次數是 $4 - 1 = 3$。

## 示範題：[洛谷 P2249 查找](https://www.luogu.com.cn/problem/P2249)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: binary search、lower_bound、第一次出現位置

### 題目重點

給定一個已排序的數列，接著有多筆查詢。每次問某個數字第一次出現的位置；若不存在，輸出 $-1$。

### 提示 1

已排序資料中找第一次出現位置，正是 `lower_bound` 的用途。

### 提示 2

`lower_bound` 找到的是第一個大於等於 $q$ 的位置。找到後還要確認該位置的值是否真的等於 $q$。

### 解題想法

對每個查詢 $q$：

1. 使用 `lower_bound` 找到第一個大於等於 $q$ 的 iterator。
2. 若 iterator 到達 `a.end()`，代表不存在。
3. 若 `*it != q`，代表第一個大於等於 $q$ 的數不是 $q$，也不存在。
4. 否則輸出位置。題目使用 $1$-based 編號，所以 index 要加 $1$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    for (int i = 0; i < m; i++) {
        int q;
        cin >> q;

        auto it = lower_bound(a.begin(), a.end(), q);
        if (it == a.end() || *it != q) {
            cout << -1;
        } else {
            cout << (it - a.begin() + 1);
        }

        if (i + 1 < m) cout << ' ';
    }
    cout << '\n';
}
```

## 用上下界計數

若要知道排序陣列中有幾個數字落在 $[L, R]$，可以分成：

- 第一個大於等於 $L$ 的位置。
- 第一個大於 $R$ 的位置。

兩個位置相減，就是範圍內的元素數量。

```cpp
auto left = lower_bound(a.begin(), a.end(), L);
auto right = upper_bound(a.begin(), a.end(), R);
cout << right - left << '\n';
```

這個技巧常用在「多次查詢」題目。先排序花 $O(N \log N)$，每次查詢只要 $O(\log N)$。

## 示範題：[AtCoder ABC077C Snuke Festival](https://atcoder.jp/contests/abc077/tasks/arc084_a)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 排序、lower_bound、upper_bound、組合計數

### 題目重點

有三組零件 $A$、$B$、$C$。要選一個上層零件、一個中層零件、一個下層零件，使大小滿足：

$$
A < B < C
$$

求可行組合數。

### 提示 1

固定一個中層零件 $B_i$ 後，可以分別計算有幾個 $A$ 小於它、有幾個 $C$ 大於它。

### 提示 2

排序後：

- 小於 $B_i$ 的 $A$ 數量可用 `lower_bound`。
- 大於 $B_i$ 的 $C$ 數量可用 `upper_bound`。

### 解題想法

先將 $A$ 與 $C$ 排序。接著枚舉每個中層零件 `b[i]`。

對於固定的 `b[i]`：

- `lower_bound(a.begin(), a.end(), b[i]) - a.begin()` 是小於 `b[i]` 的 $A$ 數量。
- `c.end() - upper_bound(c.begin(), c.end(), b[i])` 是大於 `b[i]` 的 $C$ 數量。

兩者相乘，就是以這個 `b[i]` 作為中層零件的組合數。全部加總即可。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<long long> a(n), b(n), c(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    for (int i = 0; i < n; i++) cin >> c[i];

    sort(a.begin(), a.end());
    sort(c.begin(), c.end());

    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long countA = lower_bound(a.begin(), a.end(), b[i]) - a.begin();
        long long countC = c.end() - upper_bound(c.begin(), c.end(), b[i]);
        ans += countA * countC;
    }

    cout << ans << '\n';
}
```

## 手寫 binary search

STL 可以處理很多查找題，但有些題目要自己對答案做 binary search。這類題目常見形式是：

```text
答案越大越容易達成，或答案越小越容易達成。
```

例如「最多能買多大的整數」。若可以買 $100$，通常也可以買 $99$、$98$。這種可行性具有單調性。

找「最後一個可行」的常見寫法：

```cpp
long long low = 0;
long long high = 1000000000LL + 1;

while (high - low > 1) {
    long long mid = (low + high) / 2;

    if (can(mid)) {
        low = mid;
    } else {
        high = mid;
    }
}

cout << low << '\n';
```

這裡維持的意思是：

- `low` 一定可行。
- `high` 一定不可行。
- 最後 `low` 就是最大可行答案。

## 示範題：[AtCoder ABC146C Buy an Integer](https://atcoder.jp/contests/abc146/tasks/abc146_c)

- Difficulty: <span class="difficulty challenge">challenge</span>
- Topic: answer binary search、單調性、long long

### 題目重點

買整數 $N$ 的價格是：

$$
A \times N + B \times d(N)
$$

其中 $d(N)$ 是 $N$ 的十進位位數。給定預算 $X$，求能買到的最大整數。整數範圍是 $1$ 到 $10^9$。

### 提示 1

若能買得起某個整數 $N$，通常也買得起比它小的整數。

### 提示 2

可以寫一個 `can(n)` 判斷是否買得起 $n$，再 binary search 最大可行值。

### 解題想法

可行性是單調的：

```text
可行：0 1 2 3 ... ans
不可行：ans + 1 ...
```

因此可以用 binary search 找最後一個可行值。

要注意 $A$、$B$、$X$ 都可能很大，計算價格時要使用 `long long`。另外，答案最大只會到 $10^9$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

long long a, b, x;

int digits(long long n) {
    return to_string(n).size();
}

bool canBuy(long long n) {
    long long price = a * n + b * digits(n);
    return price <= x;
}

int main() {
    cin >> a >> b >> x;

    long long low = 0;
    long long high = 1000000000LL + 1;

    while (high - low > 1) {
        long long mid = (low + high) / 2;

        if (canBuy(mid)) {
            low = mid;
        } else {
            high = mid;
        }
    }

    cout << low << '\n';
}
```

## 怎麼判斷能不能 binary search

Binary search 不只是「資料有排序」。更重要的是能把答案分成連續的兩段：

```text
false false false true true true
```

或：

```text
true true true false false false
```

如果可行與不可行交錯出現，就不能直接 binary search。

看到題目時，可以問：

1. 是否已經排序，或能不能先排序？
2. 要找的是位置、數量、還是最大/最小答案？
3. 若某個答案可行，比它更大或更小是否也一定可行？

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l7-c1" href="https://www.luogu.com.cn/problem/P2249" title="洛谷 P2249 查找" difficulty="basic" topic="lower_bound、第一次出現位置" />
  <Problem id="l7-c2" href="https://atcoder.jp/contests/abc231/tasks/abc231_c" title="AtCoder ABC231C Counting 2" difficulty="standard" topic="排序、lower_bound、查詢數量" />
  <Problem id="l7-c3" href="https://atcoder.jp/contests/abc212/tasks/abc212_c" title="AtCoder ABC212C Min Difference" difficulty="standard" topic="排序、lower_bound、最小差" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l7-h1" href="https://www.luogu.com.cn/problem/P1678" title="洛谷 P1678 烦恼的高考志愿" difficulty="basic" topic="排序、lower_bound、最接近值" />
  <Problem id="l7-h2" href="https://atcoder.jp/contests/abc077/tasks/arc084_a" title="AtCoder ABC077C Snuke Festival" difficulty="standard" topic="lower_bound、upper_bound、組合計數" />
  <Problem id="l7-h3" href="https://www.luogu.com.cn/problem/P1102" title="洛谷 P1102 A-B 数对" difficulty="standard" topic="排序、lower_bound、upper_bound、pair 計數" />
  <Problem id="l7-h4" href="https://atcoder.jp/contests/abc146/tasks/abc146_c" title="AtCoder ABC146C Buy an Integer" difficulty="challenge" topic="answer binary search、最大可行值" />
  <Problem id="l7-h5" href="https://cses.fi/problemset/task/1620/" title="CSES Factory Machines" difficulty="challenge" topic="answer binary search、最小可行時間" />
  <Problem id="l7-h6" href="https://atcoder.jp/contests/abc143/tasks/abc143_d" title="AtCoder ABC143D Triangles" difficulty="challenge" topic="排序、upper_bound、三角形計數" />
</ul>

## 常見錯誤

- 忘記先排序就使用 `lower_bound` 或 `binary_search`。
- 把 `lower_bound` 和 `upper_bound` 混淆：前者是第一個大於等於，後者是第一個大於。
- 沒有檢查 `it == a.end()` 就直接使用 `*it`。
- 題目要 $1$-based 位置，但輸出成 $0$-based index。
- 手寫 binary search 時邊界沒有收縮，造成 infinite loop。
- answer binary search 沒有先確認單調性。
- 計算 `mid` 或價格時使用 `int`，導致 overflow。
