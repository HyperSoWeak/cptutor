# Lesson 7：Binary Search

## 本課目標

完成後應具備以下能力：

- 理解 binary search 適用於有序資料或單調條件。
- 手寫 binary search，在已排序陣列中找指定數字。
- 說明搜尋區間、停止條件，以及每次更新邊界的原因。
- 手寫第一個大於等於或大於指定值的位置，再對照 STL 用法。
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

## 手寫 binary search：找指定數字

先考慮最單純的問題：在由小到大排序的陣列 `a` 中找出 $x$ 的位置。

### 搜尋區間的意義

使用 `left` 和 `right` 表示還沒有排除的 index，兩端都包含在內，記作 $[left, right]$。若 $x$ 存在，至少有一個符合的位置仍在這個區間中。

一開始整個陣列都有可能，因此 `left = 0`、`right = n - 1`。每次取中間位置：

```cpp
int mid = left + (right - left) / 2;
```

`mid` 是 index，`a[mid]` 才是用來比較的值。這個寫法也避免直接計算 `left + right` 可能造成的 overflow。

| 比較結果 | 可以排除的範圍 | 下一步 |
| --- | --- | --- |
| `a[mid] == x` | 已找到答案 | 記錄 `mid` 並結束 |
| `a[mid] < x` | `mid` 及其左側都太小 | `left = mid + 1` |
| `a[mid] > x` | `mid` 及其右側都太大 | `right = mid - 1` |

因為陣列有序，以上排除不會漏掉答案。`mid` 已經比較過且不等於 $x$，所以更新時要跨過它，使用 `+ 1` 或 `- 1`。

### 完整搜尋迴圈

```cpp
int left = 0;
int right = n - 1;
int ans = -1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (a[mid] == x) {
        ans = mid;
        break;
    } else if (a[mid] < x) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
```

`left == right` 時，還有最後一個元素需要檢查，所以條件使用 `<=`。若最後 `left > right`，表示搜尋區間已空；此時 `ans` 仍為 $-1$，代表找不到。

每次未找到時，都會排除 `mid` 與其中一半的範圍，因此區間持續縮小，不會停在同一個位置。

### 逐步追蹤

在 `a = [1, 3, 4, 6, 8, 10]` 中找 $6$，index 從 $0$ 開始：

| `left` | `right` | `mid` | `a[mid]` | 動作 |
| --- | --- | --- | --- | --- |
| $0$ | $5$ | $2$ | $4$ | 太小，`left = 3` |
| $3$ | $5$ | $4$ | $8$ | 太大，`right = 3` |
| $3$ | $3$ | $3$ | $6$ | 找到，`ans = 3` |

若改找 $7$，前兩步相同。第三步因 $6 < 7$，更新成 `left = 4`；此時 `right = 3`，區間已空，判定不存在。

## 示範題：[ZeroJudge d732 二分搜尋法](https://zerojudge.tw/ShowProblem?problemid=d732)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: 手寫 binary search、指定值查找

### 題目重點

給定嚴格遞增的數列與多筆查詢。對每個查詢值，若存在就輸出它的 $1$-based 位置，否則輸出 $0$；每筆答案各占一行。

數列已排序，且沒有重複值，可以直接練習最基本的 binary search。

### 提示 1

用 `left = 0`、`right = n - 1` 表示搜尋範圍，比較中間元素與查詢值。

### 提示 2

找到時將 index 加 $1$，就是題目要求的位置。每筆查詢都要重新設定搜尋區間與答案。

### 解題想法

對每個查詢獨立執行前面的手寫搜尋。程式先將答案設為 $0$；找到時改為 `mid + 1`，若區間縮至空集合，便保留 $0$。

每筆查詢需要 $O(\log N)$，包含讀取陣列的總時間為 $O(N + K \log N)$，其中 $K$ 是查詢次數。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = 0; i < k; i++) {
        int x;
        cin >> x;

        int left = 0;
        int right = n - 1;
        int ans = 0;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (a[mid] == x) {
                ans = mid + 1;
                break;
            } else if (a[mid] < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        cout << ans << '\n';
    }
}
```

## 手寫 lower_bound 與 upper_bound

若陣列可能有重複值，找到相等元素就停止，只能得到其中一個位置，不保證是第一次出現的位置。

要找第一個大於等於 $x$ 的位置，可以繼續使用兩端包含的搜尋區間，另外用 `ans` 記錄目前找到的候選位置：

```cpp
int left = 0;
int right = n - 1;
int ans = n;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (a[mid] >= x) {
        ans = mid;
        right = mid - 1;
    } else {
        left = mid + 1;
    }
}
```

- 若 `a[mid] >= x`，`mid` 是候選答案，但左邊可能還有更早符合的位置，因此先記錄，再往左找。
- 若 `a[mid] < x`，`mid` 與左邊都不符合，只需往右找。
- `ans = n` 表示尚未找到符合的位置。若所有元素都小於 $x$，最後就會保留 $n$；它是陣列尾端之後的位置，不能存取 `a[n]`。

例如 `a = [1, 2, 2, 2, 5, 8]`、$x = 2$，第一次在 index $2$ 找到相等元素後，仍往左搜尋，最後得到 index $1$。

若要確認 $x$ 本身是否存在，搜尋後檢查 `ans < n && a[ans] == x`。不能只看 `ans < n`，因為找到的值也可能大於 $x$。

要找第一個嚴格大於 $x$ 的位置，也就是 `upper_bound`，只要將條件 `a[mid] >= x` 改成 `a[mid] > x`，其餘更新方式相同。以上例而言，結果為 index $4$。

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

## 對答案做 binary search

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
    long long mid = low + (high - low) / 2;

    if (can(mid)) {
        low = mid;
    } else {
        high = mid;
    }
}

cout << low << '\n';
```

這裡維持的意思是：

- `low` 是已知可行的下界；這裡用 $0$ 代表沒有正整數可選。
- `high` 是不可選的上界；$10^9 + 1$ 超出題目允許的範圍。
- 尚未確定的整數都嚴格位於兩個邊界之間，兩個邊界本身不再檢查。
- 當 `high - low == 1`，中間沒有整數，最後 `low` 就是最大可行答案。

這個版本的 `low`、`high` 是已確定狀態的邊界，所以更新成 `mid`。前面的陣列版本則用 `[left, right]` 表示尚未排除的 index，更新時使用 `mid + 1` 或 `mid - 1`；兩種區間定義的停止條件與更新方式不能混用。

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

由於 $A$、$B$ 都是正數，整數越小，價格越低；若買得起 $N$，也一定買得起比它小的正整數。

### 提示 2

可以寫一個 `can(n)` 判斷是否買得起 $n$，再 binary search 最大可行值。

### 解題想法

可行性是單調的：

```text
可行：0 1 2 3 ... ans
不可行：ans + 1 ...
```

因此可以用 binary search 找最後一個可行值。$0$ 只代表「買不起任何正整數」，不需要呼叫 `canBuy(0)`；上界 $10^9 + 1$ 也不會送進判斷函式。

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
        long long mid = low + (high - low) / 2;

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
  <Problem id="l7-c1" href="https://zerojudge.tw/ShowProblem?problemid=d732" title="ZeroJudge d732 二分搜尋法" difficulty="basic" topic="手寫 binary search、指定值查找" />
  <Problem id="l7-c2" href="https://atcoder.jp/contests/abc231/tasks/abc231_c" title="AtCoder ABC231C Counting 2" difficulty="standard" topic="排序、lower_bound、查詢數量" />
  <Problem id="l7-c3" href="https://atcoder.jp/contests/abc212/tasks/abc212_c" title="AtCoder ABC212C Min Difference" difficulty="standard" topic="排序、lower_bound、最小差" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l7-h1" href="https://zerojudge.tw/ShowProblem?problemid=f679" title="ZeroJudge f679 公會成員" difficulty="basic" topic="手寫 binary search、存在性查詢" />
  <Problem id="l7-h2" href="https://atcoder.jp/contests/abc077/tasks/arc084_a" title="AtCoder ABC077C Snuke Festival" difficulty="standard" topic="lower_bound、upper_bound、組合計數" />
  <Problem id="l7-h3" href="https://zerojudge.tw/ShowProblem?problemid=e541" title="ZeroJudge e541 Where is the marble" difficulty="standard" topic="排序、手寫 lower_bound、第一次出現位置" />
  <Problem id="l7-h4" href="https://atcoder.jp/contests/abc146/tasks/abc146_c" title="AtCoder ABC146C Buy an Integer" difficulty="challenge" topic="answer binary search、最大可行值" />
  <Problem id="l7-h5" href="https://cses.fi/problemset/task/1620/" title="CSES Factory Machines" difficulty="challenge" topic="answer binary search、最小可行時間" />
  <Problem id="l7-h6" href="https://atcoder.jp/contests/abc143/tasks/abc143_d" title="AtCoder ABC143D Triangles" difficulty="challenge" topic="排序、upper_bound、三角形計數" />
</ul>

## 常見錯誤

- 忘記先排序就使用 `lower_bound` 或 `binary_search`。
- 把 `lower_bound` 和 `upper_bound` 混淆：前者是第一個大於等於，後者是第一個大於。
- 沒有檢查 `it == a.end()` 就直接使用 `*it`。
- 題目要 $1$-based 位置，但輸出成 $0$-based index。
- 搜尋閉區間時使用 `left < right`，漏掉最後一個元素。
- 找第一次出現的位置，卻在遇到相等值時直接停止。
- 手寫 `lower_bound` 得到 $n$ 後，仍存取 `a[n]`。
- 手寫 binary search 時混用不同區間定義，導致漏解或 infinite loop。
- answer binary search 沒有先確認單調性。
- 計算 `mid` 或價格時使用 `int`，導致 overflow。
