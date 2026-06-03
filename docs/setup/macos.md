# macOS 環境設定

macOS 可以使用系統內建的 `clang++`，也可以透過 Homebrew 安裝 `g++`。

## 選項 1：Xcode Command Line Tools

```bash
xcode-select --install
```

檢查 compiler：

```bash
g++ --version
```

macOS 上的 `g++` 可能實際指向 `clang++`。對入門競賽題通常足夠。

## 選項 2：Homebrew GCC

```bash
brew install gcc
```

Homebrew 的 binary 名稱可能包含版本號，例如 `g++-15`。

```bash
g++-15 -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
