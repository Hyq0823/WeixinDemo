package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import constrant.ConstUtils;
import constrant.SysUtils;
import demo.WeixinUtils;

/**
 * Servlet implementation class WeixinServlet
 */
public class WeixinServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.getWriter().append("Served at: ").append(request.getContextPath());
	    doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    auth(request, response);
	}
	
	/**
     * 微信签名
     * 
     */
    public void auth(HttpServletRequest request, HttpServletResponse response) {
        
        // 微信加密签名
        String signature = request.getParameter("signature");
        // 时间戳
        String timestamp = request.getParameter("timestamp");
        // 随机数
        String nonce = request.getParameter("nonce");
        // 随机字符串
        String echostr = request.getParameter("echostr");
        
        
        System.out.println("进入签名  参数："+signature +" timestap "+timestamp+"  随机字符"+echostr);
        
        PrintWriter out = null;
        try {
            out = response.getWriter();
            if (WeixinUtils.checkSignature(signature, timestamp, nonce)) {
                out.print(echostr);
            } else {
               System.out.println("校验失败!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.close();
            }
        }

    }
    
  
    //============================================================

}
