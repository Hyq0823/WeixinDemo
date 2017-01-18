/**
 * Created by 1 on 2017/1/3.
 */
var window_address=window.location.href;
var id=window_address.split("=")[1];
console.log(id);
$.ajax({
    url:'/KNERP/a/weixin/getCustUser',
    data: {
        "id":id
    },
    type:'post',
    dataType:'json',
    success:function(data){
        console.log(data);
        console.log(typeof data);
        $("input[name=custName]").val(data.custName);
        $("input[name=idNumber]").val(data.idCardNum);
        //$(".background").css({"background-image":"url("+data.photo+")"});
        var ar="";
        for(var i=0;i<9;i++){
            var name="area"+(i+1)+"Name";
            var temp= data[name];
            if(!temp){
                break;
            }
            ar+=temp;
        }
        console.log(ar);
        $("#address_son").html("<span>"+ar+"</span>");
        $("input[name=address_input]").val(ar)
    }
});

function validateIdCard(idCard){
    //15位和18位身份证号码的正则表达式
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)){
        if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }
            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                }else{
                    $("input[name=idNumber]").next("span").html("*号码错误");
                    $("input[name=idNumber]").val("");
                    setTimeout(function(){
                        $("input[name=idNumber]").next("span").html("");
                    },1500)
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                }else{
                    $("input[name=idNumber]").next("span").html("*号码错误");
                    $("input[name=idNumber]").val("");
                    setTimeout(function(){
                        $("input[name=idNumber]").next("span").html("");
                    },1500)
                }
            }
        }
    }else{
        if(idCard.length==0){
            $("input[name=idNumber]").next("span").html("*不能为空");
            setTimeout(function(){
                $("input[name=idNumber]").next("span").html("");
            },1500)
        }
        else{
            $("input[name=idNumber]").next("span").html("*格式不对");
            $("input[name=idNumber]").val("");
            setTimeout(function(){
                $("input[name=idNumber]").next("span").html("");
            },1500)
        }
    }
}

function hide(){
    $(".com_ul").hide();
    $(".nav_select ").removeClass("active")
}
function sheng(parentId) {
    var url = "/KNERP/a/sys/area/findByParentId";
    $.ajax({
        type: "post",
        url: url,
        data: {"parentId": parentId},
        beforeSend: function () {//省请求市请求前的处理
            insert();
        },
        success: function (data) {
            $(this).prev("div.nav_second").find("span:nth-child(2)").toggleClass("active");//切换箭头方向
            var name = $("#" + parentId).html();
            $("#" + parentId).parent().prev().html("<span class='span' nameId='" + parentId + "'>" + name + "</span><span class='ion-chevron-right nav_select'></span>");
            $("#" + parentId).siblings("li").css({"background-color": "#fff"});
            $("#" + parentId).css({"background-color": "#ccc"});
            $("#" + parentId).parent().nextAll("div.nav_second").remove();//父亲后面的div.nav_second全部删除
            $("#" + parentId).parent().nextAll("ul").remove();//父亲后面的ul全部删除
            if (data != "") {
                $("#" + parentId).parent().slideUp(20);
                $(".nav").append("" +
                "<div class='nav_second' style='background-color: #fff'>" +
                "<span class='span'>请选择</span>" +
                "<span class='ion-chevron-right nav_select active'>" +
                "</span></div>");
                $(".nav").append("  <ul class='com_ul' id='ul_" + parentId + "' ></ul>");
                for (var i = 0; i < data.length; i++) {
                    var str = "<li class='ss" + data[i].id + "' id=" + data[i].id + " onclick='sheng(\"" + data[i].id + "\")'>" + data[i].name + "</li>";
                    $("#ul_" + parentId).append(str);
                    $(".FooterFather").hide()
                }
                insert();
            }
            else {
                $("#" + parentId).parent().slideUp(20);
                $(".nav").append("");
                $(".FooterFather").slideDown(500);//当数据请求为空时他弹出地址提交按钮
                $(".FooterFather").click(function () {
                    $("#address_son").html("");
                    var arr = new Array(6);
                    for (var i = 0; i < 6; i++) {
                        arr[i] = {name: "", id: ""};
                        arr[i].id = $(".span").eq(i).attr("nameId");
                    }
                    for (var i = 0; i < arr.length; i++) {
                        if ($("span.span").eq(i).html() == undefined || $("span.span").eq(i).html() == "" || $("span.span").eq(i).html() == null) {
                            $("span.span").eq(i).html() == ""
                        }
                        else {
                            arr[i].name = $("span.span").eq(i).html();
                        }
                        var arrName = arr[0].name + arr[1].name + arr[2].name + arr[3].name + arr[4].name + arr[5].name;
                    }
                    $("#address_son").html(arrName);//地址栏
                    $("input[name=address_input]").val(arrName);//地址栏隐藏的输入框
                    set();
                    $(".row .messageFooter").click(function () {
                        runMessage(arr);
                    });
                    document.onkeydown = function () {
                        if (event.keyCode == 13) {
                            runMessage(arr);
                        }
                    };
                    function runMessage(areaArray) {
                        $("input").blur();
                        var cuS = $("input[name=custName]").val();
                        var address = $("input[name=address_input]").val();
                        var idNumber = $("input[name=idNumber]").val();
                        var a = (cuS != "" && address != "" && idNumber != "");
                        var _name=/^[\u4e00-\u9fa5]{2,30}$/;
                        var _use= _name.test(cuS);
                        //当输入框不为空时
                        if (a) {

                            if(!_use){
                                $("input[name=custName]").next("span").html("姓名只能为2-30个汉字");
                                setTimeout(function(){
                                    $("input[name=custName]").next("span").html("")
                                },2000)
                            }
                            else{
                                var data = {
                                    "custName": cuS, "idCardNum": idNumber
                                };
                                for(var i = 0 ; i < areaArray.length;i++){
                                    var name="area"+(i+1);
                                    data[name]=areaArray[i].id;
                                }
                                $.ajax({
                                    type: "post",
                                    url: "/KNERP/a/weixin/bill/billInfo",
                                    data: data,
                                    success: function (data) {
                                        var dataTT=JSON.parse(data);
                                        var datatt=dataTT.id;
//                                            console.log(data);
                                        $(".tishi").css({"display":"block"});
                                        setTimeout(function(){
                                            $(".tishi").css({"display":"none"});
                                            window.location.href="Order-List.html?id="+datatt;
                                        },1500);
                                    }, error: function () {
                                        window.location.href = "message-complete.html?mobile="+mobile[1];
                                    }
                                })
                            }

                        }
//                当输入框有为空的情况
                        else {
                            function className(className) {
//                        该输入框为空时
                                if ($(className).val() == "") {
                                    $(className).next("span").html("*不能为空");
                                    setTimeout(function () {
                                        $(className).next("span").html("");
                                    }, 1500)
                                }
//                      该输入框不为空时
                                else {
                                    $(className).next("span").html("");
                                }
                            }
                            className(".cuS");
                            className(".address_input");
                        }
                    }
                    $(".message_wrap").slideUp(500);
                    $("#main_wrap").slideDown(500);
                });
                insert();
            }
            insert();
        }, complete: function () {
            insert();
        }
    });
}
sheng("1");//页面加载完成时，首先执行一次，读出省份。
function insert() {
    $(".nav_second").click(function () {
        $(this).next("ul").stop().slideToggle(500).siblings("ul").slideUp(100);
//            下拉切换
        $(this).find("span:nth-child(2)").toggleClass("active");//切换箭头方向
        $(this).nextAll("div.nav_second").find("span:nth-child(2)").removeClass("active");
    })
}
function set(){
    $(function () {
        $("a.goback").attr("href","Order-List.html?id="+id);//设置初始返回按钮的返回地址
        $("input[name=idNumber]").blur(function () {
            var idNumber = $("input[name=idNumber]").val();
            validateIdCard(idNumber);
        });//身份的验证调用
        $(".back").click(function () {
            $(".message_wrap").slideUp(500);
            $("#main_wrap").slideDown(500);
            hide();
        });//模板的缩放
        $(".address_son").width($(".address").width() - 160 + "px");  //计算主页地址的宽度
        $(".address_input").width($(".address_son").width() - 28);
        $(".message_wrap").hide();
        //    禁止输入空格
        function inputName(Name) {
            $(Name).on("focus", function () {
                $(this).next("span").html("");
            });
        }
        inputName(".cuS");
        inputName(".address");
        function run() {
            $("input").blur();
            var cuS = $("input[name=custName]").val();
            var address = $("input[name=address_input]").val();
            var idNumber = $("input[name=idNumber]").val();
            var a = ( cuS != "" && address != "" && idNumber != "");
            var _name=/^[\u4e00-\u9fa5]{2,30}$/;
            var _use= _name.test(cuS);
            //当输入框不为空时
            if (a) {
                if(!_use){
                    $("input[name=custName]").next("span").html("姓名只能为2-30个汉字");
                    setTimeout(function(){
                        $("input[name=custName]").next("span").html("")
                    },2000)
                }
                else{
                    var data = {
                        "custName": cuS, "idCardNum": idNumber,"address":$("#address_son>span").html()
                    };

                    $.ajax({
                        type: "post",
                        url: "/KNERP/a/weixin/bill/billInfo",
                        data: data,
                        success: function (data) {
                            var dataTT=JSON.parse(data);
                            var datatt=dataTT.id;
                            $(".tishi").css({"display":"block"});
                            setTimeout(function(){
                                $(".tishi").css({"display":"none"});
                                window.location.href="Order-List.html?id="+datatt;
                            },1500);
                        }, error: function () {
                            window.location.href = "message-complete.html?mobile="+mobile[1];
                        }
                    })
                }
            }
//                当输入框有为空的情况
            else {
                function className(className) {
//                        该输入框为空时
                    if ($(className).val() == "") {
                        $(className).next("span").html("*不能为空");
                        setTimeout(function () {
                            $(className).next("span").html("");
                        }, 1500)
                    }
//                        该输入框不为空时
                    else {
                        $(className).next("span").html("");
                    }
                }
                className(".cuS");
                className(".address_input");
            }
        }

        //页面加载完成时#uli1后选项卡全部隐藏
        $(".address").click(function () {
            $("#main_wrap").slideUp(500);
            $(".message_wrap").css({"transition": "all 0.01s liner", "margin-top": "0"}).slideDown(199);
        });
        $(".row .messageFooter").click(function () {
            run()
        });
        document.onkeydown = function () {
            if (event.keyCode == 13) {
                run();
            }
        };
    });
}
set()
