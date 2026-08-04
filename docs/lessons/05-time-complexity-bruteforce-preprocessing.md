# Lesson 5：時間複雜度、暴力解與預處理

## 本課目標

完成後應具備以下能力：

- 從題目限制估算一個做法大約會執行幾次操作。
- 理解 $O(N)$、$O(N^2)$、$O(N^3)$、$O(N \log N)$ 的基本直覺。
- 判斷暴力枚舉在目前限制下是否可行。
- 使用 prefix sum 快速回答多次區間和查詢。
- 使用差分陣列處理多次區間加值。
- 理解「先整理資料」可以把每次重複計算的成本降下來。

## 為什麼要估算時間

寫 online judge 題目時，程式不只要答案正確，也要在時間限制內完成。若題目給 $N = 100$，雙層迴圈通常沒有問題；若題目給 $N = 2 \times 10^5$，雙層迴圈檢查所有 pair 通常就太慢。

競賽中常用時間複雜度描述做法會隨著輸入大小變大而增加多少工作量。這不是精確秒數，而是用來判斷做法是否合理的工具。

常見估算如下：

| 做法型態 | 常見複雜度 | $N = 10^5$ 時大約操作量 |
| -------- | ---------- | ------------------------ |
| 單層迴圈 | $O(N)$ | $10^5$ |
| 雙層迴圈 | $O(N^2)$ | $10^{10}$ |
| 三層迴圈 | $O(N^3)$ | $10^{15}$ |
| 排序 | $O(N \log N)$ | 約數百萬次等級 |

一般可以先用 $10^8$ 次左右作為粗略分界。這不是絕對規則，因為實際速度會受語言、常數、資料結構與 judge 機器影響；但對初學階段判斷方向已經很有幫助。

## 暴力解不是錯

暴力解指的是直接枚舉所有可能狀況。若限制小，暴力解通常最直覺、也最不容易寫錯。

例如枚舉所有 pair：

```cpp
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        // 檢查 a[i] 和 a[j]
    }
}
```

這段程式大約檢查 $\frac{N(N - 1)}{2}$ 組 pair，複雜度是 $O(N^2)$。

如果 $N \le 100$，大約只有 $4950$ 組 pair，可以接受。若 $N = 2 \times 10^5$，pair 數量約為 $2 \times 10^{10}$，通常不可行。

枚舉 triple 則是三層迴圈：

```cpp
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        for (int k = j + 1; k < n; k++) {
            // 檢查 a[i], a[j], a[k]
        }
    }
}
```

這是 $O(N^3)$。只有在 $N$ 很小時才適合直接使用。

## 示範題：[AtCoder ABC085C Otoshidama](https://atcoder.jp/contests/abc085/tasks/abc085_c)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 暴力枚舉、限制估算、雙層迴圈

### 題目重點

有 $N$ 張鈔票，總金額是 $Y$。鈔票面額可能是 $10000$、$5000$ 或 $1000$。請找出一組可能的張數。

### 提示 1

如果知道 $10000$ 元鈔票有 $i$ 張、$5000$ 元鈔票有 $j$ 張，$1000$ 元鈔票張數就可以由總張數推出。

### 提示 2

題目限制 $N \le 2000$。枚舉兩種鈔票張數大約是 $N^2$，可以接受；枚舉三種張數大約是 $N^3$，太大。

### 解題想法

直接枚舉三種鈔票張數需要三層迴圈：

```text
i: 10000 元張數
j: 5000 元張數
k: 1000 元張數
```

但三種張數必須加起來等於 $N$。因此只要枚舉 $i$ 和 $j$，就可以算出：

$$
k = N - i - j
$$

若 $k < 0$，代表張數不合法。否則檢查總金額是否等於 $Y$。這樣就能把 $O(N^3)$ 降成 $O(N^2)$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, y;
    cin >> n >> y;

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= n; j++) {
            int k = n - i - j;
            if (k < 0) {
                continue;
            }

            int total = 10000 * i + 5000 * j + 1000 * k;
            if (total == y) {
                cout << i << ' ' << j << ' ' << k << '\n';
                return 0;
            }
        }
    }

    cout << "-1 -1 -1\n";
}
```

## 多次查詢不能每次重算

有些題目會給一個陣列，接著問很多次區間總和。例如：

```text
a = [3, 1, 4, 1, 5]
query: 2 到 4 的總和
```

如果每個 query 都用迴圈重新加一次，單次查詢可能需要 $O(N)$，$Q$ 次查詢就是 $O(NQ)$。

當 $N$ 和 $Q$ 都很大時，這樣會太慢。這時可以先建立 prefix sum。

## prefix sum

prefix sum 的想法是先把「前面累積多少」存起來。

本教材使用 $1$-based prefix sum：

```cpp
vector<long long> prefix(n + 1, 0);
for (int i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + a[i];
}
```

其中 `prefix[i]` 表示前 $i$ 個元素的總和。

若要查詢 $[L, R]$ 的總和，可以用：

```cpp
prefix[R] - prefix[L - 1]
```

因為 `prefix[R]` 包含第 $1$ 個到第 $R$ 個元素，扣掉 `prefix[L - 1]` 後，就只剩第 $L$ 個到第 $R$ 個元素。

## 示範題：[CSES Static Range Sum Queries](https://cses.fi/problemset/task/1646/)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: prefix sum、區間和、多筆查詢

### 題目重點

給定一個長度為 $N$ 的陣列，接著有 $Q$ 筆查詢。每次查詢給 $A$、$B$，要求第 $A$ 個到第 $B$ 個元素的總和。

### 提示 1

如果每次查詢都重新跑迴圈加總，總複雜度是 $O(NQ)$。

### 提示 2

先建立 prefix sum 後，每次查詢可以用一次減法得到答案。

### 解題想法

題目中 $N$ 和 $Q$ 都可能很大。若每次查詢都重新加總，在最壞情況下會做太多次操作。

先建立 `prefix`：

- `prefix[0] = 0`
- `prefix[i]` 表示前 $i$ 個數字的總和

對於查詢 $[a, b]$，答案就是：

$$
prefix[b] - prefix[a - 1]
$$

建立 prefix sum 需要 $O(N)$，每筆查詢是 $O(1)$，總複雜度是 $O(N + Q)$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }

    vector<long long> prefix(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + a[i];
    }

    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        cout << prefix[r] - prefix[l - 1] << '\n';
    }
}
```

## 差分陣列

prefix sum 適合處理很多次區間查詢。若題目是很多次區間更新，例如「把 $[L, R]$ 全部加 $1$」，每次逐格加也可能太慢。

差分陣列的想法是：不要直接更新每個位置，而是記錄「從哪裡開始增加」與「從哪裡結束增加」。

若要讓 $[L, R]$ 每個位置都加 $1$，可以寫：

```cpp
diff[L] += 1;
diff[R + 1] -= 1;
```

最後再從左到右累加 `diff`，就能得到每個位置真正被加了多少次。

例如對 $[2, 4]$ 加 $1$：

```text
位置：    1  2  3  4  5
diff：   0 +1  0  0 -1
累加後： 0  1  1  1  0
```

第 $2$ 到第 $4$ 個位置都變成 $1$，其他位置仍是 $0$。

## 示範題：[AtCoder ABC014C AtColor](https://atcoder.jp/contests/abc014/tasks/abc014_3)

- Difficulty: <span class="difficulty challenge">challenge</span>
- Topic: 差分、區間加值、最大重疊數

### 題目重點

有 $N$ 個區間 $[a_i, b_i]$。每個區間代表某些數字被塗色一次。請問最多有哪個位置被塗色幾次。

### 提示 1

如果對每個區間都逐格加 $1$，當區間很長、區間數很多時會太慢。

### 提示 2

對區間 $[a, b]$ 加 $1$，可以改成 `diff[a]++` 與 `diff[b + 1]--`。

### 解題想法

本題要知道每個位置被幾個區間覆蓋。若直接對每個區間內的所有位置加 $1$，最壞情況會重複更新大量位置。

使用差分陣列後，每個區間只做兩次修改：

- 在起點 `a` 加 $1$。
- 在終點後一格 `b + 1` 減 $1$。

所有區間處理完後，從左到右累加 `diff`。目前累加值就是該位置被覆蓋的次數。過程中記錄最大值即可。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    const int MX = 1000000 + 5;
    vector<int> diff(MX + 1, 0);

    for (int i = 0; i < n; i++) {
        int a, b;
        cin >> a >> b;
        diff[a]++;
        diff[b + 1]--;
    }

    int current = 0;
    int ans = 0;
    for (int i = 0; i <= MX; i++) {
        current += diff[i];
        ans = max(ans, current);
    }

    cout << ans << '\n';
}
```

## 怎麼選做法

看到題目時，可以照以下順序判斷：

1. 先看限制中的 $N$、$Q$ 或數值範圍。
2. 寫出最直覺的暴力做法，估算複雜度。
3. 若暴力可行，直接使用簡單做法。
4. 若暴力不可行，找出重複計算的部分。
5. 思考是否能先整理資料，例如排序、計數陣列、prefix sum 或差分。

不同工具適合不同問題：

| 問題型態 | 常見工具 |
| -------- | -------- |
| 找最大、最小、總和 | 單層迴圈 |
| 枚舉 pair / triple | 巢狀迴圈 |
| 整理大小順序或相同值 | `sort` |
| 數值範圍小、要統計出現次數 | 計數陣列 |
| 多次區間和查詢 | prefix sum |
| 多次區間加值 | 差分陣列 |

本課先建立判斷方式。之後的課程會更完整地練習 prefix sum、binary search、greedy 等工具。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l5-c1" href="https://zerojudge.tw/ShowProblem?problemid=a059" title="ZeroJudge a059 完全平方和" difficulty="basic" topic="窮舉、範圍估算" />
  <Problem id="l5-c2" href="https://atcoder.jp/contests/abc087/tasks/abc087_b" title="AtCoder ABC087B Coins" difficulty="standard" topic="三層枚舉、小上限" />
  <Problem id="l5-c3" href="https://atcoder.jp/contests/abc122/tasks/abc122_c" title="AtCoder ABC122C GeT AC" difficulty="standard" topic="字串、prefix sum、區間查詢" />
  <Problem id="l5-c4" href="https://zerojudge.tw/ShowProblem?problemid=e340" title="ZeroJudge e340 差分練習" difficulty="standard" topic="差分定義、前後相減" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l5-h1" href="https://www.luogu.com.cn/problem/P1428" title="洛谷 P1428 小魚比可愛" difficulty="basic" topic="前面元素枚舉、雙層迴圈" />
  <Problem id="l5-h2" href="https://atcoder.jp/contests/abc105/tasks/abc105_b" title="AtCoder ABC105B Cakes and Donuts" difficulty="basic" topic="小範圍枚舉、可行性判斷" />
  <Problem id="l5-h3" href="https://atcoder.jp/contests/abc175/tasks/abc175_b" title="AtCoder ABC175B Making Triangle" difficulty="standard" topic="triple 枚舉、三角形判斷" />
  <Problem id="l5-h4" href="https://atcoder.jp/contests/abc200/tasks/abc200_c" title="AtCoder ABC200C Ringo's Favorite Numbers 2" difficulty="standard" topic="pair 計數、餘數、計數陣列" />
  <Problem id="l5-h5" href="https://tioj.ck.tp.edu.tw/problems/1010" title="TIOJ 1010 Prefix and Postfix" difficulty="challenge" topic="字串比對、暴力枚舉、複雜度估算" />
  <Problem id="l5-h6" href="https://atcoder.jp/contests/abc014/tasks/abc014_3" title="AtCoder ABC014C AtColor" difficulty="challenge" topic="差分、區間加值、最大重疊數" />
</ul>

## 常見錯誤

- 只看程式能不能寫出來，沒有看 $N$ 的大小：暴力解是否可行取決於限制。
- 把 $O(N^2)$ 當成永遠很慢：若 $N \le 100$，雙層迴圈通常可以接受。
- 把 $O(N^2)$ 用在 $N = 2 \times 10^5$：pair 數量太大，通常會超時。
- prefix sum 的 index 混淆：若使用 $1$-based 寫法，區間 $[L, R]$ 是 `prefix[R] - prefix[L - 1]`。
- prefix sum 忘記使用 `long long`：很多數字相加後可能超過 `int`。
- 差分忘記在 `R + 1` 減回來：只在 `L` 加會讓後面所有位置都被影響。
- 差分陣列開太小：若會使用 `b + 1`，陣列大小要多留一格。
