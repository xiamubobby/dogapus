/**
 * Created by xiamubobby on 4/27/16.
 */
var pageMod = require("./pagemods/page_mod");
let mainWebView = document.getElementById("mainwebview");
let cover = document.getElementById("cover");
let controls = document.getElementById("controlwebview");
mainWebView.addEventListener("new-window", function (e) { webView.loadURL(e.url); });
mainWebView.addEventListener("console-message", function (e) { console.log(e.message); });
pageMod.modWebContent();
//# sourceMappingURL=index.js.map