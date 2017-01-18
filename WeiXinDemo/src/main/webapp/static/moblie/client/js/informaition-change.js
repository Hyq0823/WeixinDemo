/**
 * Created by 1 on 2017/1/3.
 */
var initIds = {};
function reading(){
    $("input").blur();
    var cuS = $("input[name=custName]").val();
    var address = $("input[name=address_input]").val();
    var idNumber = $("input[name=idNumber]").val();
    var _sex = $("input[name=_sex_input]").val();
    var _sexID=$("#_sex_son span").attr("_sexId");
    var a = ( cuS != "" && address != "" && idNumber != ""&& _sex!= "");
    if (a) {
        var test_id=window.location.href.split("=")[1];
        var data = $.extend( {
            "custName": cuS, "idCardNum": idNumber, "sex": _sexID,
            "id":test_id,photo:$("#photo").val()
        },initIds);

        $.ajax({
            type: "post",
            url: "/KNERP/a/weixin/updateUser",
            data: data,
            success: function (data) {
                console.log(data);
                $(".tishi").css({"display":"block"});
                setTimeout(function(){
                    $(".tishi").css({"display":"none"});
                    window.location.href="Personal-information.html?id="+test_id;

                },1500);

            }, error: function () {

                window.location.href="information-change.html?id="+test_id;
            }
        });
    }
//                ���������Ϊ�յ����
    else {
        function className(className) {
//                        �������Ϊ��ʱ
            if ($(className).val() == "") {
                $(className).next("span").html("*����Ϊ��");
                setTimeout(function () {
                    $(className).next("span").html("");
                }, 1500)
            }
//                        �������Ϊ��ʱ
            else {
                $(className).next("span").html("");
            }
        }
        className(".cuS");
        className("._sex");
        className(".address_input");
    }
}
(function(){

//��ҳ�����ʱ����һ��ajax����
    var test_id = window.location.href.split("=")[1];


    $(".back").bind("click",function(){
        window.location.href="Personal-information.html?id="+test_id;
    })
    $("._sex").click(function(){
        $(this).next("ul").stop().slideToggle(200)
    });
    var url='/KNERP/a/weixin/getCustUser';

    $.ajax({
        type:"post",
        url:url,
        data: {"id":test_id},
        async:true,
        success:function(data){
            var dataT=JSON.parse(data);

            console.log(dataT);
            var arry="";
            for(var i=0;i<9;i++){
                var area = "area"+(i+1);
                var name = area+"Name";
                var nameId = area+"Id";
//                        var tep=dataT[name];
                if(!dataT[name]){
                    break;
                }
                initIds[area] = dataT[nameId];
                console.log(initIds);
                arry+=dataT[name];
            }
            $("#address_son").html(""+arry+"");
            $("input[name=custName]").val(dataT.custName).css("color","#aaa");
            $("input[name=idNumber]").val(dataT.idCardNum).css("color","#aaa");
            $("#view").css({"background-image":"url("+dataT.photo+")"});
            $("#photo").val(dataT.photo);

//                �ж��Ա�
            if(dataT.sex==1){
                $("#_sex_son>span").html("��");
                $("input[name=_sex_input]").val("��");
                $("#_sex_son").html("<span _sexId='1'>��</span>");
                $(".com_ul>li:first-child").css({"background-color":"rgb(221, 221, 221)"})
            }
            else if(dataT.sex==2){
                $("#_sex_son>span").html("Ů");
                $("input[name=_sex_input]").val("Ů");
                $("#_sex_son").html("<span _sexId='2'>Ů</span>");

                $(".com_ul>li:nth-child(2)").css({"background-color":"rgb(221, 221, 221)"})
            }

            $("input[name=address_input]").val(""+arry+"");
            //�ύ
            $(".row .reading_tijiao").click(function () {
                reading()
            });
            document.onkeydown = function () {
                if (event.keyCode == 13) {
                    reading()
                }
            };
        }
    });
})();


function sheng(parentId) {
    var url = "/KNERP/a/sys/area/findByParentId";
    $.ajax({
        type: "post",
        url: url,
        data: {"parentId": parentId},
        beforeSend: function () {//ʡ����������ǰ�Ĵ���
            insert();
        },
        success: function (data) {
            $(this).prev("div.nav_second").find("span:nth-child(2)").toggleClass("active");//�л���ͷ����
            var name = $("#" + parentId).html();
            $("#" + parentId).parent().prev().html("<span class='span' nameId='" + parentId + "'>" + name + "</span><span class='ion-chevron-right nav_select'></span>");
            $("#" + parentId).siblings("li").css({"background-color": "#fff"});
            $("#" + parentId).css({"background-color": "#ccc"});
            $("#" + parentId).parent().nextAll("div.nav_second").remove();//���׺����div.nav_secondȫ��ɾ��
            $("#" + parentId).parent().nextAll("ul").remove();//���׺����ulȫ��ɾ��
            if (data != "") {
                $("#" + parentId).parent().slideUp(20);
                $(".nav").append("" +
                "<div class='nav_second' style='background-color: #fff'>" +
                "<span class='span'>��ѡ��</span>" +
                "<span class='ion-chevron-right nav_select active'>" +
                "</span></div>");
                $(".nav").append("  <ul class='com_ul' id='ul_" + parentId + "' ></ul>");
                for (var i = 0; i <data.length; i++) {
                    var str = "<li class='ss" + data[i].id + "' id=" + data[i].id + " onclick='sheng(\"" + data[i].id + "\")'>" + data[i].name + "</li>";
                    $("#ul_" + parentId).append(str);
                    $(".FooterFather").hide()
                }
                insert();
            }
            else {
                $("#" + parentId).parent().slideUp(20);
                $(".nav").append("");
                $(".FooterFather").slideDown(500);//����������Ϊ��ʱ��������ַ�ύ��ť
                $(".FooterFather").click(function () {
                    $("#address_son").html("");
                    var arr = new Array(9);
                    for (var i = 0; i < 9; i++) {
                        arr[i] = {name: "", id: ""};
                        arr[i].id = $(".span").eq(i).attr("nameId");
                    }
                    var arrName = "";
                    for (var i = 0; i < arr.length; i++) {
                        arr[i].name = $("span.span").eq(i).html();
                        if(!arr[i].name){
                            break;
                        }
                        arrName+=arr[i].name
                    }

                    $("#address_son").html(arrName);//��ַ��
                    $("input[name=address_input]").val(arrName);//��ַ�����ص������
                    set();
                    $("#ti_Jiao").addClass("moment_tijiao").removeClass("reading_tijiao");
                    $(".moment_tijiao").unbind("click").click(function () {
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
                        var _sex = $("input[name=_sex_input]").val();
                        var _sexID=$("#_sex_son span").attr("_sexId");
                        var a = ( cuS != "" && address != "" && idNumber != ""&& _sex!= "");
                        //�������Ϊ��ʱ
                        if (a) {
                            var test_id=window.location.href.split("=")[1];
                            console.log(_sexID);
                            var data = {
                                "custName": cuS, "idCardNum": idNumber, "sex": _sexID,
                                "id":test_id,photo:$("#photo").val()
                            };
                            for(var i = 0 ; i < areaArray.length;i++){
                                var name="area"+(i+1);
                                data[name]=areaArray[i].id;
                                console.log(data[name]);
                            }
                            $.ajax({
                                type: "post",
                                url: "/KNERP/a/weixin/updateUser",
                                data: data,
                                success: function (data) {
                                    console.log(data);
                                    $(".tishi").css({"display":"block"});
                                    setTimeout(function(){
                                        $(".tishi").css({"display":"none"});
                                        window.location.href="Personal-information.html?id="+test_id;
                                    },1500);
                                }, error: function () {
                                    window.location.href = "informaition-change.html?id="+test_id;
                                }
                            });
                        }
//                          ���������Ϊ�յ����
                        else {
                            function className(className) {
//                        �������Ϊ��ʱ
                                if ($(className).val() == "") {
                                    $(className).next("span").html("*����Ϊ��");
                                    setTimeout(function () {
                                        $(className).next("span").html("");
                                    }, 1500)
                                }
//                        �������Ϊ��ʱ
                                else {
                                    $(className).next("span").html("");
                                }
                            }
                            className(".cuS");
                            className("._sex");
                            className(".address_input");
                        }
                    }
                    $(".message_wrap").slideUp(500);
                    $("#main_wrap").slideDown(500);
                });
                insert();
            }
        }
    });
}
sheng("1");//ҳ��������ʱ������ִ��һ�Σ�����ʡ�ݡ�
( function(){

})();

function insert() {
    $(".nav_second").click(function () {
        $(this).next("ul").stop().slideToggle(500).siblings("ul").slideUp(100);
//            �����л�
        $(this).find("span:nth-child(2)").toggleClass("active");//�л���ͷ����
        $(this).nextAll("div.nav_second").find("span:nth-child(2)").removeClass("active");
    })
}

//������ҳ��ַ�Ŀ��
(function(){
    $("#address_son").width($(".address").width() - 160 + "px");
    $(".address_input").width($(".address_son").width() - 28);
})();
function set(){

    $(function () {

        $("._sex").next("ul").hide();

        $("._sex").next("ul").find("li").click(function(){
            $(this).siblings("li").css({"background-color":"#fff"});
            $(this).css({"background-color":"#ddd"});
            $(this).parent("ul").slideUp(200);
            var name_sex=$(this).html();
            var _sexID=$(this).attr("_sexid");
            $("._sex_input").val( name_sex);
            $("._sex_son").html("<span _sexid='"+_sexID+"'>"+ name_sex+"</span>");
        });
        $("input[name=idNumber]").blur(function () {
            var idNumber = $("input[name=idNumber]").val();
            validateIdCard(idNumber);
        });
        $(".back").click(function () {
            $(".message_wrap").slideUp(500);
            $("#main_wrap").slideDown(500);
//                $(".com_ul li").slideUp();

        });//ģ�������

        $(".message_wrap").hide();
        //    ��ֹ����ո�

        function inputName(Name) {
            $(Name).on("focus", function () {
                $(this).next("span").html("");
            });
        }
        inputName(".cuS");
        inputName("._sex");
        inputName(".address");

        //ҳ��������ʱ#uli1��ѡ�ȫ������
        $(".address").click(function () {
            $("#main_wrap").slideUp(500);
            $(".message_wrap").css({"transition": "all 0.01s liner", "margin-top": "0"}).slideDown(199);
        });


    });
}
set()