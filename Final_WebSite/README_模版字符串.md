# JavaScript ES6 中的模版字符串（template literals）和標籤模版（tagged template）

## 說明如下：

在 ES6 當中，我們多了一個非常好用的模版字符串（template literal）也有人稱樣板字符串，如果你會在 JS 中「放入 HTML 的內容」、或者有「很長的字串包含換行」、又或者會有「字串連結變數」這樣的需求，模版字符串會是非常方便的作法。

另外，在 ES6 中可以將模版字符串和函式結合使用，形成一個標籤模版（tagged template），可以以此過濾 HTML 字串，避免使用者輸入惡意內容。


## 模版字符串（template literal）的基本應用

模版字符串的使用非常簡單，就是使用 **反引號" ` "（鍵盤左上角的~）** ，舉例來說，如果我們會在 JS 的字串中放入 HTML 內容，在過去我們可能需要這樣寫：

```javascript
let component_es5 = '<header>\n'+
'<div class="banner">\n'+
'<img src="img1.jpg"\n'+
'</div>\n'+
'</header>'
```

這麼寫相當麻煩，而且不易閱讀。而在 ES6 中我們可以用反引號快速的解決這樣的狀況：

```javascript
let component_es6 = `
<header>
    <div class='banner'>
        <img src="img1.jpg>
    </div>
</header>
`
```

也就是說，**透過反引號包住的內容，會保留所有的換行和空行**。

## 在模版字符串中嵌入變數

另外，在模版字符串中，我們還可以透過 ${...} 這樣的方式，嵌入變量或任何的表達式：

```javascript
let myName = "Kobt",
    numA = 5,
    numB = 1;

let content = `Hello, my name is ${myName}, my lucky number is ${2*(numA + numB)}`;
console.log(content);  // "Hello, my name is Kobt, my lucky number is 12"
```

我們可以看到透過 ${...}，裡面我們不只可以放入變數，還可以放入表達式（例如${3+4}）。
最後，如果在模版字符串中我們又會使用到反引號的話，這時候我們必須使用跳脫字元 \ 來處理，像是這樣：

```javascript
var greeting = `\`Hello\` World!`;
console.log(greeting); // "`Hello` World!"
```


# 進階：標籤模版（tagged template）

接著我們可以來看一下模版字符串的進階用法，這樣的用法非常適合用在前端用來過濾使用者所輸入的訊息。讓我們先來看一下基本的用法。

標籤模版的使用就是直接在函式後面加上模版字符串，如果模版字符串中沒有使用 ${...} 代入任何的變數的話，那麼它其實就和一般將參數代入函式中差不多：

```javascript
console.log `Hello EveryOne`;    //  Array  ["Hello EveryOne"]
console.log('Hello EveryOne');   //  String "Hello EveryOne"
```

但是如果在模版字符串中有 ${...} 的話，意義就相當不同：

```javascript
let myName = "Kobt";
let myCountry = "Taiwan";

tag `<p> My name is ${myName} and my coutry is ${myCountry}</p>`;  //  使用標籤模版
tag(["<p> My name is ", " and my coutry is ", "</p>"], "Kobtr", "Taiwan")  // 等同於上面這段
```

很大的差別在於 **若我們使用標籤模版（tagged template），也就是在函式後面直接代入模版字符串（`...`），它等於會先將模版字符串的內容切成多個參數，在放入函式中，** 切法就是把所有沒有被放在 ${...} 中的內容都組成一個陣列（就像上例中["<p> My name is ", " and my coutry is ", "</p>"]），當作這個函式的第一個參數；接著將 ${...}  裡面的內容，依次當做後面的第二個、第三個、...參數（看你使用了幾次${...} ）。

因此，如果我們將 tag 這個 function 寫成這樣：

```javascript
let myName = "Kobt";
let myCountry = "Taiwan";

tag `<p> My name is ${myName} and my coutry is ${myCountry}</p>`;
// tag(["<p> My name is ", " and my coutry is ", "</p>"], "PJCHENder", "Taiwan")  // 等同於上面這一段

function tag(template){
  console.log(template);
  console.log(arguments);
}
```

這個 function 做的事情很簡單，就是把 template 呼叫出來，還有把 arguments 呼叫出來（arguments 是 JS 中內建的關鍵字，若不清楚可參考：JavaScript中函式的參數(parameter),arguments和展開運算子(spread)）。輸出的結果如下，其中上面是 template，下面是 arguments：

![遞迴執行運作程序](https://2.bp.blogspot.com/-viKm3x8IUtQ/WIg2kps907I/AAAAAAAAxr8/6F_MJDdeaUEOPbRBLIZ-I3fENsbTpzYwACLcB/s1600/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-01-25%2B%25E4%25B8%258B%25E5%258D%25881.24.09.png)

在下圖中下面的部分，我們可以看到它實際代入了三個參數，第一個參數是一個陣列，裡面包含所有 **除了** 在 ${...} 內的內容，後面的兩個參數，則分別放入 ${...} 的內容作為參數。

結合其餘運算子（rest operator）做使用：因為 ${...}  的數量可能是不固定的，因此我們可以搭配其餘運算子（...），將這些參數組成陣列來使用（若不清楚其餘運算子，可參考：JavaScript ES6 中的展開運算子（spread operator）和其餘運算子（rest operator）），像是這樣：


```javascript
let myName = "PJCHENder";
let myCountry = "Taiwan";

tag `<p> My name is ${myName} and my coutry is ${myCountry}</p>`;
// tag(["<p> My name is ", " and my coutry is ", "</p>"], "Kobt", "Taiwan")  // 等同於上面這一段

function tag(template, ...values){
  console.log(template);  //  ["<p> My name is ", " and my coutry is ", "</p>"]
  console.log(values);  //  ["PJCHENder", "Taiwan"]
}
```

等於把不在${...}內的，和在${...}，拆成兩個陣列來做使用。

這樣的標籤模版有一個好處，就是我們可以把使用者輸入的內容${...}，和我們網頁原本的內容分開做處理，以達到過濾 HTML 字符串，防止用戶輸入惡意內容的效果：

![遞迴執行運作程序](https://2.bp.blogspot.com/-MEvcXL-jD0Y/WIg5Iv8gFlI/AAAAAAAAxsM/V2c1dmeE9YoQVeFSB8NpACSVSRZeRjaPwCLcB/s640/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-01-25%2B%25E4%25B8%258B%25E5%258D%25881.35.15.png)

