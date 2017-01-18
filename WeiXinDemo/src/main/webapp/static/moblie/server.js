/**
 * Created by Administrator on 2016/12/02.
 */
var myExpress = require("./server/node_modules/express");
//var cookieParser = require("./server/node_modules/cookie-parser");
//var session = require("./server/node_modules/express-session");
var app = myExpress();
app.configure(function(){
    //app.use(cookieParser());
    //app.use(session({
    //    secret:"123",
    //    name:"mine",
    //    cookie:{maxAge:30000}
    //}));
    app.use(myExpress.logger("dev"));
    app.use(myExpress.bodyParser());
    app.use(myExpress.methodOverride());
    app.use(app.router);
    app.use(myExpress.static(__dirname+"/client"));
    app.use(myExpress.errorHandler());
});

// app.get("/",function(req,res){
//     res.redirect("page/index.html");
// });

app.set("port",2222);
app.listen(app.get("port"),function(){
    console.log("服务器已启动8844");
});