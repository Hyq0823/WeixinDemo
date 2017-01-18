/**
 * Created by 1 on 2017/1/3.
 */
var id = window.location.href.split("=")[1];

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
        $("#name").html("<span>"+data.custName+"</span>");
        $("#idCardNum").html("<span>"+data.idCardNum+"</span>");
        $(".background").css({"background-image":"url("+data.photo+")"});
        var ar="";
        for(var i=0;i<9;i++){
            var name="area"+(i+1)+"Name";
            var temp= data[name];

            if(!temp){
                break;
            }
            ar+=temp;
        }
        $("#address_son").html("<span>"+ar+"</span>");
        $(".tel").attr("id",data.telNum);
        //判断男女
        if(data.sex=="2"){
            $("#sex").html("女")
        }
        else if(data.sex=="1"){
            $("#sex").html("男")
        }
    }
});


angular.module('ionics', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {

            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller( 'personalSelect',['$scope','$ionicActionSheet','$timeout' ,function($scope,$ionicActionSheet,$timeout){
        $scope.show = function() {
            var tel=document.getElementsByClassName("tel")[0];
            console.log(tel.id);
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<a href="informaition-change.html" style="text-decoration: none;color: #71b32D">修改信息</a>' },
                    { text: '<a href="Change-Password.html" style="text-decoration: none;color: #71b32D">修改密码</a>' }
                ],
                cancelText: 'Cancel',
                buttonClicked: function(index) {
                    if(index == 0){
                        window.location.href = 'informaition-change.html?id='+id;
                    }else if(index == 1){
                        window.location.href = 'Change-Password.html?id='+id;
                    }
                    return true;
                }
            });
            $timeout(function() {
                hideSheet();
            }, 20000);
        };
    }]);


(function(){
    $(".ion-chevron-left").bind("click",function(){
        window.location.href=""
    });
    $("#address_son").width($(".address").width() - 120 + "px");
})();
