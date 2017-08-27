package servlet;

import constrant.ConstUtils;
import constrant.SysUtils;
import demo.WeixinUtils;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet implementation class AuthServlet
 */
public class AuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AuthServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String code = request.getParameter("code");
	    String menuType = request.getParameter("menuType");
	    String result = authorization(code,menuType);
	    
	    System.out.println(result);
	    System.out.println();
	    System.out.println(result);
//	    request.setAttribute("message",result);
//	    request.getRequestDispatcher("/index.jsp").forward(request, response);
	    PrintWriter out = null;
	    try{
	        response.setContentType("application/json;charset=utf8");
	        out = response.getWriter();
	        out.write(result);
	        out.flush();
	    }catch(Exception e){
	        e.printStackTrace();
	    }finally{
	        if(out!=null){
	            out.close();
	        }
	    }
	}
	
	/**
     * 授权
     * @return
     * @author hyq
     */
    public String authorization(String code,String menuType) {
        Map<String,String> data = new HashMap<>();
        try {
            
            //获取access_token
            JSONObject access_data = WeixinUtils.code4accessToken(code);
            String openid = access_data.getString("openid");
            String access_token = access_data.getString("access_token");
            
            // 拉取用户信息
            JSONObject userInfo = WeixinUtils.access_token4UserInfo(openid,access_token);
            String open_id = userInfo.getString("openid");
            String unionId = userInfo.has("unionid")?userInfo.getString("unionid"):"";
//            UnionId union = unionIdService.getByOpenId(open_id);
            
            //返回数据
            data.put("openId",open_id);
            data.put("unionId",unionId);
            
            //如果是注册或绑定登录,直接放行

            //已经鉴权过了,放行,返回用户信息
//            if(union != null && StringUtils.isNotEmpty(union.getCustId())){
//                unionIdService.updateOpenId(union.getId(),open_id);//TODO　opneId是否需要更新
//                 data.put("userId", union.getCustId());//返回userId
//                 
//                return SysUtils.getWeixinJson(ConstUtils.ERROR_0,ConstUtils.ERROR_MSG_0000, data);
//            }
        } catch (Exception e) {
//            logger.error("鉴权异常!错误：{},详细:{}",e.getMessage(),e);
            return SysUtils.getWeixinJson(ConstUtils.ERROR_9999, e.getMessage(), data);
        }
        return SysUtils.getWeixinJson(ConstUtils.WeiXIN_CODE_AUTH, ConstUtils.WEXIN_MSG_AUTH, data);
    }
    

}
