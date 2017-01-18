/**
 * Created by 1 on 2017/1/3.
 */
(function(){
    var id=window.location.href.split("=")[1];
    $(function(){
        $("a.back").attr("href","Personal-information.html?id="+id);
        $("a.forget").attr("href","Forgot-Password.html?id="+id);

        function inputName(Name){
            $(Name).on("focus",function() {
                $(this).next("span").html("");
            });
        }
        inputName(".first");
        inputName(".second");
        inputName(".last");
        function run(){
            $("input").blur();
            var oldPwd= $("input[name=oldPwd]").val();
            var repeatPwd= $("input[name=repeatPwd]").val();
            var newPwd= $("input[name=newPwd]").val();
            var a=(oldPwd!=""&&repeatPwd!=""&&newPwd!="");

            //当输入框不为空时
            if(a){
                //当输入框不为空时判断修改密码是否一致;
                if(oldPwd==newPwd){
                    $("input").next("span").html("");
                    $(".second").next("span").html("*新密码不能与旧密码相同")
                }
                else if(newPwd!=repeatPwd){
                    $(".last").next("span").html("*前后不一致")
                }

                else{
                    var _src=window.location.href.split("=")[1];
                    $("input").next("span").html("");
                    $.ajax({
                        type:"post",
                        url:"/KNERP/a/weixin/updatePwd",
                        data:{"id":id,"newPwd":newPwd,"oldPwd":oldPwd},
                        anysc:false,
                        success:function(data){
                            console.log(data);

                            var dataText=JSON.parse(data);
                            console.log(dataText);
                            if(dataText.error=="0001"){
                                $(".first").next("span").html("*旧密码错误")
                            }
                            window.location.href="Personal-information.html?="+_src;
                        },
                        error:function(data){
                            var dataText=JSON.parse(data);
                            console.log(dataText);
                            window.location.href="Change-Password.html?="+_src;
                        }
                    })
                };
            }
            //输入框存在空时
            else{
                function className(className) {
                    if($(className).val()==""){
                        $(className).next("span").html("*不能为空");
                    }
                    else{
                        $(className).next("span").html("");
                    }
                }
                className(".first");
                className(".second");
                className(".last");
            }
        }
//            触发事件
        $(".messageFooter").click(function(){
            run()
        })
        document.onkeydown = function() {
            if (event.keyCode == 13) {
                run();
            }
        };
    })
})(jQuery);