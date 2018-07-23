/*
   此為架設一個簡單的 server 範例

   Terminal 輸入 $ node .\helloServer.js
   會跑出一段 Server running at http://127.0.0.1:3000/ 我們只要打開此網頁就能夠驗證

   這裡須特別留意我們是把 hostname 寫死所以就算找到自己的 IP 後面輸入 port 也找不到 EX:http://192.168.1.116:3000/
   必須要把下面的 server.listen(port, hostname, ()) 當中的 hostname, 拿掉才可以。

   這裡我們成功架設一個 WebServer 現在如果我要在這個 server 當中架設網站只需要跟中華電信申請對外 IP 或是虛擬主機就可以
   經營我們的網站

   要架設網站的管道（需要資料庫）：
   可以用 Firebase (Google提供的雲端程式)，不太需要 NodeJS 只要把前端寫好就好，因為Firebase本身就有資料庫
*/


const http = require('http'); // require() 引用 NodeJS 函式庫

const hostname = '127.0.0.1'; // 127.0.0.1 就是 run 在自己的電腦本機端
const port = 3000; // 創建 server(伺服器) 占用 3000 這個 port

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n'); // 這裡只會回應 Hello World
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
