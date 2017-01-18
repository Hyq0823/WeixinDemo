/**
 * Created by 1 on 2016/12/6.
 */
(function(){
    $(function(){
        $("input[name=phone]").on("focus",function() {
            $(".phone_prompt").html("")
        });
        $("input[name=phone]").focus(function(){
            $("input[name=phone]").attr("placeholder","输入手机号");
        });
        $(".validation").click(function(){
            $("input[name=phone]").attr("placeholder","输入手机号");
            $("input[name=validation]").val("");
            var tel = $("input[name=phone]").val(); //获取手机号
            var telReg = !!tel.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            if (telReg != true) {
                $("input[name=phone]").next("span").html("请输入正确电话号码")
            }
            else {
                $.ajax({
                    type: "post",
                    url: "/KNERP/a/weixin/findByTelNum",
                    data: {telNum: tel},
                    beforeSend: function () {

                    },
                    success: function (data) {
                        var dataText=JSON.parse(data);
                        console.log(dataText);
                        if( dataText.error=="0000"){
                            $("input[name=phone]").next("span").html("该号码已被注册");
                            $("input[name=phone]").val("").attr("placeholder",tel)
                        }
                        else if (dataText.error=="0001"){
                            $.ajax({
                                type: "post",
                                url: "/KNERP/a/weixin/sendMsg",
                                data: {mobile: tel},
                                beforeSend: function () {
                                },
                                success: function (data) {
                                    var dataText=JSON.parse(data);
                                    console.log(dataText);
                                    var code=dataText.code;
                                    var Id=dataText.id;
                                    $("span.yanZ").html("");
                                    $(".yanZ").html( ""+code+"");
                                    $(".yanZ").attr("id",Id);

//                            inputName(".yanZ");//获取焦点触发事件
                                }
                            })
                        }
                        else{
                            alert("网络故障！发送错误信息");
                            setTimeout(function(){
                                window.location.href="register.html"
                            },1500)
                        }
                    }
                })
            }
        });
        function phone() {
            $(".yanZ").html("");
            var tel = $("input[name=phone]").val(); //获取手机号
            var validation = $("input[name=validation]").val();
            var id= $(".yanZ").attr("id");
            var telReg = !!tel.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            //如果手机号码匹配错误则不能通过验证
            if (telReg == false) {
                $('.phone_prompt').val('');
                $(".phone_prompt").html("请输入正确电话号码")
            }
            else if (validation == "") {
                $("input[name=validation]").next("span").html("验证码为空");
                setTimeout(function () {
                    $("input[name=validation]").next("span").html("");
                }, 500)
            }
            else{
                $.ajax({
                    type: "post",
                    url: "/KNERP/a/weixin/verPhone",
                    data: {mobile: tel, code: validation, id: id},
                    success: function (data) {
                        var dataText = JSON.parse(data);
                        console.log(dataText);
                        if (dataText.error == "0001") {
                            alert("注册成功！请稍候");
                            setTimeout(function () {
                                window.location.href = "message-complete.html?mobile=" + tel;
                            }, 500)
                        }
                        else if (dataText.error == "0002") {
                            $(".phone_prompt").html("该用户已存在");
                            $("input[name=phone]").val("");
                            setTimeout(function () {
                                $(".phone_prompt").html("");
                            }, 1000)
                        }
                        else if(dataText.error == "0005"){
                            $("span.yanZ").html("验证码错误");
                            $("input[name=validation]").val("")
                            setTimeout(function () {
                                $("input[name=validation]").next("span").html("");
                            }, 500)
                        }
                    }

                })
            }
        }
        $("button").click(function(e) {
            e.stopPropagation();//阻止冒泡
            if($("input[name=phone]").val().length==0){//                验证手机号码长度
                $(".phone_prompt").html("手机号不能为空")
            }
            else{
               phone()
            }
        })
    })
})();
