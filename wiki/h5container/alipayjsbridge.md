# AlipayJSBridge
- pubdate: 2014-03-06
- tags: 接口
- author: 左契
---

##接口调用前提

* 添加 AlipayJSBridgeReady 监听事件的作用
js bridge是在webview加载完成后才注入到页面中的，所以：
1、如果页面加载的过程中，就需要调用容器的接口显然是无法被处理的。这时候就需要将接口调用的代码统一放到AlipayJSBridgeReady的监听事件中去，js bridge注入完成后就可触发。
2、如果是通过事件触发，例如，点击某按钮、某链接才去调用容器的接口，那可以忽略此监听事件

* 代码示例( 新 )
<pre>
function AlipayJSBridgeReady(fn){
        if(window.AlipayJSBridge){
            fn();
        }else{
            document.addEventListener('AlipayJSBridgeReady',function(){
                fn();
            },false);
        }
}
</pre>

* 代码示例( 老 )
<pre>
//异步使用会影响监听事件无法被处理，不建议将该监听事件放到异步处理中，例如，不建议放在seajs.use中使用。
document.addEventListener('AlipayJSBridgeReady',function(){
		AlipayJSBridge.call('toast', {
                    content: 'toast测试'
                });
},false);
</pre>

* 接口测试页:<br/>
[http://ux.alipay-inc.com/test/alipayBridge/test.html http://ux.alipay-inc.com/test/alipayBridge/test.html]()

##接口示例##
### 获取网络状态 ###
* 为了方便开发者根据用户的网络状态来提供不同质量的服务，公众号可以在公众号内部的网页中使用JavaScript代码调用来获取网络状态。
* 代码示例
<pre>
 AlipayJSBridge.call('getNetworkType', function (result) {
	//result.err_msg
	// "network_type:wifi" wifi网络
	// "network_type:edge" 非wifi,包含3G/2G
	// "network_type:fail" 网络断开连接
	// "network_type:wwan"（2g或者3g）
});
</pre>

### 调用快捷支付 ###
* 该方法通过调用安全支付来进行支付操作

|参数|类型|描述|
|---|---|---|
| tradeNO| string| 订单流水号。多个订单流水号用";"隔开。|
| partnerID| string| 商户id，可选，默认为""|
| bizType| string| 交易类型，可选, 默认为""|
| bizSubType| string| 交易子类型，可选,  默认为""|
| displayPayResult| bool| 是否显示支付结果页. 可选. 默认为true|


* 代码示例
<pre>
AlipayJSBridge.call("tradePay",{
	tradeNO: "201209071234123221",
 	partnerID:"",
	bizType:"trade",
	bizSubType:""
}, function(result){
    /*
     * result为支付结果
     * result.resultCode 结果码，字符串，以下为常见值：
     *   "9000" 订单支付成功
     *   "8000" 正在处理中
     *   "4000" 订单支付失败
     *   "6001" 用户中途取消
     *   "6002" 网络连接出错
     * result.callbackUrl 支付完成以后跳转的url. 可能为空(""/null/undefined)
     */
});
</pre>

### 账户充值(钱包8.1可用) ###
* 唤起快捷进行账户充值

|参数名|类型|描述|
|---|---|---|
|displayPayResult| bool| 是否显示支付结果页. 可选. 默认为true|

* 代码示例
<pre>
AlipayJSBridge.call("deposit",{
    displayPayResult: false
}, function(result){
    /*
     * result为支付结果
     * result.resultCode 结果码，字符串，以下为常见值：
     *   "9000" 订单支付成功
     *   "8000" 正在处理中
     *   "4000" 订单支付失败
     *   "6001" 用户中途取消
     *   "6002" 网络连接出错
     * result.callbackUrl 支付完成以后跳转的url. 可能为空(""/null/undefined)
     */
});
</pre>

### startApp ###
* 启动app
* 代码示例
<pre>
AlipayJSBridge.call('startApp', {
	appId:'10000008',
	param:{
	}
});
</pre>

### postNotification ###
* 在钱包里广播消息
* 代码示例
<pre>
AlipayJSBridge.call('postNotification', {
	name:'notifyHomeRefresh'
});
</pre>
* 目前支持的消息名称列表固定，如下

|名称|含义|
|---|---|
| notifyHomeRefresh| 通知首页刷新公众号列表|

### 设置标题栏 ###
* 显示/隐藏标题栏
* 代码示例
<pre>
AlipayJSBridge.call("hideTitlebar");
AlipayJSBridge.call("showTitlebar");
</pre>

* 设置标题文字
* 注意：需要先保证标题栏是显示的
* 代码示例
<pre>
AlipayJSBridge.call('setTitle', {
	title:'券市场'
});
</pre>

* 设置标题右侧按钮及菜单
* 显示/隐藏网页右上角按钮
* 代码示例
<pre>
AlipayJSBridge.call("hideOptionMenu");
AlipayJSBridge.call("showOptionMenu");
</pre>

* 监听标题右侧按钮触发事件
* 代码示例
<pre>
document.addEventListener('optionMenu', function () {
	//回调事件
},false);
</pre>

* 设置标题栏右侧按钮属性
* 注意：需要先确认标题栏右侧按钮是显示的
* 代码示例
<pre>
AlipayJSBridge.call('setOptionMenu', {
	//按钮文字和图片只能选一个
	title : '按钮',
	icon : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',

});
</pre>
其他：暂不可用
//icon建议尺寸为40*40（支付宝钱包ios视觉规范），如果你不想费神，可只设置这一种值。
//如需对android不同分辨率做处理，目前支持普通（drawable）和高清（drawable-hdpi）两种
	'drawable' : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',
	'drawable-hdpi' : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png'

### 关闭webview ###
* 代码示例
<pre>
AlipayJSBridge.call("closeWebview");
</pre>

###  设置底部工具栏 ###
* 显示/隐藏工具栏
* 代码示例
<pre>
AlipayJSBridge.call("hideToolbar");
AlipayJSBridge.call("showToolbar");
</pre>

* 设置“更多”按钮
*

### pushWindow ###
* 打开新的webview窗口
* 代码示例
<pre>
AlipayJSBridge.call("pushWindow", {
	//只支持绝对路径，例：http://m.alipay.com，相对路径需要用户用JS来拼接成绝对路径
	url:'http://m.alipay.com',
	param:{
		readTitle : true, //是否读取页面中的title标签内容
		defaultTitle:'test xxx',
		showTitleBar:true, //显示/隐藏顶部标题栏
		showToolBar:false, //显示/隐藏底部工具栏
		showLoading:false, //显示/隐藏loading
		closeButtonText:'关闭2' //底部工具栏关闭按钮文字
	}
});
</pre>


### popWindow ###
* 关闭当前webview窗口
* 代码示例
<pre>
AlipayJSBridge.call("popWindow");
</pre>

### resume ###
* 事件说明
重新回到事件注册页面时触发

* 代码示例
监听事件
<pre>
document.addEventListener('resume', function(){
	console.log('resume');
},false);
</pre>

### toast ###
* 页面提示，3秒后消失
* 代码示例
<pre>
AlipayJSBridge.call("toast",{
	content:'您的号码输入错误'
});
</pre>

### loading ###
* 显示loading后，只有标题栏、工具栏可以操作
* 代码示例
<pre>
AlipayJSBridge.call('showLoading');
AlipayJSBridge.call('hideLoading');
</pre>
出loading时，应考虑页面不能操作的情况，此时是否应该显示toolbar，来防止页面长时间未响应而造成用户无法操作。

### login ###
* 唤起登录，有回调功能
* 代码示例
<pre>
AlipayJSBridge.call('login', function () {
    console.log('login success');
});
</pre>
此方法适合在alipay内部的运营页使用

###通讯录###
* 代码示例
<pre>
AlipayJSBridge.call('contact', function (result) {
    /*
	result:{
		name : 'XXX', //姓名
		mobile : '15088640308' //电话
	}
    */
});
</pre>

###发短信###
* 代码示例
<pre>
AlipayJSBridge.call('sendSMS', {
	mobile:'15088640308',
	content:'Hello, baby!'
}, function(result){
	/*
        result.status     //状态码，字符串，以下为常见值
        "Success"   发送成功
        "Failed"      发送失败，比如网络问题
        "Canceled"   取消发送
       */
});
</pre>

###分享###
* 代码示例
<pre>
AlipayJSBridge.call('share', {
    //只有一个分享渠道时，开启一键分享功能
    'channels': [{
        name: 'Weibo', //新浪微博
        param: {
            title: '分享的标题',
            content: '分享的内容',
            imageUrl: '分享的图片地址',
            captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先取当前屏幕截图)
            url: 'http://baidu.com' //分享跳转的url
        }
    }, {
        name: 'LaiwangContacts', //来往好友
        param: {
            title: '分享的标题',
            content: '分享的内容',
            imageUrl: '分享的图片地址',
            captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先取当前屏幕截图)
            url: 'http://baidu.com' //分享跳转的url
        }
    }, {
        name: 'LaiwangTimeline', //来往好友圈
        param: {
            title: '分享的标题',
            content: '分享的内容',
            imageUrl: '分享的图片地址',
            captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先取当前屏幕截图)
            url: 'http://baidu.com' //分享跳转的url
        }
    }, {
        name: 'Weixin', //微信
        param: {
            title: '分享的标题',
            content: '分享的内容',
            imageUrl: '分享的图片地址',
            captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先取当前屏幕截图)
            url: 'http://baidu.com' //分享跳转的url
        }
    }, {
        name: 'WeixinTimeLine', //微信朋友圈
        param: {
            title: '分享的标题',
            content: '分享的内容',
            imageUrl: '分享的图片地址',
            captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先取当前屏幕截图)
            url: 'http://baidu.com' //分享跳转的url
        }
    }, {
        name: 'SMS', //短信
        param: {
            content: '短信内容',
            mobile: '15012345678'
        }
    }, {
        name: 'CopyLink', //复制链接
        param: {
            url: 'http://m.alipay.com'
        }
    }]
});
</pre>

###调整字体大小###
android和ios调整字体大小是由native来实现的，使用代码完全不一样。ios用webkitTextSizeAdjust来调整字体大小，但在万达的公众号中发现，zoom和webkitTextSizeAdjust同时使用会有冲突，影响页面展现。

##安全模式##
当容器的启动参数指定safeMode为YES时，部分JsApi不可用(调用后Native端不会响应):
* startApp
* tradePay
* login
* 调通讯录(key待定)
* 调短信界面(key待定)
* 分享

##其他##

以下内容暂时不用了

测试环境，页面请引入js：<br/>

	<script src="http://ux.alipay-inc.com/test/alipayBridge/js/bridge.js" type="text/javascript"></script>

线上环境
native注入脚本，页面中将不需要引入bridge.js
