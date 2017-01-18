/*手机号码验证*/
function phone() {
    var tel = $("#phones").val(); //获取手机号
    var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    //如果手机号码匹配错误则不能通过验证
    if (telReg == false) {
        $('#phones').val('');
        $('#phones').attr('placeholder','请输入正确的电话号码！');
    }
}
function userName(){
    var uName = $("#userNames").val(); //获取姓名
    var nameReg = !!uName.match(/[\u4e00-\u9fa5]/);
    //如果姓名错误则不能通过验证
    if (nameReg == false) {
        $('#userNames').val('');
        $('#userNames').attr('placeholder','请输入真实姓名！');
    }
}
function IDcard(){
    var IDc = $("#IDcards").val(); //获取姓名
    var IDcReg = !!IDc.match(/\d{17}[\d|x]|\d{15}/);
    //如果身份证号错误则不能通过验证
    if (IDcReg == false) {
        $('#IDcards').val('');
        $('#IDcards').attr('placeholder','请输入正确的身份证号！');
    }
}