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

            //�������Ϊ��ʱ
            if(a){
                //�������Ϊ��ʱ�ж��޸������Ƿ�һ��;
                if(oldPwd==newPwd){
                    $("input").next("span").html("");
                    $(".second").next("span").html("*�����벻�����������ͬ")
                }
                else if(newPwd!=repeatPwd){
                    $(".last").next("span").html("*ǰ��һ��")
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
                                $(".first").next("span").html("*���������")
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
            //�������ڿ�ʱ
            else{
                function className(className) {
                    if($(className).val()==""){
                        $(className).next("span").html("*����Ϊ��");
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
//            �����¼�
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