# Lesson 4：字串、字元與函式

## 本課目標

完成後應具備以下能力：

- 使用 `string` 儲存一段文字。
- 使用 `s[i]` 取得字串中的單一字元。
- 使用 `s.size()` 取得字串長度。
- 逐字元走訪字串，進行統計、替換與格式檢查。
- 使用 `char` 處理單一字元。
- 撰寫簡單 function，把重複使用的判斷或計算拆出來。

## 字串與字元

在 C++ 中，`string` 用來儲存一段文字，`char` 用來儲存單一字元。

```cpp
string s = "abcde";
char c = s[0]; // 'a'
```

字串的 index 也是從 $0$ 開始。如果 `s = "abcde"`，則：

| 表達式 | 值    |
| ------ | ----- |
| `s[0]` | `'a'` |
| `s[1]` | `'b'` |
| `s[4]` | `'e'` |

`s.size()` 可以取得字串長度：

```cpp
string s;
cin >> s;

int n = s.size();
cout << n << '\n';
```

如果字串長度是 $n$，合法 index 是 $0$ 到 $n - 1$。不能使用 `s[n]` 取得最後一個字元。

## 逐字元走訪字串

字串可以像陣列一樣用 `for` 迴圈走訪：

```cpp
string s;
cin >> s;

for (int i = 0; i < (int)s.size(); i++) {
    cout << s[i] << '\n';
}
```

本教材前期會常寫 `(int)s.size()`，把長度轉成 `int`，讓它可以和 `int i` 直接比較。

也可以用 range-based for 走訪每個字元：

```cpp
for (char c : s) {
    cout << c << '\n';
}
```

如果只是讀取每個字元，兩種寫法都可以。若需要知道目前 index，使用 `for (int i = 0; i < (int)s.size(); i++)` 較方便。

## 字元比較與替換

`char` 可以直接比較：

```cpp
char c = '7';

if ('0' <= c && c <= '9') {
    cout << "digit\n";
}
```

常見判斷：

```cpp
if ('a' <= c && c <= 'z') {
    cout << "lowercase letter\n";
}

if ('A' <= c && c <= 'Z') {
    cout << "uppercase letter\n";
}
```

若字元是數字字元，可以轉成整數：

```cpp
char c = '7';
int x = c - '0'; // 7
```

字串中的字元也可以直接修改：

```cpp
string s = "1,2,3";
for (int i = 0; i < (int)s.size(); i++) {
    if (s[i] == ',') {
        s[i] = ' ';
    }
}
```

## 示範題：[AtCoder ABC051A Haiku](https://atcoder.jp/contests/abc051/tasks/abc051_a)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: 字串、字元替換、走訪

### 題目重點

讀入一個格式為 `A,B,C` 的字串，將逗號 `,` 改成空白後輸出。

### 提示 1

可以逐字元檢查 `s[i]` 是否等於 `','`。

### 提示 2

字串中的字元可以直接改成其他字元。

### 解題想法

讀入整個字串後，從左到右檢查每個位置。如果該位置是逗號，就改成空白。最後輸出修改後的字串。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;

    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] == ',') {
            s[i] = ' ';
        }
    }

    cout << s << '\n';
}
```

## 字串格式檢查

有些題目要求判斷字串是否符合某種格式。例如：

- 某些位置必須是 `-`。
- 某些位置必須是數字。
- 字串前後必須滿足指定關係。

這類題目通常可以依序檢查每個位置。若發現不符合條件，就把答案標記成 `false`。

```cpp
bool ok = true;

for (int i = 0; i < (int)s.size(); i++) {
    if (!('0' <= s[i] && s[i] <= '9')) {
        ok = false;
    }
}

if (ok) cout << "Yes\n";
else cout << "No\n";
```

`bool` 是布林型別，值只有 `true` 與 `false`。常用來記錄某個條件目前是否成立。

## 函式的基本寫法

當一段邏輯會重複使用，或主程式變得太長時，可以拆成 function。

例如判斷一個字元是否為數字：

```cpp
bool isDigit(char c) {
    return '0' <= c && c <= '9';
}
```

使用方式：

```cpp
char c;
cin >> c;

if (isDigit(c)) {
    cout << "digit\n";
}
```

Function 的基本格式是：

```cpp
回傳型別 函式名稱(參數) {
    // 計算過程
    return 回傳值;
}
```

常見回傳型別：

| 回傳型別 | 用途             |
| -------- | ---------------- |
| `int`    | 回傳整數答案     |
| `long long` | 回傳較大的整數 |
| `bool`   | 回傳是或否       |
| `string` | 回傳字串         |
| `void`   | 不回傳值         |

## 回文判斷

如果一個字串從左到右和從右到左讀起來相同，就稱為 palindrome，例如 `level`、`aba`。

判斷回文時，可以比較對稱位置：

```cpp
bool isPalindrome(string s) {
    int n = s.size();
    for (int i = 0; i < n; i++) {
        if (s[i] != s[n - 1 - i]) {
            return false;
        }
    }
    return true;
}
```

若任何一組對稱位置不同，就不是回文，可以直接 `return false`。如果迴圈檢查完都沒有失敗，就回傳 `true`。

## 示範題：[AtCoder ABC159B String Palindrome](https://atcoder.jp/contests/abc159/tasks/abc159_b)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 字串、回文、函式

### 題目重點

給定一個字串 $S$。需要同時滿足以下三個條件：

- $S$ 本身是 palindrome。
- $S$ 的前半段是 palindrome。
- $S$ 的後半段是 palindrome。

若三個條件都成立，輸出 `Yes`，否則輸出 `No`。

### 提示 1

先寫一個 `isPalindrome` function，判斷一個字串是否為 palindrome。

### 提示 2

可以用迴圈建立前半段與後半段字串。

### 解題想法

題目需要做三次 palindrome 判斷。若每次都把判斷邏輯寫在 `main` 裡，程式會重複且容易出錯。

先寫 `isPalindrome(string s)`，再建立三個字串：

- `s`：原字串。
- `first`：前半段。
- `second`：後半段。

最後檢查三個字串是否都為 palindrome。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    int n = s.size();
    for (int i = 0; i < n; i++) {
        if (s[i] != s[n - 1 - i]) {
            return false;
        }
    }
    return true;
}

int main() {
    string s;
    cin >> s;

    int n = s.size();
    string first = "";
    string second = "";

    for (int i = 0; i < (n - 1) / 2; i++) {
        first += s[i];
    }

    for (int i = (n + 3) / 2 - 1; i < n; i++) {
        second += s[i];
    }

    if (isPalindrome(s) && isPalindrome(first) && isPalindrome(second)) {
        cout << "Yes\n";
    } else {
        cout << "No\n";
    }
}
```

## 數字字元與 digit sum

有些題目會要求計算一個整數的各位數總和。若把數字當成字串讀入，就可以逐字元處理。

例如 `s = "1234"`：

```cpp
int sum = 0;
for (char c : s) {
    sum += c - '0';
}
```

這段程式會得到 $1 + 2 + 3 + 4 = 10$。

如果 digit sum 會重複使用，可以寫成 function：

```cpp
int digitSum(int x) {
    int sum = 0;
    while (x > 0) {
        sum += x % 10;
        x /= 10;
    }
    return sum;
}
```

這個版本使用整數運算，不需要把數字轉成字串。兩種寫法都常見；本課重點是知道可以把「計算各位數總和」包成 function。

## 示範題：[AtCoder ABC083B Some Sums](https://atcoder.jp/contests/abc083/tasks/abc083_b)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: 函式、digit sum、迴圈

### 題目重點

給定 $N$、$A$、$B$。考慮 $1$ 到 $N$ 的所有整數，若某個數字的各位數總和介於 $A$ 到 $B$ 之間，就把它加入答案。求最後總和。

### 提示 1

先寫一個 function，計算整數的各位數總和。

### 提示 2

枚舉 $1$ 到 $N$，對每個數字計算 digit sum。

### 解題想法

本題的主要邏輯是「計算各位數總和」與「判斷是否落在範圍內」。其中計算 digit sum 會對很多數字重複使用，適合拆成 function。

`digitSum(x)` 回傳 $x$ 的各位數總和。主程式枚舉 $1$ 到 $N$，若 `digitSum(i)` 在 $A$ 到 $B$ 之間，就把 $i$ 加到答案。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int digitSum(int x) {
    int sum = 0;
    while (x > 0) {
        sum += x % 10;
        x /= 10;
    }
    return sum;
}

int main() {
    int n, a, b;
    cin >> n >> a >> b;

    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int s = digitSum(i);
        if (a <= s && s <= b) {
            ans += i;
        }
    }

    cout << ans << '\n';
}
```

## 什麼時候該寫 function

初學階段不需要把所有程式都拆成很多 function。以下情況適合寫 function：

- 同一段邏輯會使用兩次以上。
- `main` 裡的程式變得太長，且某段邏輯有明確名稱。
- 題目本身有清楚的子問題，例如 `isPalindrome`、`digitSum`、`isPrime`。

以下情況通常不需要硬拆：

- 只用一次、而且只有一兩行的簡單運算。
- 拆出來後名稱反而不清楚。
- 為了拆 function 而讓資料傳來傳去，程式變得更難讀。

本課目標是能寫出簡單 function，並在重複邏輯出現時自然使用。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l4-c1" href="https://atcoder.jp/contests/abc072/tasks/abc072_b" title="AtCoder ABC072B OddString" difficulty="basic" topic="字串走訪、index 奇偶" />
  <Problem id="l4-c2" href="https://atcoder.jp/contests/abc111/tasks/abc111_a" title="AtCoder ABC111A AtCoder Beginner Contest" difficulty="basic" topic="字元替換、字串走訪" />
  <Problem id="l4-c3" href="https://atcoder.jp/contests/abc084/tasks/abc084_b" title="AtCoder ABC084B Postal Code" difficulty="standard" topic="格式檢查、數字字元、bool" />
  <Problem id="l4-c4" href="https://atcoder.jp/contests/abc122/tasks/abc122_b" title="AtCoder ABC122B ATCoder" difficulty="standard" topic="字串走訪、連續區間、字元判斷" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l4-h1" href="https://atcoder.jp/contests/abc069/tasks/abc069_b" title="AtCoder ABC069B i18n" difficulty="basic" topic="字串長度、首尾字元" />
  <Problem id="l4-h2" href="https://atcoder.jp/contests/abc060/tasks/abc060_a" title="AtCoder ABC060A Shiritori" difficulty="basic" topic="字串首尾、條件判斷" />
  <Problem id="l4-h3" href="https://atcoder.jp/contests/abc109/tasks/abc109_b" title="AtCoder ABC109B Shiritori" difficulty="standard" topic="字串比較、重複檢查、vector" />
  <Problem id="l4-h4" href="https://atcoder.jp/contests/abc049/tasks/arc065_a" title="AtCoder ABC049C Daydream" difficulty="challenge" topic="字串比對、反向處理" />
  <Problem id="l4-h5" href="https://cses.fi/problemset/task/1755/" title="CSES Palindrome Reorder" difficulty="challenge" topic="字元計數、palindrome、字串建構" />
</ul>

## 常見錯誤

- 使用 `s[s.size()]`：最後一個字元是 `s[s.size() - 1]`，不是 `s[s.size()]`。
- 把字元和字串混淆：`'a'` 是 `char`，`"a"` 是 `string`。
- 忘記數字字元要轉換：`'7' - '0'` 才是整數 $7$。
- Function 忘記 `return`：非 `void` function 必須回傳對應型別的值。
- 把 function 寫在 `main` 裡面：C++ 的一般 function 應寫在 `main` 外面。
- 回文判斷 index 寫錯：對稱位置是 `i` 與 `n - 1 - i`。
