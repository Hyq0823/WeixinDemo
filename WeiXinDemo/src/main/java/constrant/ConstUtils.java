package constrant;


public class ConstUtils {
    
    public static final String UTF_8 = "UTF-8";
    
    public static final String CONTENT_TYPE = "application/json";

    public static final String CONTENT_TYPE_UTF8 = "application/json; charset=UTF-8";
    
    /**
     * 分隔符&
     */
    public static final String SPLIT1 = "&";
    
    /**
     * 分隔符*
     */
    public static final String SPLIT2 = "*";
    
    /**
     * 错误
     */
    public static final String ERROR = "error";
    public static final String MSG = "msg";
    /** 字符串:getErrorMsg */
    public static final String MSG_HEAD = "getErrorMsg";

    public static final String ERROR_CODE = "errcode";
    public static final String ERROR_MSG = "errmsg";
    public static final String RESPONSE_DATA = "data";

    // ---------------- 错误码类型  begin  ------------------
    /**
     * 错误码：操作成功
     */
    public static final String ERROR_0 = "0000";
    public static final String ERROR_MSG_0000 = "操作成功";
    
    
    /**
     * 错误码：数据不存在
     */
    public static final String ERROR_1 = "0001";
    public static final String ERROR_MSG_0001 = "数据不存在";

    /**
     * 错误码：参数不能为空
     */
    public static final String ERROR_2 = "0002";
    public static final String ERROR_MSG_0002 = "参数不能为空";
    
    /**
     * 错误码：旧密码错误
     */
    public static final String ERROR_3 = "0003";
    public static final String ERROR_MSG_0003 = "旧密码错误";
    
    /**
     * 错误码：验证码失效
     */
    public static final String ERROR_4 = "0004";
    public static final String ERROR_MSG_0004 = "验证码失效";
    
    /**
     * 错误码：验证码错误
     */
    public static final String ERROR_5 = "0005";
    public static final String ERROR_MSG_0005 = "验证码错误";
    
    /**
     * 错误码：用户不存在，但该手机号已经被注册
     */
    public static final String ERROR_6 = "0006";
    public static final String ERROR_MSG_0006 = "用户不存在，但该手机号已经被注册";
    
    /**
     * 错误码：司机不存在
     */
    public static final String ERROR_7 = "0007";
    public static final String ERROR_MSG_0007 = "司机不存在";
    
    /**
     * 错误码：车辆不存在
     */
    public static final String ERROR_8 = "0008";
    public static final String ERROR_MSG_0008 = "车辆不存在";
    
    /**
     * 错误码：没有记录
     */
    public static final String ERROR_9 = "0009";
    public static final String ERROR_MSG_0009 = "暂无记录";
    
    /**
     * 错误码：json消息格式有误，转换失败
     */
    public static final String ERROR_10 = "0010";
    public static final String ERROR_MSG_0010 = "json消息格式有误，转换失败";

    /**
     * 错误码：json消息缺少参数错误
     */
    public static final String ERROR_11 = "0011";
    public static final String ERROR_MSG_0011 = "json消息缺少参数错误";
    
    /**
     * 错误码：参数错误
     */
    public static final String ERROR_12 = "0012";
    public static final String ERROR_MSG_0012 = "参数错误";
    
    /**
     * 错误码：信息已被注册
     */
    public static final String ERROR_13 = "0013";
    public static final String ERROR_MSG_0013 = "信息已被注册";
    
    /**
     * 错误码：订单已被其它人接收
     */
    public static final String ERROR_14 = "0014";
    public static final String ERROR_MSG_0014 = "订单已被其它人接收";
    
    /**
     * 错误码：订单转派中
     */
    public static final String ERROR_15 = "0015";
    public static final String ERROR_MSG_0015 = "订单转派中";
    
    /**
     * 错误码：订单转派中
     */
    public static final String ERROR_16 = "0016";
    public static final String ERROR_MSG_0016 = "本机构无可换车辆";
    
    /**
     * 错误码：该订单不在转派中
     */
    public static final String ERROR_17 = "0017";
    public static final String ERROR_MSG_0017 = "该订单不在转派中";
    
    /**
     * 错误码：申请尚在审核中，请联系管理员处理。
     */
    public static final String ERROR_18 = "0018";
    public static final String ERROR_MSG_0018 = "申请尚在审核中，请联系管理员处理。";
    
    /**
     * 错误码：申请被拒绝，请自行处理。
     */
    public static final String ERROR_19 = "0019";
    public static final String ERROR_MSG_0019 = "申请被拒绝，请自行处理。";
    
    /**
     * 错误码：数据错误,请联系开发商.
     */
    public static final String ERROR_20 = "0020";
    public static final String ERROR_MSG_0020 = "数据错误,请联系开发商.";
    

    /**
     *错误码：处置单被处理，明细信息    
     */
    public static final String ERROR_250 ="0250";
    public static final String ERROR_MSG_0250 ="处置单已被处理，明细信息取消保存 ，图片保存成功。";
    

    /**
     * 错误码：客户端参数数据错误，请联系开发商..
     */
    public static final String ERROR_21 = "0021";
    public static final String ERROR_MSG_0021 = "客户端参数数据错误，请联系开发商.";
    

     /**
      *  错误码：系统错误
      */
    public static final String ERROR_9999 = "9999";
    public static final String ERROR_MSG_9999 = "系统错误";
    
    
    public static String getErrorMsg0000() {
        return ERROR_MSG_0000;
    }
    
    public static String getErrorMsg0001() {
        return ERROR_MSG_0001;
    }
    
    public static String getErrorMsg0002() {
        return ERROR_MSG_0002;
    }

    public static String getErrorMsg0003() {
        return ERROR_MSG_0003;
    }

    public static String getErrorMsg0004() {
        return ERROR_MSG_0004;
    }

    public static String getErrorMsg0005() {
        return ERROR_MSG_0005;
    }

    public static String getErrorMsg0006() {
        return ERROR_MSG_0006;
    }

    public static String getErrorMsg0007() {
        return ERROR_MSG_0007;
    }

    public static String getErrorMsg0008() {
        return ERROR_MSG_0008;
    }

    public static String getErrorMsg0009() {
        return ERROR_MSG_0009;
    }
    
    public static String getErrorMsg0010() {
        return ERROR_MSG_0010;
    }

    public static String getErrorMsg0011() {
        return ERROR_MSG_0011;
    }

    public static String getErrorMsg0012() {
        return ERROR_MSG_0012;
    }

    public static String getErrorMsg0013() {
        return ERROR_MSG_0013;
    }

    public static String getErrorMsg0014() {
        return ERROR_MSG_0014;
    }

    public static String getErrorMsg0015() {
        return ERROR_MSG_0015;
    }

    public static String getErrorMsg9999() {
        return ERROR_MSG_9999;
    }
    
    
    

    
    // ---------------- 错误码类型  end  ------------------
    
    
    
    
    
    // ---------------- 信鸽推送消息类型  begin  ------------------

    /**
     * 信鸽推送消息类型1- 待接订单消息
     */
    public static final String PUSH_MSG_TYPE_1 = "1";
    public static final String PUSH_MSG_TYPE_MSG_1 = "待接订单消息";

    /**
     * 信鸽推送消息类型2-    转派订单消息
     */
    public static final String PUSH_MSG_TYPE_2 = "2";
    public static final String PUSH_MSG_TYPE_MSG_2 = "转派订单消息";

    /**
     * 信鸽推送消息类型3-    换车消息
     */
    public static final String PUSH_MSG_TYPE_3 = "3";
    public static final String PUSH_MSG_TYPE_MSG_3 = "换车消息";

    /**
     * 信鸽推送消息类型4- 换线路司机消息
     */
    public static final String PUSH_MSG_TYPE_4 = "4";
    public static final String PUSH_MSG_TYPE_MSG_4 = "换线路司机消息";
    
    /**
     * 信鸽推送消息类型99- 系统消息
     */
    public static final String PUSH_MSG_TYPE_99 = "99";
    public static final String PUSH_MSG_TYPE_MSG_99 = "系统消息";


    public static String getErrorMsg0016() {
        return ERROR_MSG_0016;
    }

    public static String getErrorMsg0017() {
        return ERROR_MSG_0017;
    }

    public static String getErrorMsg0018() {
        return ERROR_MSG_0018;
    }

    public static String getErrorMsg0019() {
        return ERROR_MSG_0019;
    }

    public static String getErrorMsg0020() {
        return ERROR_MSG_0020;
    }

    public static String getErrorMsg0021() {
        return ERROR_MSG_0021;
    }

    // ---------------- 信鸽推送消息类型  end  ------------------
    
    
    //=====================微信接口消息类型=====================================
    /**
     * - 需要鉴权
     */
    public static final String WeiXIN_CODE_AUTH = "0030";
    public static final String WEXIN_MSG_AUTH = "请先鉴权";
    
    /**
     * - 登录或注册放行
     */
    public static final String WeiXIN_CODE_RELEASE = "0031";
    public static final String WEXIN_MSG_RELEASE = "登录或注册放行！";
    
    /**
     * - 微信无效的code
     */
    public static final String WeiXIN_CODE_INVALID = "0032";
    public static final String WEXIN_MSG_INVALID = "无效的微信code！";
    
    /**
     * - 微信无效的openid
     */
    public static final String WeiXIN_CODE_OPENID = "0033";
    public static final String WEXIN_MSG_OPENID = "无效的微信openId！";
    
    //=====================微信接口消息类型end=====================================
    
    
}
