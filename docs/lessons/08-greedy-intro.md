# Lesson 8：Greedy 入門

## 本課目標

完成後應具備以下能力：

- 理解 greedy 是每一步做目前看起來最好的選擇。
- 分辨「看起來合理」與「真的正確」的策略。
- 使用排序讓 greedy 選擇更清楚。
- 處理有限資源下最大化數量的問題。
- 處理兩兩配對問題。
- 處理不重疊區間的選擇問題。
- 用簡單反例檢查錯誤策略。

## Greedy 是什麼

Greedy 的核心是：每一步都做一個局部選擇，並希望這些選擇合起來得到整體最佳答案。

例如要用有限預算買最多物品，直覺上應該先買便宜的。這是 greedy。

但 greedy 不是「想到一個看起來合理的規則就直接用」。每個 greedy 策略都需要檢查：

```text
這一步這樣選，會不會讓未來變差？
```

若能說明「換成這個選擇不會讓答案變差」，通常就能支持 greedy 的正確性。入門階段不用寫嚴格證明，但要能用例子與反例檢查策略。

## 排序後從小到大選

許多 greedy 題會先排序。排序後，最小、最大、最早結束、最便宜等選擇才容易取得。

例如：

```text
價格：8 3 5 2
排序：2 3 5 8
```

若目標是用固定預算買最多個，先買便宜的通常合理。因為如果先買較貴的物品，改買較便宜的物品不會花更多錢，還可能留下更多預算。

## 示範題：[AtCoder ABC121C Energy Drink Collector](https://atcoder.jp/contests/abc121/tasks/abc121_c)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: greedy、排序、最小成本

### 題目重點

有 $N$ 間店，每間店的飲料單價是 $A_i$，最多可買 $B_i$ 瓶。要買總共 $M$ 瓶，求最小花費。

### 提示 1

若兩間店都有飲料，應該優先從單價較低的店買。

### 提示 2

可以把所有店依照單價由小到大排序。

### 解題想法

為了讓總花費最小，應先買最便宜的飲料。若目前最便宜的店還有庫存，就盡量從它買；不夠再去下一間店。

做法：

1. 將 `(price, count)` 依照 `price` 升冪排序。
2. 從便宜到貴依序處理。
3. 每間店買 `min(剩下需要數量, 這間店庫存)`。
4. 累加花費，直到買滿 $M$ 瓶。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long m;
    cin >> n >> m;

    vector<pair<long long, long long>> shops(n);
    for (int i = 0; i < n; i++) {
        cin >> shops[i].first >> shops[i].second;
    }

    sort(shops.begin(), shops.end());

    long long ans = 0;
    for (int i = 0; i < n; i++) {
        long long price = shops[i].first;
        long long count = shops[i].second;

        long long buy = min(m, count);
        ans += buy * price;
        m -= buy;

        if (m == 0) {
            break;
        }
    }

    cout << ans << '\n';
}
```

## 兩兩配對

有些題目要把元素配成一組。常見 greedy 思考是：

```text
先處理最難安排的元素。
```

例如每台車最多坐兩人，重量不能超過限制。最重的人最難配對，所以可以先看最重的人能不能和最輕的人同坐。

- 若最重 + 最輕可以同坐，就讓他們同坐。
- 若不行，最重的人不可能和任何人同坐，只能自己坐。

這個策略成立的原因是：最輕的人都不能和最重的人配，其他人更不可能。

## 示範題：[CSES Ferris Wheel](https://cses.fi/problemset/task/1090/)

- Difficulty: <span class="difficulty standard">standard</span>
- Topic: greedy、排序、雙指標、配對

### 題目重點

有 $N$ 個小孩，每台摩天輪車廂最多坐兩人，且總重量不能超過 $X$。求最少需要幾台車廂。

### 提示 1

先把體重排序，從最輕與最重兩端開始處理。

### 提示 2

若最輕的人不能和最重的人同坐，最重的人只能自己坐。

### 解題想法

排序後使用兩個指標：

- `left` 指向目前最輕的人。
- `right` 指向目前最重的人。

每次安排最重的人：

- 若 `p[left] + p[right] <= x`，讓最輕和最重同坐，兩個指標都移動。
- 否則最重的人自己坐，只移動 `right`。

每次都使用一台車廂，因此答案加 $1$。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long x;
    cin >> n >> x;

    vector<long long> p(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i];
    }

    sort(p.begin(), p.end());

    int left = 0;
    int right = n - 1;
    int ans = 0;

    while (left <= right) {
        if (p[left] + p[right] <= x) {
            left++;
            right--;
        } else {
            right--;
        }
        ans++;
    }

    cout << ans << '\n';
}
```

## 區間選擇

另一種經典 greedy 題是從許多區間中選最多個互不重疊的區間。

錯誤策略可能有：

- 先選最早開始的區間。
- 先選最短的區間。
- 先選看起來空隙最大的區間。

正確的常見策略是：先選結束時間最早的區間。

因為越早結束，越不會佔用後面的時間，留給未來的選擇越多。

## 示範題：[CSES Movie Festival](https://cses.fi/problemset/task/1629/)

- Difficulty: <span class="difficulty challenge">challenge</span>
- Topic: greedy、區間排程、結束時間排序

### 題目重點

有 $N$ 部電影，每部電影有開始時間與結束時間。一次只能看一部電影，求最多能看幾部。

### 提示 1

每次選一部電影時，應優先選結束時間最早的可行電影。

### 提示 2

把電影依照結束時間排序，從前到後掃描。

### 解題想法

先將電影依照結束時間由小到大排序。

維護 `currentEnd`，表示目前已選電影的結束時間。掃描每部電影：

- 若這部電影的開始時間不早於 `currentEnd`，就可以選。
- 選了以後，更新 `currentEnd` 為這部電影的結束時間。

選結束最早的可行電影，能保留最多空間給後面的電影。

### 參考程式碼

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<pair<int, int>> movies(n);
    for (int i = 0; i < n; i++) {
        int start, finish;
        cin >> start >> finish;
        movies[i] = {finish, start};
    }

    sort(movies.begin(), movies.end());

    int currentEnd = 0;
    int ans = 0;

    for (int i = 0; i < n; i++) {
        int finish = movies[i].first;
        int start = movies[i].second;

        if (start >= currentEnd) {
            ans++;
            currentEnd = finish;
        }
    }

    cout << ans << '\n';
}
```

## 用反例檢查 greedy

Greedy 最常見的錯誤是策略看起來合理，但其實不一定最佳。

例如區間選擇中，「先選最短的電影」不一定正確：

```text
[1, 4], [4, 7], [2, 5]
```

最短的 `[2, 5]` 長度是 $3$，但選它後不能選其他兩部。若選 `[1, 4]` 和 `[4, 7]`，可以看兩部。

所以遇到 greedy 題時，應該嘗試找小反例。如果找不到反例，再思考為什麼這個選擇不會讓答案變差。

## 練習

### 課堂練習

<ul class="problem-list">
  <Problem id="l8-c1" href="https://atcoder.jp/contests/abc121/tasks/abc121_c" title="AtCoder ABC121C Energy Drink Collector" difficulty="standard" topic="排序、最小成本、greedy" />
  <Problem id="l8-c2" href="https://cses.fi/problemset/task/1090/" title="CSES Ferris Wheel" difficulty="standard" topic="排序、雙指標、配對" />
  <Problem id="l8-c3" href="https://www.luogu.com.cn/problem/P1223" title="洛谷 P1223 排队接水" difficulty="standard" topic="排序、等待時間、greedy" />
</ul>

### 回家練習

<ul class="problem-list">
  <Problem id="l8-h1" href="https://www.luogu.com.cn/problem/P1094" title="洛谷 P1094 纪念品分组" difficulty="basic" topic="排序、雙指標、配對" />
  <Problem id="l8-h2" href="https://atcoder.jp/contests/abc131/tasks/abc131_d" title="AtCoder ABC131D Megalomania" difficulty="standard" topic="截止時間排序、可行性檢查" />
  <Problem id="l8-h3" href="https://cses.fi/problemset/task/1084/" title="CSES Apartments" difficulty="standard" topic="排序、雙指標、配對" />
  <Problem id="l8-h4" href="https://www.luogu.com.cn/problem/P1803" title="洛谷 P1803 线段覆盖" difficulty="challenge" topic="區間排程、結束時間排序" />
  <Problem id="l8-h5" href="https://atcoder.jp/contests/abc103/tasks/abc103_d" title="AtCoder ABC103D Islands War" difficulty="challenge" topic="區間、greedy、切點選擇" />
  <Problem id="l8-h6" href="https://cses.fi/problemset/task/1630/" title="CSES Tasks and Deadlines" difficulty="challenge" topic="排序、完成時間、greedy" />
</ul>

## 常見錯誤

- 只憑直覺選 greedy 策略，沒有檢查反例。
- 忘記排序，導致處理順序不符合策略。
- 將「先選最大」套用到所有題目：不同題型的 greedy 依據不同。
- 配對題沒有先處理最難安排的元素。
- 區間選擇題依開始時間排序，而不是依結束時間排序。
- 花費與數量相乘時使用 `int`，造成 overflow。
- 題目要求最小值時，只記錄能不能做到，沒有累加真正成本。
