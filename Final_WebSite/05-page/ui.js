const ui = {}

ui.html = function (path, html) {
  document.querySelector(path).innerHTML = html //querySelector() 只會找第一個，這邊是找出 path 第一個後把 innerHTML 設成 HTML
}

ui.show = function (html) { // ui.show 執行是把 html 網頁內容填到 "main" 主區塊
  ui.html('#main', html)
}
