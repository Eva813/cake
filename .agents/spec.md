以下是一份適合直接交給前端工程師（或 Cursor / Claude Code）實作的 Spec Kit 規格。

# 功能名稱

**畢業快樂蛋糕（Farewell Cake）**

---

# 產品目標

製作一個單頁式（Single Page）的 3D 互動蛋糕頁面，送給離職同事作為紀念。

風格溫馨、簡潔、有儀式感。

使用者開啟頁面後，可以：

* 自由旋轉觀看蛋糕
* 點擊蠟燭切換點亮 / 熄滅
* 從上方看到「Best Wishes!」字樣
* 在黑色背景中呈現蛋糕與燭光效果

---

# 技術需求

### Framework

* JavaScript
* Three.js

### 建議套件

```bash
three
@react-three/fiber (可選)
@react-three/drei (可選)
```

若要最純 Three.js：

```bash
three
OrbitControls
```

---

# 頁面結構

只有一個頁面：

```text
/index.html
```

內容：

```text
Canvas
└── Cake
    ├── Cake Body
    ├── Cream Decoration
    ├── Candles
    ├── Flame Effects
    └── Graduation Text
```

---

# 視覺設計

## 背景

```css
background: #000000;
```

純黑背景。

---

## 蛋糕外觀

參考附圖：

* 白色奶油蛋糕
* 圓形
* 兩層奶油裝飾
* 上方奶油球
* 紅色草莓裝飾

### 蛋糕尺寸

```text
Radius: 4
Height: 2
```

---

# 蛋糕文字

俯視蛋糕時可看見：

```text
Best Wishes!
```

置中於蛋糕頂部。

建議：

```text
Color: #ffcc66
Material: MeshStandardMaterial
```

可略微發光。

---

# 蠟燭設計

數量：

```text
3 支
```

位置：

```text
左
中
右
```

排列於蛋糕頂部。

---

# 互動功能

## 1. 蛋糕旋轉

使用滑鼠拖曳：

```js
OrbitControls
```

限制：

```js
enablePan = false;
```

避免把蛋糕拖出畫面。

允許：

```text
旋轉
縮放
```

---

## 2. 點擊蠟燭

點擊任一蠟燭：

### 已點亮

切換成：

```text
熄滅
```

效果：

* 火焰消失
* 點光源關閉

---

### 已熄滅

切換成：

```text
點亮
```

效果：

* 火焰出現
* 點光源恢復

---

# 動畫效果

## 火焰擺動

每幀：

```js
flame.scale.y =
1 + Math.sin(time * 10) * 0.1;
```

營造燭火跳動。

---

## 火焰亮度

```js
light.intensity =
1.5 + Math.sin(time * 12) * 0.2;
```

產生閃爍感。

---

## 蛋糕漂浮

輕微上下浮動：

```js
cake.position.y =
Math.sin(time) * 0.05;
```

---

# 燈光配置

## Ambient Light

```js
new THREE.AmbientLight(
  0xffffff,
  0.5
);
```

---

## Directional Light

```js
new THREE.DirectionalLight(
  0xffffff,
  1.2
);
```

---

## Candle Light

每根蠟燭：

```js
new THREE.PointLight(
  0xffaa55,
  1.5,
  5
);
```

---

# 相機設定

初始角度：

```js
camera.position.set(
  0,
  8,
  10
);
```

可直接看到蛋糕與文字。

---


# 驗收標準

### 3D 顯示

* [ ] 蛋糕正確渲染
* [ ] 黑色背景

### 互動

* [ ] 滑鼠可旋轉蛋糕
* [ ] 滑鼠可縮放
* [ ] 點擊蠟燭可切換點亮/熄滅

### 動畫

* [ ] 火焰閃爍
* [ ] 蛋糕微幅漂浮

### 文案

* [ ] 蛋糕頂部顯示「Best Wishes!」

---

如果你要做成更有紀念感的版本，我會建議再增加：

1. 同事名字（例如「Kevin Best Wishes!」）
2. 點擊蛋糕後灑落彩帶粒子
3. 全部蠟燭熄滅時觸發煙火
4. 背景播放輕柔音樂
5. 蛋糕自動慢速旋轉（未操作時）

這樣成品會很像一個小型 3D 離職祝福網頁。
