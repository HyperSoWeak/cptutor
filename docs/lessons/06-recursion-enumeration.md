# Lesson 6：遞迴入門與枚舉

## 本課目標

完成後應具備以下能力：

- 理解 function 可以呼叫其他 function，也可以呼叫自己。
- 分辨遞迴中的 base case 與 recursive case。
- 用遞迴計算簡單數值，例如 GCD。
- 用遞迴產生所有可能的字串。
- 用「選或不選」枚舉子集合。
- 從 $N$ 的大小判斷遞迴枚舉是否可行。

## 為什麼需要遞迴

L5 已經學過暴力枚舉。當可能性可以用幾層固定迴圈表示時，直接寫 `for` 迴圈通常很清楚。例如枚舉兩個位置可以用雙層迴圈，枚舉三個位置可以用三層迴圈。

可是有些題目會問：

- 長度為 $N$ 的所有字串。
- $N$ 個物品中，每個物品選或不選。
- 一個問題可以拆成更小的同類問題。

這時 `for` 迴圈的層數會跟 $N$ 有關。若 $N$ 是輸入才知道，就不能事先寫好固定層數。遞迴可以把「目前這一步」寫出來，剩下的部分交給下一次 function call。

遞迴常見的思考方式是：

```text
先處理目前這一步，剩下的問題和原本很像，只是規模更小。
```

## Function call 與遞迴

一般 function 可以被 `main` 呼叫：

```cpp
int square(int x) {
    return x * x;
}

int main() {
    cout << square(5) << '\n';
}
```

遞迴 function 則是在 function 裡面呼叫自己：

```cpp
void countdown(int x) {
    if (x == 0) {
        return;
    }

    cout << x << '\n';
    countdown(x - 1);
}
```

呼叫 `countdown(3)` 時，過程會像這樣：

```text
countdown(3)
  印出 3，呼叫 countdown(2)
countdown(2)
  印出 2，呼叫 countdown(1)
countdown(1)
  印出 1，呼叫 countdown(0)
countdown(0)
  return
```

每一次呼叫都處理比較小的問題。最後必須停在某個條件，否則 function 會一直呼叫自己。

## Base case 與 recursive case

寫遞迴時，最重要的是兩個部分：

- Base case：不用再呼叫自己的停止條件。
- Recursive case：把問題拆小後，再呼叫自己。

例如計算 $1 + 2 + \cdots + n$：

```cpp
int sumTo(int n) {
    if (n == 0) {
        return 0;
    }

    return sumTo(n - 1) + n;
}
```

這裡的 base case 是 `n == 0`。recursive case 是先求 `sumTo(n - 1)`，再加上目前的 `n`。

若沒有 base case，遞迴不會停止。若 recursive case 沒有讓問題變小，也可能不會到達 base case。

## 示範題：[ZeroJudge a024 最大公因數(GCD)](https://zerojudge.tw/ShowProblem?problemid=a024)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: 遞迴、GCD、base case

### 題目重點

給定兩個正整數，求它們的最大公因數。

### 提示 1

若 $b = 0$，則 $\gcd(a, b) = a$。

### 提示 2

若 $b \ne 0$，可以使用輾轉相除法：

$$
\gcd(a, b) = \gcd(b, a \bmod b)
$$

### 解題想法

GCD 的遞迴寫法很適合用來觀察 base case 與 recursive case。

- Base case：`b == 0` 時，答案是 `a`。
- Recursive case：否則把問題改成 `gcd(b, a % b)`。

每次遞迴後，第二個數會變小，最後會變成 $0$，因此遞迴會停止。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

long long gcdRecursive(long long a, long long b) {
    if (b == 0) {
        return a;
    }

    return gcdRecursive(b, a % b);
}

int main() {
    long long a, b;
    cin >> a >> b;

    cout << gcdRecursive(a, b) << '\n';
}
```

## 遞迴產生所有字串

如果要產生長度為 $N$、每個位置都可以是 `a`、`b`、`c` 的所有字串，可以把問題看成：

```text
目前位置要放哪個字元？
剩下位置交給遞迴處理。
```

例如 $N = 2$ 時：

```text
第一個位置放 a：aa, ab, ac
第一個位置放 b：ba, bb, bc
第一個位置放 c：ca, cb, cc
```

這是一棵枚舉樹。每一層決定一個位置，每個位置有 $3$ 種選擇，所以總共有 $3^N$ 個字串。

常見寫法會用一個 `string current` 記錄目前已經決定的字串：

```cpp
void generate(int pos, int n, string current) {
    if (pos == n) {
        cout << current << '\n';
        return;
    }

    generate(pos + 1, n, current + 'a');
    generate(pos + 1, n, current + 'b');
    generate(pos + 1, n, current + 'c');
}
```

`pos` 表示目前要決定第幾個位置。當 `pos == n`，代表長度已經足夠，可以輸出答案。

## 示範題：[AtCoder ABC029C Brute-force Attack](https://atcoder.jp/contests/abc029/tasks/abc029_c)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 遞迴枚舉、字串產生、字典序

### 題目重點

給定 $N$，列出所有長度為 $N$ 的字串，且每個字元只能是 `a`、`b`、`c`。輸出需依字典序排列。

### 提示 1

每個位置都有 $3$ 種選擇。若依序嘗試 `a`、`b`、`c`，輸出就會自然符合字典序。

### 提示 2

當目前字串長度等於 $N$ 時，就可以輸出並停止這條遞迴路徑。

### 解題想法

使用 `dfs(pos, current)` 表示目前已經決定前 `pos` 個字元，字串內容是 `current`。

若 `pos == n`，代表已經產生一個完整字串，直接輸出。

否則依序加入 `a`、`b`、`c`，並遞迴處理下一個位置。因為加入字元的順序是 `a`、`b`、`c`，輸出順序也會是字典序。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;

void dfs(int pos, string current) {
    if (pos == n) {
        cout << current << '\n';
        return;
    }

    dfs(pos + 1, current + 'a');
    dfs(pos + 1, current + 'b');
    dfs(pos + 1, current + 'c');
}

int main() {
    cin >> n;

    dfs(0, "");
}
```

## 選或不選

很多枚舉題可以拆成「每個物品選或不選」。

例如有 $N$ 個物品，第 `idx` 個物品目前正在考慮：

```text
選第 idx 個物品
不選第 idx 個物品
```

每個物品有 $2$ 種選擇，所以總共有 $2^N$ 種可能。當 $N \le 20$ 時，約是一百萬種，通常還可以接受。若 $N = 40$，$2^N$ 就太大，需要其他方法。

基本寫法如下：

```cpp
void dfs(int idx) {
    if (idx == n) {
        // 已經決定所有物品
        return;
    }

    // 不選第 idx 個
    dfs(idx + 1);

    // 選第 idx 個
    dfs(idx + 1);
}
```

實際解題時，通常會把目前累積的資訊放進參數，例如目前總和 `sum`、目前字串 `current`、目前選了哪些物品等。

## 示範題：[CSES Apple Division](https://cses.fi/problemset/task/1623/)

- Difficulty: <span class="difficulty challenge">challenge</span>
- Topic: 遞迴枚舉、子集合、最小差

### 題目重點

有 $N$ 顆蘋果，每顆有重量。要把蘋果分成兩組，使兩組總重量差最小。

### 提示 1

每顆蘋果只需要決定放進第一組或第二組。

### 提示 2

若知道第一組總重量是 `sumA`，全部重量是 `total`，第二組重量就是 `total - sumA`。

### 解題想法

題目限制 $N \le 20$，可以枚舉 $2^N$ 種分組方式。

遞迴 `dfs(idx, sumA)` 表示目前考慮第 `idx` 顆蘋果，第一組目前重量是 `sumA`。

對每顆蘋果有兩個選擇：

- 不放進第一組，`sumA` 不變。
- 放進第一組，`sumA + p[idx]`。

當 `idx == n`，所有蘋果都決定完畢。此時計算：

$$
|sumA - (total - sumA)|
$$

並更新最小值。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int n;
vector<long long> p;
long long total = 0;
long long ans = (1LL << 62);

void dfs(int idx, long long sumA) {
    if (idx == n) {
        long long sumB = total - sumA;
        ans = min(ans, llabs(sumA - sumB));
        return;
    }

    dfs(idx + 1, sumA);
    dfs(idx + 1, sumA + p[idx]);
}

int main() {
    cin >> n;

    p.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i];
        total += p[i];
    }

    dfs(0, 0);

    cout << ans << '\n';
}
```

## 什麼時候適合用遞迴枚舉

遞迴枚舉適合用在「每一步有幾種選擇」的題目。常見關鍵字如下：

| 題型 | 每一步的選擇 | 可能數量 |
| ---- | ------------ | -------- |
| 長度 $N$ 的 binary string | 放 `0` 或 `1` | $2^N$ |
| 長度 $N$ 的 `abc` string | 放 `a`、`b` 或 `c` | $3^N$ |
| 子集合 | 選或不選 | $2^N$ |
| 把物品分兩組 | 放左組或右組 | $2^N$ |

使用前仍要估算複雜度。若可能數量太大，單純枚舉通常不可行。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l6-c1" href="https://zerojudge.tw/ShowProblem?problemid=a034" title="ZeroJudge a034 二進位制轉換" difficulty="basic" topic="遞迴計算、二進位輸出" />
  <Problem id="l6-c2" href="https://www.luogu.com.cn/problem/B3622" title="洛谷 B3622 枚舉子集" difficulty="standard" topic="遞迴枚舉、選或不選" />
  <Problem id="l6-c3" href="https://atcoder.jp/contests/abc029/tasks/abc029_c" title="AtCoder ABC029C Brute-force Attack" difficulty="standard" topic="遞迴枚舉、字串產生" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l6-h1" href="https://zerojudge.tw/ShowProblem?problemid=a024" title="ZeroJudge a024 最大公因數(GCD)" difficulty="basic" topic="遞迴、GCD" />
  <Problem id="l6-h2" href="https://atcoder.jp/contests/abc079/tasks/abc079_c" title="AtCoder ABC079C Train Ticket" difficulty="basic" topic="符號枚舉、遞迴思考" />
  <Problem id="l6-h3" href="https://atcoder.jp/contests/abc045/tasks/arc061_a" title="AtCoder ABC045C Many Formulas" difficulty="standard" topic="切或不切、遞迴枚舉" />
  <Problem id="l6-h4" href="https://atcoder.jp/contests/abc233/tasks/abc233_c" title="AtCoder ABC233C Product" difficulty="standard" topic="多層選擇、遞迴枚舉" />
  <Problem id="l6-h5" href="https://cses.fi/problemset/task/1623/" title="CSES Apple Division" difficulty="challenge" topic="子集合、最小差" />
  <Problem id="l6-h6" href="https://cses.fi/problemset/task/1622/" title="CSES Creating Strings" difficulty="challenge" topic="排列產生、重複字元" />
</ul>

## 常見錯誤

- 忘記 base case：function 會一直呼叫自己，最後造成 runtime error。
- base case 寫太晚：已經超出陣列範圍後才檢查停止條件。
- recursive case 沒有讓問題變小：例如一直呼叫 `dfs(idx)` 而不是 `dfs(idx + 1)`。
- 分不清楚「目前狀態」要放在哪裡：可以先把目前 index、目前總和、目前字串寫成參數。
- 忘記估算可能數量：$2^{20}$ 約一百萬，$2^{40}$ 已經太大。
- 在遞迴中修改全域變數後沒有復原：若使用 `push_back`，離開前通常要 `pop_back`。
