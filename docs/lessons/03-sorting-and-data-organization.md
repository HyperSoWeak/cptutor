# Lesson 3：排序與資料整理

## 本課目標

完成後應具備以下能力：

- 使用 `sort` 將 `vector` 或陣列排序。
- 理解升冪排序與降冪排序。
- 排序後取前 $K$ 大、前 $K$ 小或依序處理資料。
- 排序後檢查相鄰元素。
- 排序後統計不同值的數量。
- 理解排序通常需要約 $O(N \log N)$ 的時間。

## 為什麼排序能讓問題變簡單

L2 已經學過如何把一串資料存進 `vector`，並用迴圈計算總和、最大值、最小值或符合條件的個數。可是有些題目若照輸入順序處理，會很難看出規律。

排序會把資料整理成固定順序。整理後，最大值、最小值、相鄰差、重複值、前幾大與前幾小都更容易處理。

例如有一串數字：

```text
8 3 5 3 10 8
```

排序後變成：

```text
3 3 5 8 8 10
```

此時可以直接看出：

- 最小值在最前面。
- 最大值在最後面。
- 相同數字會靠在一起。
- 相鄰元素之間的差距可以依序檢查。

本課先學會使用 C++ standard library 提供的 `sort`。各種排序演算法的原理會放到之後再討論。

## sort 的基本用法

### vector 升冪排序

`sort(a.begin(), a.end())` 會把 `vector` 由小到大排序：

```cpp
vector<int> a = {8, 3, 5, 3, 10, 8};
sort(a.begin(), a.end());
```

排序後，`a` 會變成：

```text
3 3 5 8 8 10
```

`a.begin()` 表示排序範圍的起點，`a.end()` 表示排序範圍結束位置的下一格。這種寫法會排序整個 `vector`。

### 固定陣列升冪排序

如果使用固定大小陣列，排序前 $n$ 個元素可以寫：

```cpp
int a[100];
int n;
cin >> n;

for (int i = 0; i < n; i++) {
    cin >> a[i];
}

sort(a, a + n);
```

`a` 是起點，`a + n` 是結束位置的下一格，因此會排序 `a[0]` 到 `a[n - 1]`。

### 降冪排序

如果要由大到小排序，可以加上 `greater<int>()`：

```cpp
sort(a.begin(), a.end(), greater<int>());
```

例如：

```cpp
vector<int> a = {8, 3, 5, 3, 10, 8};
sort(a.begin(), a.end(), greater<int>());
```

排序後會變成：

```text
10 8 8 5 3 3
```

## 排序後取前幾個

排序後，前幾大或前幾小的位置會很明確。

若要取前 $K$ 小：

```cpp
sort(a.begin(), a.end());

int sum = 0;
for (int i = 0; i < k; i++) {
    sum += a[i];
}
```

若要取前 $K$ 大，可以降冪排序後取前 $K$ 個：

```cpp
sort(a.begin(), a.end(), greater<int>());

int sum = 0;
for (int i = 0; i < k; i++) {
    sum += a[i];
}
```

這種題型的重點是先判斷要「由小到大」還是「由大到小」處理資料。

## 示範題：[AtCoder ABC067B Snake Toy](https://atcoder.jp/contests/abc067/tasks/abc067_b)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: 排序、前 $K$ 大、總和

### 題目重點

有 $N$ 根蛇玩具，第 $i$ 根長度是 $l_i$。要選出 $K$ 根，使總長度最大。求最大總長度。

### 提示 1

若想讓總長度最大，應該選最長的 $K$ 根。

### 提示 2

可以把長度由大到小排序，再取前 $K$ 個。

### 解題想法

排序前，最長的 $K$ 根可能分散在不同位置。若先把所有長度降冪排序，前 $K$ 個元素就是最長的 $K$ 根。

因此做法是：

1. 讀入 $N$、$K$ 與所有長度。
2. 將 `vector<int>` 由大到小排序。
3. 累加前 $K$ 個元素。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> l(n);
    for (int i = 0; i < n; i++) {
        cin >> l[i];
    }

    sort(l.begin(), l.end(), greater<int>());

    int ans = 0;
    for (int i = 0; i < k; i++) {
        ans += l[i];
    }

    cout << ans << '\n';
}
```

## 排序後依序處理

有些題目不是只取前幾個，而是排序後從頭到尾依序處理。

例如兩個人輪流拿卡片。若每個人都想讓自己的總分最大，當輪到自己時一定會拿目前剩下最大的卡片。把卡片先降冪排序後，就可以從前到後模擬拿牌順序。

## 示範題：[AtCoder ABC088B Card Game for Two](https://atcoder.jp/contests/abc088/tasks/abc088_b)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 排序、模擬、交替處理

### 題目重點

有 $N$ 張卡片，每張卡片有一個分數。Alice 和 Bob 輪流拿卡片，Alice 先拿。每次都會拿剩下分數最高的卡片。求最後 Alice 的總分減 Bob 的總分。

### 提示 1

先把卡片分數由大到小排序。

### 提示 2

排序後，index 為偶數的位置由 Alice 拿，index 為奇數的位置由 Bob 拿。

### 解題想法

因為每次都拿剩下最大的卡片，降冪排序後的順序就是實際拿牌順序。

排序後：

- `a[0]`、`a[2]`、`a[4]`、... 由 Alice 拿。
- `a[1]`、`a[3]`、`a[5]`、... 由 Bob 拿。

分別累加兩人的分數，最後輸出 `alice - bob`。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a.begin(), a.end(), greater<int>());

    int alice = 0;
    int bob = 0;

    for (int i = 0; i < n; i++) {
        if (i % 2 == 0) alice += a[i];
        else bob += a[i];
    }

    cout << alice - bob << '\n';
}
```

## 排序後檢查相鄰元素

排序後，相同或相近的值會靠在一起。這讓許多檢查變得更簡單。

### 檢查重複值

若要判斷是否有重複數字，排序後只需要檢查相鄰元素：

```cpp
sort(a.begin(), a.end());

bool hasDuplicate = false;
for (int i = 1; i < n; i++) {
    if (a[i] == a[i - 1]) {
        hasDuplicate = true;
    }
}
```

### 統計不同值數量

若要統計有幾種不同數字，也可以排序後檢查「是否和前一個不同」：

```cpp
sort(a.begin(), a.end());

int cnt = 0;
for (int i = 0; i < n; i++) {
    if (i == 0 || a[i] != a[i - 1]) {
        cnt++;
    }
}
```

這段程式中，第一個元素一定是一種新的數字。之後每當 `a[i] != a[i - 1]`，就代表遇到新的數字。

## 示範題：[CSES Distinct Numbers](https://cses.fi/problemset/task/1621/)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 排序、不同值數量、相鄰元素

### 題目重點

給定 $N$ 個整數，求其中有幾個不同的數字。

### 提示 1

排序後，相同的數字會連在一起。

### 提示 2

從左到右檢查，每當目前數字和前一個數字不同，就多一種數字。

### 解題想法

先將陣列升冪排序。排序後，相同的數字會變成一整段連續區間。

因此答案可以用以下方式計算：

- `a[0]` 是第一種數字。
- 若 `a[i] != a[i - 1]`，代表從位置 $i$ 開始出現新的數字。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a.begin(), a.end());

    int ans = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || a[i] != a[i - 1]) {
            ans++;
        }
    }

    cout << ans << '\n';
}
```

## 排序的時間

`sort` 通常需要約 $O(N \log N)$ 的時間。現在不需要完整理解 $\log N$ 的數學定義，只要先記住：

- 單層迴圈通常是 $O(N)$。
- 雙層迴圈通常是 $O(N^2)$。
- `sort` 通常是 $O(N \log N)$，比 $O(N^2)$ 更適合處理很大的 $N$。

例如 $N = 2 \times 10^5$ 時，雙層迴圈檢查所有 pair 通常太慢，但排序通常可以接受。

更完整的時間複雜度會在下一階段正式討論。本課先把 `sort` 當成整理資料的重要工具。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l3-c1" href="https://atcoder.jp/contests/abc102/tasks/abc102_b" title="AtCoder ABC102B Maximum Difference" difficulty="basic" topic="排序、最大值、最小值" />
  <Problem id="l3-c2" href="https://atcoder.jp/contests/abc085/tasks/abc085_b" title="AtCoder ABC085B Kagami Mochi" difficulty="basic" topic="排序、不同值數量" />
  <Problem id="l3-c3" href="https://atcoder.jp/contests/abc115/tasks/abc115_c" title="AtCoder ABC115C Christmas Eve" difficulty="standard" topic="排序、連續區間、最小差" />
  <Problem id="l3-c4" href="https://cses.fi/problemset/task/1074/" title="CSES Stick Lengths" difficulty="challenge" topic="排序、中位數、距離總和" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l3-h1" href="https://atcoder.jp/contests/abc042/tasks/abc042_b" title="AtCoder ABC042B Iroha Loves Strings" difficulty="basic" topic="字串排序、依序串接" />
  <Problem id="l3-h2" href="https://atcoder.jp/contests/abc082/tasks/abc082_b" title="AtCoder ABC082B Two Anagrams" difficulty="standard" topic="字串排序、字典序比較" />
  <Problem id="l3-h3" href="https://atcoder.jp/contests/abc094/tasks/arc095_a" title="AtCoder ABC094C Many Medians" difficulty="standard" topic="排序、複製陣列、中位數" />
  <Problem id="l3-h4" href="https://atcoder.jp/contests/abc117/tasks/abc117_c" title="AtCoder ABC117C Streamline" difficulty="challenge" topic="排序、相鄰差、資料整理" />
  <Problem id="l3-h5" href="https://atcoder.jp/contests/abc071/tasks/arc081_a" title="AtCoder ABC071C Make a Rectangle" difficulty="challenge" topic="排序、相同值、最大面積" />
</ul>

## 常見錯誤

- 忘記 `#include <bits/stdc++.h>`：本教材使用這個 header，會包含 `sort` 需要的 library。
- 排序範圍寫錯：`sort(a.begin(), a.end())` 排序整個 `vector`；固定陣列排序前 $n$ 個元素寫 `sort(a, a + n)`。
- 降冪排序寫錯：`greater<int>()` 的型別要和 `vector<int>` 的元素型別一致。
- 取前 $K$ 個時超出範圍：題目通常會保證 $K \le N$，程式仍應確認迴圈條件是 `i < k`。
- 統計不同值時漏掉第一個元素：第一個元素一定代表一種數字，常見寫法是判斷 `i == 0 || a[i] != a[i - 1]`。
