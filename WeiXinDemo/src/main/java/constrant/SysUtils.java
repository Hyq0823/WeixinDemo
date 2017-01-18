package constrant;


import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;





/**
 * 操作system.properties的工具类
 * @author c
 *
 */
public class SysUtils {
	
	
	
	
	public static void main(String[] args) {
//		String name = SysUtils.getPropertyByName("wexin.appid");
//		System.out.println(name);
		Map map = new HashMap<>();
		map.put("u", 1);
		map.put("openid",123);
		String string = getWeixinJson(ConstUtils.ERROR_0,ConstUtils.ERROR_MSG_0000, map);
		System.out.println(string);
	}



	
	/**
	 * 拼接错误码消息
	 * 
	 * @param error
	 *            错误码
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 */
	public static String getErrorJson(String error){
		JSONObject result = new JSONObject();
		result.put(ConstUtils.ERROR, error);
		try {
			Class<?> class1 = Class.forName("com.spzh.soft.modules.sys.utils.ConstUtils");
			String name = ConstUtils.MSG_HEAD+error;
//			System.out.println(class1.getMethod(name));
			Method method = class1.getMethod(name);
			String errorMsg = String.valueOf(method.invoke(class1, null));
			result.put(ConstUtils.MSG,errorMsg);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toString();
	}
	
	
	/**
	 * 微信接口返回数据封装
	 * @param errorCode 错误码
	 * @param errorMsg 消息
	 * @param dataMap 内容
	 * @return {"error":"0000","msg":"操作成功","data":{"u":1,"openid":123}}
	 * 
	 */
	public static String getWeixinJson(String errorCode,String errorMsg,Map<?,?> dataMap){
		JSONObject result = new JSONObject();
		result.put(ConstUtils.ERROR,errorCode);
		result.put(ConstUtils.MSG, errorMsg);
		result.put("data", dataMap);
		return result.toString();
	}
	
	
}
