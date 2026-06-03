# Linux 環境設定

以下指令以 Ubuntu / Debian 為例。

```bash
sudo apt update
sudo apt install build-essential
```

檢查 compiler：

```bash
g++ --version
```

編譯與執行：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
