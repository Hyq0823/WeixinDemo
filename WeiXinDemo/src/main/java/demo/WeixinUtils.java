package demo;

import org.json.JSONObject;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;




public class WeixinUtils {
	
	
	
	
	
	//==========================================================================================
	
	public static final String AUTHTOKEN ="hyq";//接入token
    public static final String APPID = "wx6656cf304ddb0564";
    public static final String APPSECRET = "ccad802267356fabec5f90bd3663808e";

	
	
	/**
	 * 签名校验
	 * @param signature
	 * @param timestamp
	 * @param nonce
	 * @return
	 */
	public static boolean checkSignature(String signature, String timestamp,
			String nonce) {
		 String[] arr = new String[] { AUTHTOKEN, timestamp, nonce };
	        Arrays.sort(arr);
	        StringBuilder content = new StringBuilder();
	        for (int i = 0; i < arr.length; i++) {
	            content.append(arr[i]);
	        }
	        String tmpStr = SHA1(content.toString());
	        return tmpStr != null ? tmpStr.equalsIgnoreCase(signature) : false;
	}


    /**
	 * code换取access_token
	 * @author hyq
	 * @param code
	 *  " https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code ";
	 * @return
	 * @throws Exception 
	 */
	public static JSONObject code4accessToken(String code) throws Exception {
		StringBuffer sbUrl = new StringBuffer();
		sbUrl.append("https://api.weixin.qq.com/sns/oauth2/access_token")
			 .append("?")
                .append("appid=").append(APPID)
                .append("&secret=").append(APPSECRET)
                .append("&code=").append(code)
			 .append("&grant_type=").append("authorization_code");
		String receive = HttpUtils.doGet(sbUrl.toString());
		JSONObject data = new JSONObject(receive);
		if(data.has("errcode")){//TODO CODe无效的处理
			System.out.println(data.get("errcode")+" 信息:"+data.get("errmsg"));
			throw new Exception("微信，无效的code！");
		}
		
		System.out.println("拉取access_token util: "+data);
		return data;
	}
	
	
	/**
	 * 拉取用户信息
	 * @author hyq
	 * @param openid
     *  https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
     * @return
	 * @throws Exception 
	 */
	public static JSONObject access_token4UserInfo(String openid,String access_token) throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append("https://api.weixin.qq.com/sns/userinfo?access_token=").append(access_token)
		  .append("&openid=").append(openid)
		  .append("&lang=").append("zh_CN");
		String result = HttpUtils.doGet(sb.toString());
		JSONObject data = new JSONObject(result);
		if(data.has("errcode")){//TODO openid无效
			System.out.println(data.get("errcode")+" 信息:"+data.get("errmsg"));
			throw new Exception("微信，无效的openid!");
		}
		System.out.println("拉取用户 util: "+data);
		return data;
	}
	
	
	
	
	
	
	
	//==========================================================================================
	
	
	

	private static String SHA1(String decript) {
        try {
            MessageDigest digest = java.security.MessageDigest
                    .getInstance("SHA-1");
            digest.update(decript.getBytes());
            byte messageDigest[] = digest.digest();
            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            // 字节数组转换为 十六进制 数
            for (int i = 0; i < messageDigest.length; i++) {
                String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
                if (shaHex.length() < 2) {
                    hexString.append(0);
                }
                hexString.append(shaHex);
            }
            return hexString.toString();
 
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }
	
	
        

	


	








	

	
}
