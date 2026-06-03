# Windows WSL2 環境設定

Windows 主線是安裝 WSL2 + Ubuntu，讓後續操作與 Linux 相同。

## 安裝 WSL2

在 PowerShell 執行：

```powershell
wsl --install
```

安裝完成後重開機，啟動 Ubuntu，建立 Linux 使用者帳號。

## 安裝 g++

進入 Ubuntu terminal 後執行：

```bash
sudo apt update
sudo apt install build-essential
```

檢查 compiler：

```bash
g++ --version
```

## 編譯與執行

後續都使用 Linux-like 指令：

```bash
g++ -std=c++17 -O2 -Wall main.cpp
./a.out < 1.in
```
