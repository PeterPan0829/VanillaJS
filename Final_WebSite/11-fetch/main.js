window.onload = function () {
  window.onhashchange()
}

window.onhashchange = function () {
  let hash = window.location.hash.substring(1).toLowerCase()
  console.log('hash=', hash)
  if (hash.length === 0) hash = 'home'
  // 本來是在 onhashchange 抓樣板出來直接取用，現在是利用 fetch API
  // 在 fetch 底下找 page + hash .html 找到後用 response 回傳, 回傳後再取得文字內容 .txt 最後 ui.show(text) 顯示在畫面上
  fetch('page/' + hash + '.html').then(function (response) {
    console.log('response=', response)
    response.text().then(function (text) {
      console.log('text=', text)
      ui.show(text)

      // 取得圖表另外用 switch 寫
      switch (hash) {
        case 'chart_simple':
          chart.simple();
          break;
        case 'map_simple':
          map.simple();
          break;
      }
    })
  })
}
