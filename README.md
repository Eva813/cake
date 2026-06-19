# graduate_cake

這是一個純靜態的 Three.js 專案，可以直接部署到 GitHub Pages。

## 部署方式

1. 把專案推到 GitHub。
2. 到 GitHub repository 的 Settings > Pages。
3. Source 選擇 GitHub Actions。
4. push 到 `main` 後，workflow 會自動發佈網站。

## 本機預覽

因為 `index.html` 使用 ES module 與遠端 CDN，相較於直接用檔案總管開啟，建議用本機靜態伺服器預覽，例如 VS Code Live Server。

## 注意事項

- Three.js 透過 CDN 載入。
- 字型有一個遠端載入來源，若離線或網路受限，會回落到系統字型，但主場景與動畫仍可正常執行。