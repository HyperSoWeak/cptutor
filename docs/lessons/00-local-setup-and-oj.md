# Lesson 0：C++ 開發環境與 Online Judge 基本流程

## 本課目標

本課建立後續解題會使用的 C++17 開發流程。完成後，應能在本機編譯單一 C++ 檔案，使用測資檔測試程式，並將程式提交至 online judge。

本課完成後應具備以下能力：

- 安裝並檢查 C++ compiler。
- 建立 `main.cpp`。
- 使用 `g++` 編譯 C++17 程式。
- 使用 input file 測試程式。
- 理解 online judge 的標準輸入與標準輸出模型。
- 提交 ZeroJudge 題目並判讀基本結果。

## 開發環境

本教材使用 macOS / Linux-like terminal workflow。Windows 使用者需透過 WSL2 + Ubuntu 取得相同的 Linux-like terminal 環境。

後續指令統一使用 Unix-like shell：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```

## 安裝 C++ compiler

### macOS

macOS 可使用 Xcode Command Line Tools：

```bash
xcode-select --install
```

檢查 compiler：

```bash
g++ --version
```

macOS 上的 `g++` 可能實際指向 `clang++`。對本教材前期題目通常足夠。

若需要安裝 Homebrew GCC：

```bash
brew install gcc
```

Homebrew 的 binary 名稱可能包含版本號，例如 `g++-15`。

### Linux

以下指令以 Ubuntu / Debian 為例：

```bash
sudo apt update
sudo apt install build-essential
```

檢查 compiler：

```bash
g++ --version
```

### Windows WSL2

Windows 使用 WSL2 + Ubuntu。先在 PowerShell 執行：

```powershell
wsl --install
```

安裝完成後重開機，啟動 Ubuntu，建立 Linux 使用者帳號。

進入 Ubuntu terminal 後安裝 compiler：

```bash
sudo apt update
sudo apt install build-essential
```

檢查 compiler：

```bash
g++ --version
```

完成後，後續操作與 Linux 相同。

## 建立第一個 C++ 程式

建立 `main.cpp`：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    cout << "hello, " << s << '\n';

    return 0;
}
```

本教材一開始即使用競賽常見模板：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    return 0;
}
```

`#include <bits/stdc++.h>` 會一次引入競賽常用的 C++ standard library。`ios::sync_with_stdio(false);` 與 `cin.tie(nullptr);` 用於加快 `cin` / `cout` 的速度；目前只需要知道這兩行通常放在 `main` 一開始。

## 編譯與執行

基本編譯指令：

```bash
g++ main.cpp
```

執行產生的程式：

```bash
./a.out
```

正式建議指令：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
```

參數意義：

- `-std=c++17`：使用 C++17。
- `-O2`：開啟常見最佳化。
- `-Wall`：顯示較多 warning。

## 使用測資檔

建立 `1.in`：

```text
world
```

使用檔案作為 input：

```bash
./a.out < 1.in
```

預期輸出：

```text
hello, world
```

若需要測試第二組資料，可建立 `2.in`：

```text
C++
```

執行：

```bash
./a.out < 2.in
```

預期輸出：

```text
hello, C++
```

## Online Judge 的輸入輸出模型

Online judge 會編譯提交的程式，並以多組測資執行。程式應從 standard input 讀入資料，並把答案輸出到 standard output。

程式不應輸出題目沒有要求的提示文字。例如以下輸出通常會造成 Wrong Answer：

```text
please input your name:
hello, world
```

常見結果：

- AC：Accepted，答案通過測資。
- WA：Wrong Answer，程式有執行完成，但輸出不符合答案。
- CE：Compile Error，程式無法編譯。
- RE：Runtime Error，程式執行時發生錯誤。
- TLE：Time Limit Exceeded，程式執行超過時間限制。

Sample test 通過只代表程式通過題目公開範例，不代表一定會 AC。

## 示範題：[ZeroJudge a001. 哈囉](https://zerojudge.tw/ShowProblem?problemid=a001)

- Difficulty: <span class="difficulty basic">basic</span>
- Topic: input, output, string

### 題目重點

讀入一個字串 `s`，輸出：

```text
hello, s
```

逗號後方有一個空格。

### 提示 1

字串可以使用 `string`。

```cpp
string s;
cin >> s;
```

### 提示 2

輸出固定文字時，直接使用 string literal。

```cpp
cout << "hello, " << s << '\n';
```

### 解題想法

題目只需要依格式輸出。重點是不要漏掉逗號後的空格，也不要輸出其他提示文字。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string s;
    cin >> s;
    cout << "hello, " << s << '\n';

    return 0;
}
```

## 練習

### 必做

- [ZeroJudge a001. 哈囉](https://zerojudge.tw/ShowProblem?problemid=a001)

### 選做

- [AtCoder Beginners Selection - PracticeA](https://atcoder.jp/contests/abs/tasks/practice_1)

## 常見錯誤

- 沒有安裝 `g++`，導致 terminal 顯示 `command not found: g++`。
- 不在 `main.cpp` 所在資料夾執行編譯指令。
- 執行時漏掉 `./`，應使用 `./a.out`。
- 輸出多餘提示文字。
- 漏掉輸出格式中的空格或換行。
