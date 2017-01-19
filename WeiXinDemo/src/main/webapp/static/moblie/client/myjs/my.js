
   //每个菜单跳转的 页面上引入这个js来拉取授权

	//从微信菜单url后面取值，跳转菜单时微信带上的code
    function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
    
    var code = GetQueryString("code");
    var menuType = GetQueryString("menuType");
    console.log("code: "+code+"   menuType: "+menuType);
    
    var openId = "";
    var unionId = "";
    var userId = "";
    if(window.localStorage){//
    	openId = localStorage.getItem("openId");
    	unionId = localStorage.getItem("unionId");
    	userId = localStorage.getItem("userId");
    	
    	console.log("厉害： 取到localStorage中的值了： openId:"+openId+"  unionId:"+unionId+"  userId:"+userId);
    	alert("首次进入： 取到localStorage中的值了： openId:"+openId+"  unionId:"+unionId+"  userId:"+userId);
    }else{
    	alert("浏览器不支持localStorage!");
    	//alert("浏览器不支持localStorage!");
    }
    
    alert("发起ajax请求前弹出openId:["+openId+"]");
     if(typeof(openId)==undefined || openId==null || openId ==""){//如果没有openid则需要拉取授权
	      $.ajax({
	    	  type: "POST",
	    	  url: "http://ougwo57463.java.myjava.wang/Demo/authorization",
	    	  async:true,//测试改为异步，发布时改为同步
	    	  dataType: "json",
	    	  data:{"code":code,"menuType":menuType},
	    	  success:function(result){
	    		  console.log(result.error);
	    		  if(result.error == "0032" || result.error=="0033"){
	    			  alert(result.msg);
	    			  WeixinJSBridge.call("closeWindow");//关闭微信浏览器
	    		  }
	    		  //存储数据
	    		  if(result.error == "0000"){
	    			  localStorage.setItem("userId",result.data.userId);
	    		  }
	    		  localStorage.setItem("unionId",result.data.unionId);
	    		  localStorage.setItem("openId",result.data.openId);
	    		  
	    		  alert("ajax请求： 取到localStorage中的值了： openId:"+localStorage.getItem("openId")
	    				  +"  unionId:"+localStorage.getItem("unionId")+"  userId:"+localStorage.getItem("userId"));
	    		  
	    		 // window.location.href="http://ougwo57463.java.myjava.wang/Demo/static/moblie/client/pages/message-complete.html?openId="
	    			//	  +result.data.openId+"&unionId="+result.data.unionId+"&phone=18381307126";
	    		 // window.location.href="http://localhost:8080/WeiXinDemo/static/moblie/client/pages/Order-List.html"
	    	  },error:function(result){
	    		  alert("错误:"+result);
	    		  WeixinJSBridge.call("closeWindow");//这句用来关闭微信浏览器界面
	    	  }
	
	      });
     }else{
    	// $("#a_login").attr("href","login.html");
     }