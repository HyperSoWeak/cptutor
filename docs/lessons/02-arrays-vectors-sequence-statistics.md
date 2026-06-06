# Lesson 2：陣列、vector 與序列統計

## 本課目標

完成後應具備以下能力：

- 使用 `int a[100]` 儲存固定上限的整數序列。
- 使用 `vector<int> a(n)` 儲存由輸入決定大小的整數序列。
- 理解 `0`-based indexing 與合法 index 範圍。
- 使用迴圈走訪序列，計算總和、最大值、最小值與符合條件的個數。
- 使用陣列或 `vector` 做簡單計數。
- 判斷什麼時候應使用 `long long` 儲存總和或答案。

## 為什麼需要儲存一串資料

L1 的許多題目可以邊讀邊算，例如讀入一個數後立刻加到總和。可是有些題目需要記住前面讀過的資料，或需要依照編號更新某個位置的值。這時就需要陣列或 `vector`。

例如題目給 $N$ 個城市與 $M$ 條道路，要計算每個城市連到幾條道路。城市 $1$ 的答案、城市 $2$ 的答案、一直到城市 $N$ 的答案都要分開儲存，不能只用一個變數。

## 固定大小陣列

### 宣告與使用

如果題目保證 $N \le 100$，可以先宣告足夠大的陣列：

```cpp
int a[100];
```

這表示有 $100$ 個 `int` 位置可以使用，合法 index 是 `0` 到 `99`。

```cpp
int n;
cin >> n;

int a[100];
for (int i = 0; i < n; i++) {
    cin >> a[i];
}
```

這段程式假設題目保證 $n \le 100$。如果 $n = 5$，實際會使用 `a[0]`、`a[1]`、`a[2]`、`a[3]`、`a[4]`。

競賽中常見的寫法是先把最大大小宣告成常數：

```cpp
const int MN = 2e5 + 5;
int a[MN];
```

`MN` 代表預先開好的最大容量。使用 `const int` 的原因是同一個大小常常會在多個地方重複使用，例如陣列、計數陣列或其他輔助資料。之後如果需要調整上限，只要改一個地方。

`+5` 是為了多開幾格。題目若說 $N \le 2 \times 10^5$，實作時常常會用到 index `n`、`n + 1`，或為了處理 $1$-based indexing 多留空間。多開幾格可以減少邊界出錯的機會。

### 不要寫 int a[n]

在標準 C++ 中，陣列大小必須是 compile-time constant。因此不要寫：

```cpp
int n;
cin >> n;
int a[n]; // 不要這樣寫
```

有些 `g++` 環境會讓這段程式通過編譯，因為它支援 Variable Length Array extension。但這不是標準 C++，不應在 C++17 競賽程式中依賴。

如果大小由輸入的 $n$ 決定，應使用：

```cpp
vector<int> a(n);
```

## 示範題：[AtCoder ABC095B Bitter Alchemy](https://atcoder.jp/contests/abc095/tasks/abc095_b)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: 陣列、總和、最小值

### 題目重點

有 $N$ 種甜甜圈，第 $i$ 種甜甜圈需要 $m_i$ 克材料。現在有 $X$ 克材料，必須每種甜甜圈至少做 $1$ 個，接著用剩下的材料盡量多做甜甜圈。求最多能做幾個。

本題限制 $N \le 100$，適合使用 `int m[100]`。

### 提示 1

先讀入每個 $m_i$，同時計算全部種類各做 $1$ 個需要多少材料。

### 提示 2

剩下的材料應該全部拿去做材料需求最少的甜甜圈。

### 解題想法

因為每種甜甜圈至少要做 $1$ 個，所以基本答案先是 $N$。讀入每個 $m_i$ 時，累加總消耗 `sum`，也記錄最小的材料需求 `mn`。

做完每種各 $1$ 個後，剩下 `X - sum` 克材料。每多做一個最便宜的甜甜圈需要 `mn` 克，所以可以再做 `(X - sum) / mn` 個。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x;
    cin >> n >> x;

    int m[100];
    int sum = 0;
    int mn = 1000000;

    for (int i = 0; i < n; i++) {
        cin >> m[i];
        sum += m[i];
        mn = min(mn, m[i]);
    }

    int ans = n + (x - sum) / mn;
    cout << ans << '\n';
}
```

## vector

### 由輸入決定大小

當 $n$ 是輸入的一部分時，通常使用 `vector<int>`：

```cpp
int n;
cin >> n;

vector<int> a(n);
for (int i = 0; i < n; i++) {
    cin >> a[i];
}
```

`vector<int> a(n)` 會建立 $n$ 個 `int`。合法 index 是 `0` 到 `n - 1`。

使用 `a[i]` 的方式和陣列相同：

```cpp
long long sum = 0;
for (int i = 0; i < n; i++) {
    sum += a[i];
}
```

### 什麼時候使用 vector

如果題目明確說 $N \le 100$，而且只需要固定大小，可以使用 `int a[100]`。如果題目說 $N$ 可達 $2 \times 10^5$，或 $N$ 由輸入決定且不想手動估最大上限，就使用 `vector<int> a(n)`。

本教材會比較推薦競賽中使用 `vector`，但這是寫法習慣，不是唯一標準。若能正確掌握大小與 index，固定大小陣列也可以使用。

### vector 的其他好處

`vector` 和 C++ standard library 搭配時通常更好寫。常見操作如下：

```cpp
sort(a.begin(), a.end());
fill(a.begin(), a.end(), 0);
```

如果使用一般陣列，通常要寫出起點與終點：

```cpp
sort(a, a + n);
fill(a, a + n, 0);
```

兩種寫法都正確，但 `vector` 的範圍比較明確，也比較不容易把 `n` 寫錯。

`vector` 還有幾個實用優點：

- 可以用 `a.size()` 取得目前長度。
- 可以直接建立初始值，例如 `vector<int> cnt(n + 1, 0)`。
- 可以直接複製，例如 `vector<int> b = a`。
- 傳入函式時比較方便，之後可以寫成 `void solve(vector<int> a)` 或 `void solve(const vector<int>& a)`。
- 需要排序、清空、重新填值、建立二維表格時，通常比固定大小陣列直覺。

初學階段先記住：如果題目給的是固定很小的上限，可以用陣列；如果大小跟輸入有關，或後續會搭配 library 操作，優先考慮 `vector`。

## 示範題：[CSES Missing Number](https://cses.fi/problemset/task/1083/)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: vector、標記、index

### 題目重點

給定 $1$ 到 $n$ 之間除了某一個數以外的所有數字，找出缺少的數字。

### 提示 1

可以準備一個 `seen` 陣列，記錄每個數字是否出現過。

### 提示 2

因為數字範圍是 $1$ 到 $n$，可以建立大小為 `n + 1` 的 `vector<int>`，讓 `seen[x]` 直接對應數字 $x$。

### 解題想法

建立 `vector<int> seen(n + 1, 0)`。讀入每個數字 $x$ 後，設定 `seen[x] = 1`。最後從 $1$ 檢查到 $n$，第一個 `seen[i] == 0` 的 $i$ 就是答案。

這題也可以用總和公式解，但本課重點是練習「用 `vector` 記錄每個位置的狀態」。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> seen(n + 1, 0);
    for (int i = 0; i < n - 1; i++) {
        int x;
        cin >> x;
        seen[x] = 1;
    }

    for (int i = 1; i <= n; i++) {
        if (seen[i] == 0) {
            cout << i << '\n';
        }
    }
}
```

## 序列統計的基本模式

### 總和

如果 $N$ 很大，或每個數字可能很大，總和應使用 `long long`：

```cpp
long long sum = 0;
for (int i = 0; i < n; i++) {
    sum += a[i];
}
```

即使 `a[i]` 是 `int`，`sum` 仍可使用 `long long`。

### 最大值與最小值

常見寫法是先用第一個元素初始化：

```cpp
int mx = a[0];
int mn = a[0];

for (int i = 1; i < n; i++) {
    mx = max(mx, a[i]);
    mn = min(mn, a[i]);
}
```

這種寫法要求 $n \ge 1$。若題目保證至少有一個數，就可以使用。

### 符合條件的個數

```cpp
int cnt = 0;
for (int i = 0; i < n; i++) {
    if (a[i] % 2 == 0) {
        cnt++;
    }
}
```

計數題的關鍵是先定義「什麼情況要加 $1$」，再用 `if` 判斷。

## 計數陣列

有些題目不是要記住每個輸入的原始順序，而是要統計每個編號出現幾次。這時可以用計數陣列。

例如有 $N$ 個城市，城市編號是 $1$ 到 $N$。若要統計每個城市連到幾條道路，可以建立：

```cpp
vector<int> degree(n + 1, 0);
```

使用大小 `n + 1` 是為了讓 `degree[1]` 對應城市 $1$，`degree[2]` 對應城市 $2$，不用把城市編號轉成 `0`-based。

## 示範題：[AtCoder ABC061B Counting Roads](https://atcoder.jp/contests/abc061/tasks/abc061_b)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 計數陣列、vector、編號

### 題目重點

有 $N$ 個城市與 $M$ 條雙向道路。每條道路連接城市 $a_i$ 與城市 $b_i$。請輸出每個城市連到幾條道路。

### 提示 1

每讀入一條道路，就會讓兩個城市的答案都增加 $1$。

### 提示 2

城市編號從 $1$ 開始，可以使用 `vector<int> degree(n + 1, 0)`。

### 解題想法

`degree[i]` 表示城市 $i$ 連到幾條道路。讀入一條道路 `(a, b)` 時，因為道路是雙向的，所以城市 $a$ 與城市 $b$ 的道路數都要加 $1$。

最後依序輸出 `degree[1]` 到 `degree[n]`。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;

    vector<int> degree(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        degree[a]++;
        degree[b]++;
    }

    for (int i = 1; i <= n; i++) {
        cout << degree[i] << '\n';
    }
}
```

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l2-c1" href="https://atcoder.jp/contests/abc113/tasks/abc113_b" title="AtCoder ABC113B Palace" difficulty="basic" topic="vector、最小差值、index" />
  <Problem id="l2-c2" href="https://cses.fi/problemset/task/1094/" title="CSES Increasing Array" difficulty="standard" topic="相鄰元素、long long、序列調整" />
  <Problem id="l2-c3" href="https://atcoder.jp/contests/abc064/tasks/abc064_c" title="AtCoder ABC064C Colorful Leaderboard" difficulty="challenge" topic="分類計數、範圍判斷" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l2-h1" href="https://zerojudge.tw/ShowProblem?problemid=f345" title="ZeroJudge f345 新手練習題—陣列" difficulty="basic" topic="陣列、反向輸出、index" />
  <Problem id="l2-h2" href="https://zerojudge.tw/ShowProblem?problemid=c290" title="ZeroJudge c290 APCS 2017-0304-1秘密差" difficulty="basic" topic="字串走訪、位置奇偶、總和" />
  <Problem id="l2-h3" href="https://atcoder.jp/contests/abc121/tasks/abc121_b" title="AtCoder ABC121B Can you solve this?" difficulty="standard" topic="vector、內積、巢狀迴圈" />
  <Problem id="l2-h4" href="https://zerojudge.tw/ShowProblem?problemid=c299" title="ZeroJudge c299 1. 連號或不連號" difficulty="standard" topic="最大值、最小值、連續整數判斷" />
  <Problem id="l2-h5" href="https://zerojudge.tw/ShowProblem?problemid=c295" title="ZeroJudge c295 APCS-2016-1029-2最大和" difficulty="standard" topic="巢狀迴圈、每列最大值、總和" />
  <Problem id="l2-h6" href="https://atcoder.jp/contests/abc072/tasks/arc082_a" title="AtCoder ABC072C Together" difficulty="challenge" topic="計數陣列、相鄰值統計" />
</ul>

## 常見錯誤

- 寫成 `int a[n]`：這不是標準 C++。輸入決定大小時使用 `vector<int> a(n)`。
- index 超出範圍：`int a[100]` 的合法 index 是 `0` 到 `99`，不能使用 `a[100]`。
- `0`-based 與 `1`-based 混淆：輸入編號若從 $1$ 開始，可以使用大小 `n + 1` 的 `vector` 直接對應。
- 忘記初始化計數陣列：`vector<int> cnt(n + 1, 0)` 會把所有值初始化為 $0$。
- 總和溢位：若 $N$ 或數值很大，答案可能超過 `int`，應使用 `long long`。
- 最大值最小值初始值不合理：若題目保證 $n \ge 1$，可用第一個元素初始化 `mx` 與 `mn`。
