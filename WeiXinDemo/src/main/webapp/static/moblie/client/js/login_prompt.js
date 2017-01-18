/**
 * Created by 1 on 2016/12/6.
 */
/**
 * Created by 1 on 2016/12/6.
 */
(function(){
    $(function(){
        //    禁止输入空格
        $("input").on("keyup",function(){
            this.value=this.value.replace(/^ +| +$/g,'')
        })
        $("input[name=phone]").on("focus",function() {
            $(".phone_prompt").html("")
        })

        $("input[name=password]").on("focus",function(){
            $(this).next("span").html("")
        })
        function phone() {
            var tel = $("input[name=phone]").val(); //获取手机号
            var telReg = !!tel.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            //如果手机号码匹配错误则不能通过验证
            if (telReg == false) {
                $('.phone_prompt').val('');
                $(".phone_prompt").html("请输入正确电话号码")

            }
        }
        $("button").click(function(e) {
            e.stopPropagation()//阻止冒泡
//                验证手机号码长度

            if($("input[name=phone]").val().length==0){
                $(".phone_prompt").html("手机号不能为空")




            }

            else{

                if($("input[name=phone]").val().length>0){
                    phone()
                    if($("input[name=password]").val()==""){
                        $("input[name=password]").next("span").html("密码不能为空")
                    }
                    else{
                        $.ajax({
                            type:"get",
                            dataType:""
                        })
                    }
                }
                // if()

            }
        })
    })
})()