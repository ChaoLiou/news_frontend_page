# 星球主頁

- [起步](#起步)
- [assets/](#assets)
- [beanfun_tracker/](#beanfun_tracker)
- [components/](#components)
- [middleware/](#middleware)
- [news_detail_page/](#news_detail_page)
- [pages/](#pages)
- [plugins/](#plugins)
- [static/](#static)
- [store/](#store)
- [test/](#test)
- [babel.config.js](#babelconfigjs)
- [deploy.bat](#deploybat)
- [jsconfig.json](#jsconfigjson)
- [nuxt.config.base.js](#nuxtconfigbasejs)
- [nuxt.config.dev.js](#nuxtconfigdevjs)
- [nuxt.config.js](#nuxtconfigjs)
- [package.json](#packagejson)
- [vue.config.js](#vueconfigjs)

# 起步

- 進行開發

```bash
npm install
npm run dev
```

- 進行部署

```bash
npm run generate
# 完成後上傳到 storage blob, 或是透過 azure cli(請見 deploy.bat 章節)
```

# assets/

## js/

### beango/

- `星球主頁` 載入時, 會引入 `https://.../beango-static-stg/sdk/beanfun.min.js`, 提供方法能夠取得 beanfun! app 的資訊, 或是操控一些行為.
- 資料夾內有 `beango/[index index-async index-mock].js` 包裝了他的方法, 而專案內統一呼叫包裝過的方法.
- `index.js`: 第一層包裝的方法, 紀錄 log, 並使用 callback 形式取得結果
- `index.async.js`: 從 `index.js` 擴充, 將那些使用 callback 形式的方法改成使用 Promise, 達成 async 呼叫.
- `index.async.mock.js`: 從 `index.async.js` 擴充, 將那些能夠取得結果的方法改成直接回傳 mock 結果, 方便於網頁上測試(網頁不支援使用 beango sdk)

### recommendation/

- `formatter.js`
  - 這裡定義了 `推薦新聞` 和 `推薦商品` 的資料格式化方法

### tracking/

- `events.js`
  - 這裡列出 `追蹤使用者行為` 的所有事件資訊, 包含 `事件 Id` , `事件 Payload 格式化方法`
- `utils.js`
  - 這裡定義了使用於 `追蹤使用者行為` 的工具, 如:
    - 依據手機裝置名稱, 取得對應的手機作業系統
    - 取得目前瀏覽器的時區

### fetchAPI.js

- 這裡是將 fetch API 包裝, 提供 `get`, `patch`, `post` 方法
  - 有預設 api prefix, 也可透過參數 `apiPrefix` 指定

### formatter.js

- 這裡定義了 `星球主頁` 的資料格式化方法, 包括 `新聞` 和 `影音`,
  - `數字` 格式化使用於 `影音觀看數`(詳見 `test/formatter.test.js`)

### utils.js

- 這裡定義了使用於 `星球主頁` 的工具, 如:
  - 隨機產生 uuid
  - 取得 query string 參數組合的物件
  - 隱藏或顯示 VConsole

### vuex-utils.js

- 這裡是將 store 的 `dispatch` 和 `commit` 包裝, 將第三個參數 `options` 都預設傳入 `{ root: true }`, 這樣才能達成 namespaced 架構中 root `actions` 和 `mutations` 的呼叫.

## json/

### planets.json

- 這裡是星球的靜態資料
- [注意] 內容中的 id 會對應 news api 回傳的星球 id, 若有星球 id 更動, 或是新增星球, 這裡必須修改.

## style/

### all.css

- 這裡是全域 css, 如:
  - 微軟正體字型
  - 連結文字不加底線
  - 寬度小於 1024px 會隱藏 scrollbar
  - 隱藏 VConsole

---

# beanfun_tracker/

- 請見 [demo](https://stg-news.beanfun.com/beanfun_tracker/demo/index.html)

---

# components/

- 元件說明請見 [Style Guide](https://stg-news.beanfun.com/styleguide/index.html)

---

# middleware/

## appCache.js

- 這裡是判斷 client app 版本是否為最新版本, 若不是則使用 beango sdk 強制重整頁面.

## init.js

- 這裡是執行一般的初始化, 如:
  - 啟用 VConsole, 再隱藏 VConsole
  - log 環境變數

## event.js

- 這裡是執行與追蹤事件有關的初始化, 如
  - 透過 utils, beango sdk, 或是環境變數, 收集事件所需資料
  - BTracker 初始化

## planet.js

- 這裡會向 news api 請求星球資料

## redirect.js

- 這裡會判斷若是不允許國家地區的使用者, 重導向至 /noallow

## serverEnv.js

- 這裡會向 news api 請求 server 端的環境變數

---

# news_detail_page/

## formatter.js

- 這裡定義了 `新聞內頁` 使用的資料格式化方法, 如:
  - 將毫秒轉換成 `新聞內頁` 需要顯示的文字(詳見 `test/news_detail_page/formatter.test.js`)

## index.js

- 這裡是 bundle news_detail_page.js 的 entry, 涉及的範圍如下:
  1. 判斷目前是 development 還是 production, 才能決定匯入 `nuxt.config.dev.js` 還是 `nuxt.config.js`
  2. 程式進入點是從引入所有需要的 scripts 開始, 像是 Vue, Vue 元件的 umd 套件, beango, VConsole 等等, 這些 script tag onload 都會綁定指定的 function
  3. beanfun 和 vue 的 scripts 成功載入後, 會接續完成:
     - 向 news api 請求 server 端環境變數
     - 透過 utils, beango sdk, 或是環境變數, 收集事件所需資料
     - BTracker 初始化
     - 向 news api 請求 `新聞內頁` 的新聞資料
  4. 向 news api 請求 `新聞內頁` 的新聞資料
     - 格式化新聞資料
     - render 動態 DOM
     - 綁定事件, 如:
       - scroll: 追蹤使用者閱讀新聞比例
       - click `<a.link__open-by-default-browser>`: 使用 beango sdk 打開手機預設瀏覽器並導向
       - long-touch `<div.title>`: 顯示 VConsole, 使用 touchstart, touchend 和 touchcancel 達成
       - click `<div.tool-menu__inside-sharing>` 使用 beango sdk 內部分享
       - click `<div.tool-menu__outside-sharing>` 先透過 news api 提供的縮短網址服務, 再使用 beango sdk 外部分享
     - render Vue 元件的 umd 套件
       - BRecomendNewsBlock
       - BRecomendAdBlock

## render.js

- 這裡定義了 `新聞內頁` 上與 DOM 動態顯示的方法, 如:
  - 工具列(beanfun! app 內部分享與外部分享)
  - 來源資訊(來源圖片, 來源名稱)
  - 時間資訊(發布時間, 更新時間)
  - 推薦新聞區塊的標題
  - 推薦廣告區塊的標題
  - 來源新聞連結

## sharing.js

- beanfun! app 分享訊息的格式化方法, 內部分享與外部分享

## utils.js

- 這裡定義了使用於 `news_detail_page.js` 的工具, 如:
  - 動態引入 script tags, 並綁定 onload
  - 簡單分群
  - 將 news id 從網址中解析出來

## webpack.config.js

- 這裡定義 `news_detail_page.js` bundle 設定, 如:
  - 進入檔是 `/news_detail_page/index.js`
  - 使用 babel-loader
  - 輸出於 `/static/news_detail_page.js`
  - 傳入 DEVELOPMENT 判斷是 development 還是 production

---

# pages/

## \_planetId/audiovisual/\_id.vue

- 這是 `影音內頁`

## index.vue

- 這是 `新聞主頁`

## noallow.vue

- 這是 `不支援目前國家地區的資訊頁`

---

# plugins/

## mixin.js

- 這裡是定義每個元件都很有可能需要的資料, 如:
  - 透過星球 id 取得星球名稱
  - Server 端環境變數

---

# static/

## articles/

- 請手動建立這個資料夾, 因為開發時可能需要, 建立後手動下載幾篇 `新聞內頁` html, 並且保持網址的路徑, 放置於此資料夾內.
- 當你要開發 `新聞內頁` 時, 可以透過這些 `新聞內頁` html 測試, 每當修改完記得要執行 `npm run build:detail` 將 `news_detail_page.js` 更新.

## beanfun_tracker/

- 這裡是跟 beanfun tracker sdk 有關的資源

### demo

- `index.html`: 這是說明文件, 說明如何使用 BTracker
- `app.js`: 測試用途

### sdk/beanfun_tracker.min.js

- BTracker bundle, 需要執行 `npm run build:tracker`

## icons/

- 這裡是放置使用到的 icons

## package-demo/

- 這裡是放置 `Vue 元件的 umd 套件` 的展示頁面

## packages/

- 這裡是放置 `Vue 元件的 umd 套件`, 需要執行 `npm run build:packages`

## styleguide/

- 這裡是 styleguide 頁面, 需要執行 `npm run styleguide:build`

## news_detail_page.css

- 這是 `新聞內頁` 所使用到的 css

## news_detail.page.js

- 這是 `新聞內頁` 所使用到的 bundle js, 需要執行 `npm run build:detail`

## template.html

- 這是 `新聞內頁` 的範本

---

# store/

- 每一個 store 都會分為三個檔案, 舉例 `foo.js`:
  - `api/foo.js`
    - [不公開] 包含所有 foo 相關的 api 呼叫方法
  - `stateRepo/foo.js`
    - [不公開] 包含所有 foo 相關的 state 和 mutations,
  - `foo.js`
    - [公開] 包含所有 foo 相關的 getters 和 actions
- 目的是當對外公開 foo store 時, 只公開他的 getters 和 actions, 也就是外面使用端:
  - 透過 getters 取得 state, 或是經過運算後的 state.
  - 透過 actions 先呼叫 `/api/foo.js` 的 actions 取得資料, 再透過 mutations 更新 state.

## api/audiovisual.js

- api 提供影音資料, 若要篩選有兩種方式:
  - 指定星球
  - 指定分類

## api/beanfun.js

- api 提供 access token 驗證服務

## api/category.js

- api 提供分類資料

## api/event.js

- api 提供追蹤使用者行為服務

## api/news.js

- api 提供新聞資料, 若要篩選有兩種方式:
  - 指定星球
  - 指定分類
- api 提供推薦資料, 共有三種資料:
  - 依據關鍵字取得商品
  - 依據新聞 Id 取得推薦新聞
  - 依據 openId 取得推薦新聞

## api/planet.js

- api 提供星球資料

## api/serverEnv.js

- api 提供 Server 端環境變數

## stateRepo/audiovisual.js

- 影音列表

## stateRepo/beanfun.js

- 從 beango 收集的資料

## stateRepo/category.js

- 分類列表

## stateRepo/event.js

- 追蹤事件所需要的資料

## stateRepo/news.js

- 新聞列表

## stateRepo/planet.js

- 星球列表

## stateRepo/serverEnv.js

- Server 端環境變數

## stateRepo/token.js

- ts: 若要向 news api 請求新聞/影音資料, 需要指定 timestamp, 這樣才不會因為有更新的新聞/影音而導致重複. 所以在網頁載入後會設定一個 ts, 直到重整都會傳入同一個 ts 值.

## audiovisual.js

- 取得影音資料

## beanfun.js

- 取得從 beango 提供的資料

## category.js

- 取得分類資料

## event.js

- 取得追蹤事件所需要資料, 發送追蹤事件

## news.js

- 取得新聞 & 推薦新聞資料,

## planet.js

- 取得星球資料, 以星球 Id 找星球

## serverEnv.js

- 取得 Server 端環境變數

## token.js

- 更新 ts

---

# test/

- 以 jest 測試, 需要執行 `npm run test`

---

# babel.config.js

- 用於 jest 的 babel 設定, 即可在 `test/**/*.js` 使用 es6 語法.

---

# deploy.bat

- 可以建立此 bat 方便開發端部署到 azure storage blob
- 需要安裝 azure cli

```bash
npm run generate:supplier
# 或是 npm run generate

az storage blob upload-batch --account-name {account_name} --source ./dist --destination $web --account-key {account_key}
# account_name: storage 名稱
# account_key: storage key

```

---

# jsconfig.json

- nuxt 所提供

---

# nuxt.config.base.js

- nuxt 所有設定

---

# nuxt.config.dev.js

- 從 `nuxt.config.base.js` 擴充, 加上 development 使用的環境變數

---

# nuxt.config.js

- 從 `nuxt.config.base.js` 擴充, 加上 production 使用的環境變數

---

# package.json

| 指令                                | 是組合<br>指令 | 說明                                                                              |
| :---------------------------------- | :------------: | :-------------------------------------------------------------------------------- |
| `dev`                               |       X        | 會以 nuxt.config.dev.js 啟動 nuxt server                                          |
| `build`                             |       X        | 建置 nuxt                                                                         |
| `start`                             |       X        | 啟動 nuxt server                                                                  |
| `generate`                          |       V        | `pre-build`<br>`nuxt generate`: static site generation<br>`styleguide:build`      |
| `pre-build`                         |       V        | `generate:version`<br>`build:packages`<br>`build:detail`                          |
| `build:packages`                    |       V        | `build:package:BRecommendNewsBlock`<br>`build:package:BRecommendAdBlock`          |
| `build:package:BRecommendNewsBlock` |       X        | 使用 vue-cli 建置 Vue 元件的 umd 套件 - 推薦新聞區塊                              |
| `build:package:BRecommendAdBlock`   |       X        | 使用 vue-cli 建置 Vue 元件的 umd 套件 - 推薦廣告區塊                              |
| `build:detail`                      |       X        | 使用 webpack 進行 bundle `news_detail_page.js`                                    |
| `build:tracker`                     |       X        | 使用 webpack 進行 bundle `beanfun_tracker/sdk/beanfun_tracker.min.js`             |
| `test`                              |       X        | 進行 jest 測試                                                                    |
| `styleguide`                        |       X        | 啟動 styleguide server                                                            |
| `styleguide:build`                  |       X        | 建置 styleguide                                                                   |
| `generate:version`                  |       X        | 執行 `version/index.js`<br>他會產生 `static/version.json`, 用於判斷是否為最新版本 |

- 若指令有接著 `:supplier`, 代表使用 `nuxt.config.dev.js`, 而非 `nuxt.config.js`.

---

# vue.config.js

- vue cli 所需要的設定, 用於 bundle `共用的 Vue 元件`
