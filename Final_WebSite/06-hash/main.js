window.onhashchange = function () { // onhashchange 就是網址當中井字號後面的東西改變時 file:///C:/VanillaJS/Site/05-page/index.html#title
  let hash = window.location.hash.toLowerCase() // 把 hash 值取出來轉小寫
  console.log('hash=', hash)
  switch (hash) {
    case '#login': // 舉例，如果 hash 值是 login, 就呼叫顯示 login 頁面
      ui.show(page.login);
      break;
    case '#logout':
      ui.show(page.logout);
      break;
    case '#signin':
      ui.show(page.signin);
      break;
    case '#home':
      ui.show(page.home);
      break;
  }
}
