
require.config({
    paths : {
        jquery : ["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min", '../jquery-2.1.4.min'], //配置第三方库，不能加.js后缀
        // jquery : '../jquery-2.1.4.min',	//配置第三方库，不能加.js后缀
        bootstrap: ["http://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min", "./bootstrap.min"],
        // bootstrap: "./bootstrap.min",
        lazyload: ["http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload"]
    },
    shim: {
        "bootstrap" : {
            deps : ["jquery"],//非AMD模块依赖jquery
            exports :'bs'  
        },
        "lazyload": {
            deps: ["jquery"]
        }
    }
});
require(["jquery", "bootstrap", "lazyload"], function($, bs){
    $(function(){
        //滚动到底部自动加载
        var pageIndex = 2;
        (function loadmore(){
            $(window).bind("scroll", function(){
                if($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() >= 100) {
                    $(window).unbind("scroll");
                    $.get("/admin/getMorePost?pageIndex=" + pageIndex + "&limit=10", function(data){
                       if(data){
	                       $("#heheren-content").append(data);
	                       pageIndex++; 
                       }else{
                       		document.getElementById("load").style.display = "none"
                       		document.getElementById("nodata").style.display = "block"
                       }
                    }, "html");
                };
            });
        })();
    });
});








