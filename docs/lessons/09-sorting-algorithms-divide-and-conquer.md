# Lesson 9：排序演算法與分治

## 本課目標

完成後應具備以下能力：

- 理解為什麼排序演算法有快慢差異。
- 看懂 bubble sort、selection sort、insertion sort 的基本流程。
- 比較 $O(N^2)$ 排序與 $O(N \log N)$ 排序的差距。
- 理解 divide and conquer 的「切開、解小問題、合併」流程。
- 實作 merge sort 的核心想法。
- 用 merge sort 計算 inversion count。
- 知道實戰中通常使用 `sort`，但仍能理解排序成本。

## 為什麼還要學排序演算法

L3 已經學過使用 `sort`。實際比賽中，大多數情況也應該直接使用 C++ standard library 的 `sort`，不需要自己寫排序。

但學排序演算法仍有幾個目的：

- 理解為什麼 `sort` 比簡單雙層迴圈排序快。
- 練習分析 $O(N^2)$ 與 $O(N \log N)$。
- 學習 divide and conquer。
- 為之後更進階的演算法打基礎。

本課重點不是背很多排序模板，而是理解不同方法的成本差異。

## $O(N^2)$ 排序

### Bubble sort

Bubble sort 會反覆比較相鄰元素，若順序錯誤就交換。

```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j + 1 < n - i; j++) {
        if (a[j] > a[j + 1]) {
            swap(a[j], a[j + 1]);
        }
    }
}
```

每一輪會把目前最大的元素推到右邊。因為有雙層迴圈，複雜度是 $O(N^2)$。

### Selection sort

Selection sort 每一輪找出剩下元素中的最小值，放到目前位置。

```cpp
for (int i = 0; i < n; i++) {
    int best = i;
    for (int j = i + 1; j < n; j++) {
        if (a[j] < a[best]) {
            best = j;
        }
    }
    swap(a[i], a[best]);
}
```

它也需要反覆掃描剩下的元素，複雜度是 $O(N^2)$。

### Insertion sort

Insertion sort 會把目前元素插入左邊已排序的部分。

```cpp
for (int i = 1; i < n; i++) {
    int x = a[i];
    int j = i - 1;

    while (j >= 0 && a[j] > x) {
        a[j + 1] = a[j];
        j--;
    }

    a[j + 1] = x;
}
```

若資料幾乎已排序，insertion sort 可能很快；但最壞情況仍是 $O(N^2)$。

## 示範題：[ZeroJudge a539 Flip Sort](https://zerojudge.tw/ShowProblem?problemid=a539)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: bubble sort、相鄰交換、inversion count

### 題目重點

給定一串數字，若只能交換相鄰的兩個元素，求至少需要交換幾次才能排序。

### 提示 1

Bubble sort 每次遇到相鄰元素順序錯誤時會交換一次。

### 提示 2

相鄰交換的最少次數等於 inversion count，也就是有幾對元素順序相反。

### 解題想法

本題 $N \le 1000$，可以直接用 $O(N^2)$ 的方式計算。

一個 inversion 是一組 index $i < j$，但 $a_i > a_j$。每一組 inversion 都需要至少一次相鄰交換才能修正。Bubble sort 每次交換會減少一個 inversion，因此交換次數就是 inversion count。

本課先用雙層迴圈計算，之後會用 merge sort 做更快的版本。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;

    while (cin >> n) {
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        long long inversions = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (a[i] > a[j]) {
                    inversions++;
                }
            }
        }

        cout << "Minimum exchange operations : " << inversions << '\n';
    }
}
```

## 為什麼 $O(N^2)$ 不夠

若 $N = 1000$，$N^2 = 10^6$，通常可以接受。

若 $N = 10^5$：

$$
N^2 = 10^{10}
$$

這通常太慢。這也是為什麼實戰中不會使用 bubble sort、selection sort 或 insertion sort 來處理大量資料。

`sort` 通常是 $O(N \log N)$。若 $N = 10^5$，$N \log N$ 大約是幾百萬等級，差距非常明顯。

## Divide and conquer

Divide and conquer 是一種解題模式：

```text
Divide：把問題切成幾個小問題。
Conquer：分別解小問題。
Combine：把小問題的答案合併成原問題答案。
```

Merge sort 就是典型例子：

1. 把陣列切成左右兩半。
2. 遞迴排序左半與右半。
3. 合併兩個已排序的陣列。

因為每一層合併總共花 $O(N)$，而層數約為 $O(\log N)$，所以總複雜度是 $O(N \log N)$。

## 示範題：[ZeroJudge a104 排序](https://zerojudge.tw/ShowProblem?problemid=a104)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: merge sort、divide and conquer、排序

### 題目重點

本題有多筆測資，以 EOF 結束。每筆測資給定 $n$ 個正整數，將它們由小到大排序後輸出，數字之間以空白隔開。

### 提示 1

實戰可以直接使用 `sort`，但本課用 merge sort 觀察分治流程。

### 提示 2

若左半與右半都已經排序，就可以用兩個指標把它們合併。

### 解題想法

使用 `mergeSort(l, r)` 排序半開區間 $[l, r)$。

- 若區間長度小於等於 $1$，不用排序。
- 否則切成 $[l, mid)$ 與 $[mid, r)$。
- 遞迴排序兩半。
- 合併兩個已排序區間。

合併時，每次取左右兩邊目前較小的元素放進暫存陣列。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<long long> a;
vector<long long> tempArray;

void mergeSort(int left, int right) {
    if (right - left <= 1) {
        return;
    }

    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid, right);

    int i = left;
    int j = mid;
    int k = left;

    while (i < mid && j < right) {
        if (a[i] <= a[j]) {
            tempArray[k] = a[i];
            i++;
        } else {
            tempArray[k] = a[j];
            j++;
        }
        k++;
    }

    while (i < mid) {
        tempArray[k] = a[i];
        i++;
        k++;
    }

    while (j < right) {
        tempArray[k] = a[j];
        j++;
        k++;
    }

    for (int t = left; t < right; t++) {
        a[t] = tempArray[t];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;

    while (cin >> n) {
        a.resize(n);
        tempArray.resize(n);

        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        mergeSort(0, n);

        for (int i = 0; i < n; i++) {
            if (i > 0) cout << ' ';
            cout << a[i];
        }
        cout << '\n';
    }
}
```

## 用 merge sort 計算 inversion count

L5 與本課前面都看過用雙層迴圈計算 inversion count：

```cpp
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (a[i] > a[j]) {
            ans++;
        }
    }
}
```

這是 $O(N^2)$。若 $N$ 很大，就需要更快的做法。

在 merge sort 合併左右兩半時，左右兩半都已經排序。若合併時發現：

```text
a[i] > a[j]
```

其中 `i` 在左半、`j` 在右半，因為左半已排序，所以從 `i` 到 `mid - 1` 的所有元素都會大於 `a[j]`。一次可以加上：

```text
mid - i
```

這樣就能在排序過程中順便計算 inversion count。

## 示範題：[ZeroJudge d542 10810 - Ultra-QuickSort](https://zerojudge.tw/ShowProblem?problemid=d542)

- Difficulty: <span class="difficulty challenge">challenge</span>
- Topic: merge sort、inversion count、divide and conquer

### 題目重點

本題有多筆測資，以 $n = 0$ 結束。每筆測資給定 $n$ 個整數（$n < 500000$），求只能交換相鄰兩數時，至少要交換幾次才能由小到大排序。

和 a539 相同，答案就是 inversion count，也就是有幾組 $i < j$ 滿足 $a_i > a_j$。

### 提示 1

本題 $n$ 可能接近 $5 \times 10^5$，雙層迴圈是 $O(N^2)$，會太慢。

### 提示 2

在 merge sort 合併時，可以統計跨越左右兩半的 inversion。

### 解題想法

Inversion 可以分成三類：

1. 兩個元素都在左半。
2. 兩個元素都在右半。
3. 一個在左半，一個在右半。

前兩類交給遞迴處理。第三類在合併兩個已排序區間時處理。

若 `a[i] <= a[j]`，表示左邊目前元素不會和 `a[j]` 形成 inversion，先放 `a[i]`。

若 `a[i] > a[j]`，因為左半已排序，`a[i]` 到 `a[mid - 1]` 都大於 `a[j]`，所以一次增加 `mid - i`。

答案最大約為 $\dfrac{n(n-1)}{2} \approx 1.25 \times 10^{11}$，超過 `int` 範圍，必須使用 `long long`。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<long long> a;
vector<long long> tempArray;

long long mergeSort(int left, int right) {
    if (right - left <= 1) {
        return 0;
    }

    int mid = (left + right) / 2;
    long long inversions = 0;
    inversions += mergeSort(left, mid);
    inversions += mergeSort(mid, right);

    int i = left;
    int j = mid;
    int k = left;

    while (i < mid && j < right) {
        if (a[i] <= a[j]) {
            tempArray[k] = a[i];
            i++;
        } else {
            tempArray[k] = a[j];
            inversions += mid - i;
            j++;
        }
        k++;
    }

    while (i < mid) {
        tempArray[k] = a[i];
        i++;
        k++;
    }

    while (j < right) {
        tempArray[k] = a[j];
        j++;
        k++;
    }

    for (int t = left; t < right; t++) {
        a[t] = tempArray[t];
    }

    return inversions;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;

    while (cin >> n && n != 0) {
        a.resize(n);
        tempArray.resize(n);

        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }

        cout << mergeSort(0, n) << '\n';
    }
}
```

## 實戰中怎麼選

一般競賽中：

- 需要排序資料：優先使用 `sort`。
- 題目要求模擬排序過程：依題意寫 bubble sort、selection sort 或 insertion sort。
- 題目要求 inversion count 且 $N$ 很大：使用 merge sort 或其他進階資料結構。
- 題目想考 divide and conquer：觀察是否能切成左右兩半，各自解決後合併。

不要為了練習而在正式解題中硬寫自己的排序。`sort` 通常更快、更短，也比較不容易寫錯。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l9-c1" href="https://zerojudge.tw/ShowProblem?problemid=a225" title="ZeroJudge a225 明明愛排列" difficulty="basic" topic="merge sort、自訂比較條件" />
  <Problem id="l9-c2" href="https://zerojudge.tw/ShowProblem?problemid=a539" title="ZeroJudge a539 Flip Sort" difficulty="standard" topic="inversion count、相鄰交換" />
  <Problem id="l9-c3" href="https://atcoder.jp/contests/abc190/tasks/abc190_f" title="AtCoder ABC190F Shift and Inversions" difficulty="challenge" topic="merge sort、inversion count、觀察變化量" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l9-h1" href="https://cses.fi/problemset/task/1074/" title="CSES Stick Lengths" difficulty="basic" topic="排序、中位數、最小總距離" />
  <Problem id="l9-h2" href="https://atcoder.jp/contests/abc094/tasks/arc095_a" title="AtCoder ABC094C Many Medians" difficulty="standard" topic="排序、中位數、位置判斷" />
  <Problem id="l9-h3" href="https://atcoder.jp/contests/abc143/tasks/abc143_d" title="AtCoder ABC143D Triangles" difficulty="standard" topic="排序、upper_bound、計數" />
  <Problem id="l9-h4" href="https://cses.fi/problemset/task/1084/" title="CSES Apartments" difficulty="standard" topic="排序、雙指標" />
  <Problem id="l9-h5" href="https://cses.fi/problemset/task/1620/" title="CSES Factory Machines" difficulty="challenge" topic="二分答案、排序與搜尋" />
  <Problem id="l9-h6" href="https://cses.fi/problemset/task/2168/" title="CSES Nested Ranges Check" difficulty="challenge" topic="排序、區間、掃描" />
</ul>

## 常見錯誤

- 把 $O(N^2)$ 排序用在 $N = 10^5$ 的資料上。
- 以為會用 `sort` 就不需要理解排序成本。
- 寫 merge sort 時區間邊界混淆，尤其是 $[l, r)$ 和 $[l, r]$ 混用。
- 合併後忘記把暫存陣列複製回原陣列。
- 計算 inversion count 時忘記使用 `long long`。
- 遇到相等元素時把 `a[i] == a[j]` 算成 inversion；inversion 需要嚴格大於。
- divide and conquer 只切開問題，卻沒有想清楚如何合併答案。
