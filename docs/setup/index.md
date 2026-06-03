# Setup Overview

本教材主線使用 macOS / Linux-like terminal workflow。Windows 使用者透過 WSL2 + Ubuntu 進入同樣的 Linux-like 環境，因此後續編譯與執行指令相同。

## Required Tools

- C++ compiler：`g++`
- Terminal
- Text editor：VS Code、Zed、Neovim，或學生熟悉的 editor
- Online judge account

## First Program

建立 `main.cpp`：

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

建立 `1.in`：

```text
3 5
```

編譯與執行：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```

Expected output:

```text
8
```

## Basic Commands

```bash
g++ main.cpp
./a.out
./a.out < 1.in
```

Recommended:

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
