# 容器接口文档 #

- pubdate: 2014-07-01

----

##  接口异常信息  ##
- JSApi的回调函数的参数是一个PlainObject, 里面可能包含一个特殊的字段error，作为api调用的错误码
- 示例

```javascript
{

	 error:1,
	 errorMessage:'接口不存在'
}
```

- 小于10为通用错误码，具体api不应使用。定义以下通用错误码:

|error|含义|
|---|---|
|1|接口不存在|
|2|参数无效|
|3|发生未知错误|
|4|接口无权限|



- 最低支持版本：8.2+

##  事件类  ##

### AlipayJSBridgeReady
window.onload以后，容器会初始化，产生一个全局变量AlipayJSBridge, 然后触发此事件

```javascript
document.addEventListener('AlipayJSBridgeReady', function () {
  console.log(typeof AlipayJSBridge);
}, false);
```

- 最低支持版本：8.0+

###  resume  ###
当一个webview界面重新回到栈顶时，会触发此事件. 如果这个界面是通过popWindow/popTo到达，且传递了data参数，此页可以收到
如果在界面的resume之前先发生了app的resume, 则event还会有一个resumeParams, 包含app resume时接收到的参数

- 注：
由于ios自身限制，正在进行过场动画的时候不能关闭webview，如果要在resume事件中关闭webview的话需要延时处理。

```javascript
// popWindow示例
AlipayJSBridge.call('popWindow', {

	 data: {hello: 1}
});

// popTo示例
AlipayJSBridge.call('popTo', {

	 index: -1,
	 data: {hello: 1}
});

// 目标页代码
AlipayJSBridge.on('resume', function (event) {
	 console.log(event.data);
	 console.log(event.resumeParams);
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|data|any|需要回传给上一页/目标页的数据。此数据将作为resume时的event.data|Y|null|



- 最低支持版本：8.0+

###  back(后退)  ###
用户点击导航栏左上角返回按钮或者Android的物理返回键，页面将会收到此事件
如果在事件的处理函数中调用了event.preventDefault()，容器将忽略backBehaviour，js需要负责回退或做其他操作

```javascript
AlipayJSBridge.on('back', function (e) {
	 e.preventDefault();
	 AlipayJSBridge.call('popTo', {index: 0});
}, false);
```

- 最低支持版本：8.0+

###  optionMenu  ###
导航条右上角按钮被点击时触发

```javascript
AlipayJSBridge.on('optionMenu', function () {
	 // ... do something
}, false);
```

- 最低支持版本：8.0+

### toolbarMenuClick  ###
在8.2及其以上的版本，如果添加了自定义的菜单，当用户点击按钮会触发回调，回调会返回当前点击按钮在初始化的时候传入的name和tag属性。从而做一些业务上的处理

```javascript
AlipayJSBridge.on('toolbarMenuClick', function (e) {
	//得到name属性值
	console.log(e.data.name);
	//得到tag属性值
	console.log(e.data.tag)
}, false);
```

- 最低支持版本：8.2+



###  subtitleClick  ###

- version:8.2
- 事件描述：点击子标题触发回调

```javascript
AlipayJSBridge.on('subtitleClick', function () {
}, false);
```

- 最低支持版本：8.2+


##  通用类  ##
###  checkJSAPI (JSApi可用性判断)  ###
- 示例

```javascript
AlipayJSBridge.call('checkJSAPI', {
	 api: 'toast'
}, function (result) {
	 console.log(result.available);
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|api|string|api名称|N|&nbsp;|


- 结果

||类型|描述|
|---|---|---|
|result.available|bool|JsApi是否可用|



- 最低支持版本：8.1+

###  checkApp (钱包内App可用性判断)  ###
- 示例

```javascript
AlipayJSBridge.call('checkApp', {

	 appId: '20000042'
}, function (result) {

	 console.log(result.status);
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|appId|string|应用ID|N|&nbsp;|


- 结果

||类型|描述|
|---|---|---|
|result.exist|bool|应用是否存在|
|result.status|string|应用的状态。由开放平台定义|
|result.version|string|目标应用的版本。如果应用不存在，则此值为undefined|



- 最低支持版本：8.1+

###  isInstalledApp (外部应用存在性判断)  ###
- 示例

```javascript
AlipayJSBridge.call('isInstalledApp', {

	 scheme: 'alipays://',
	 packagename: 'com.demo.app'
}, function (result) {

	 console.log(result.installed);
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|scheme|string|目标应用的url scheme。ios平台使用|N|&nbsp;|
|package|string|目标应用的包名。android平台使用|N|&nbsp;|


- 结果

||类型|描述|
|---|---|---|
|result.installed|bool|目标应用是否已在用户设备上安装|



- 最低支持版本：8.1+



##  界面类  ##

###  titlebar (控制标题栏)  ###
- 示例

```javascript
// 显示标题栏
AlipayJSBridge.call("showTitlebar");
// 隐藏标题栏
AlipayJSBridge.call("hideTitlebar");

// 显示右按钮
AlipayJSBridge.call("showOptionMenu");

// 隐藏右按钮
AlipayJSBridge.call("hideOptionMenu");

// 设置标题
AlipayJSBridge.call("setTitle", {

	title: 'Hello',
	subtitle: '杭州'  //8.2
});
```


- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|title|string|主标题文案|N|&nbsp;|
|subtitle|string|副标题文案|Y|&nbsp;|



```javascript
// 设置右按钮属性
AlipayJSBridge.call('setOptionMenu', {

	 title : '按钮',  // 与icon二选一
	 icon : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',
});
```


- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|title|string|右按钮文字。调用setOptionMenu时，title与icon必选一个|N|&nbsp;|
|icon|string|右按钮图标url。建议图片尺寸40x40|N|&nbsp;|



- 最低支持版本：8.0+

###  toolbar (设置工具栏)
- 示例

```javascript
// 显示工具栏
AlipayJSBridge.call("showToolbar");

// 隐藏工具栏
AlipayJSBridge.call("hideToolbar");
```

###  toast (弱提示)
- 示例

```javascript
// 显示
AlipayJSBridge.call('toast', {

	 content: 'Toast测试',
	 type: 'success',
	 duration: 3000
}, function(){

	 alert("toast消失后执行");
});
```

- 参数

|名称|类型|描述|可选|默认值|版本|
|---|---|---|---|---|---|
|content|string|文字内容|N|""|8.0|
|type|string|none / success / fail。 icon类型|Y|none|8.1|
|duration|int|显示时长，单位为毫秒。android实际只支持2000/3000两种，小于2500的相当于2000, 大于2500的相当于3000|Y|2000|8.1|



- 最低支持版本：8.0+

###  setToolbarMenu (设置菜单项)  ###
- 示例

```javascript
AlipayJSBridge.call('setToolbarMenu',{

	   menus:[
	{name:"字体",tag:"xx", action:"H5MenuActionOfFont"},  //调整字体功能（特殊）
	        {name:"xx",tag:"xx"},
	        {name:"xx",tag:"xx"}
	   ]
}, function () {


});
```

- 参数

一个包含菜单项的列表，name用来表示菜单项的名称必须填写，tag表示其他的信息可选。当菜单被点击后，传入的值都会被返回。

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|menus|array|菜单列表|N|&nbsp;|


- 结果


| |类型|说明|
|---|---|---|
|result.status|string|"Success":添加菜单项成功|



- 错误
- 最低支持版本：8.2+

###  Alert (对话框) ###
- 示例

```javascript
AlipayJSBridge.call('alert', {

	 title: '亲',
	 message: '你好',
	 button: '确定'
}, function () {

	 console.log('alert dismissed');
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|title|string|alert框标题|Y|""|
|message|string|alert框文本|N|&nbsp;|
|button|string|按钮文字|Y|"确定"|



- 最低支持版本：8.1+

###  Confirm (选择对话框)  ###
- 示例

```javascript
AlipayJSBridge.call('confirm', {
	 title: '亲',
	 message: '确定要这么干吧',
	 okButton: '确定',
	 cancelButton: '算了'
}, function (result) {
	 console.log(result.ok);
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|title|string|alert框标题|Y|""|
|message|string|alert框文本|N|&nbsp;|
|okButton|string|"确定"按钮文字|Y|"确定"|
|cancelButton|string|"取消"按钮文字|Y|"取消"|


- 结果

||类型|描述|
|---|---|---|



- 最低支持版本：8.1+

###  loading(加载中提示)  ###
- 示例

```javascript
// 显示
AlipayJSBridge.call('showLoading', {

	 text: '加载中',
	 delay: 1000
});

// 隐藏
AlipayJSBridge.call('hideLoading');
```

- 参数 (since 8.1)

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|text|string|文本内容；若不指定，则显示为中间大菊花；如果指定，显示为小菊花右侧带文字|Y|""|
|delay|int|延迟多少毫秒后显示；如果在此时间之前调用了hideLoading, 则不会再显示|Y|0|



- 备注
	- 显示loading后，只有标题栏、工具栏可以操作
	- 当前页面unload时，Loading自动隐藏

- 最低支持版本：8.0+


##  上下文类  ##

###  popTo (退回指定界面)  ###
- 示例

```javascript
// 按index跳转
AlipayJSBridge.call('popTo', {

	 index: -2,
}, function (result) {

	 if (error) {
	   console.log(error);
	 }
});
// 按url跳转
AlipayJSBridge.call('popTo', {

	 url: 'http://d.alilpay.com/step2.html'
}, function (result) {

	 if (result.error) {
	   console.log(result.error);
	 }
});
// 按urlPattern跳转
AlipayJSBridge.call('popTo', {

	 urlPattern: 'step2.html'
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|index|int|目标界面在会话界面栈中的索引；如果小于零，则将与当前界面的index相加|N|&nbsp;|
|url|string|目标界面的URL|N|&nbsp;|
|urlPattern|string|目标界面的URL匹配表达式（URL如果包含urlPattern，匹配成功）|N|&nbsp;|


- 结果

||类型|描述|
|---|---|---|
|result|undefined|操作成功时，回调可能不被调用；result不应被使用|



- 错误

无效的index;
未匹配url;
未匹配urlPattern;

|error|描述|
|---|---|
|10|未配置参数； |



- 最低支持版本：8.1+

###  exitApp (退出当前H5应用)  ###
- 例子

```javascript
AlipayJSBridge.call('exitApp');
```

- 参数

	无

- 最低支持版本：8.2+

###  openInBrowser (浏览器中打开)  ###

- 示例

```javascript
AlipayJSBridge.call('openInBrowser', {
	 url: 'http://m.baidu.com/'
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|url	|string|要打开的URL|Y|当前页面URL|



- 最低支持版本：8.1+

###  窗口控制  ###
- 示例

```javascript
// 开新窗口
AlipayJSBridge.call('pushWindow', {

	 url: 'http://www.alipay.com/',
	 param: {
	   readTitle: true,
	   defaultTitle: true,
	   showToolBar: false
	   // ...
	 }
});

// 关闭窗口，可传递参数
AlipayJSBridge.call('popWindow',{

	data: {
	}
});

// 关闭窗口（别名）
AlipayJSBridge.call('closeWebview');
```

- 参数

8.1: 没有指定的属性将从当前窗口继承

|名称|类型|描述|可选|默认值|版本|
|---|---|---|---|---|---|
|url|string|要打开的url|N|&nbsp;|8.0: 支持绝对url8.1: 支持绝对/相对url|
|param|dictionary|新开窗口的属性配置支持的key/value参见启动参数列表(其中的"YES"/"NO"需要使用true/false代替)|Y|{}|8.0: |



- 最低支持版本：8.0+

##  扩展类  ##
###  getNetworkType (获取网络状态)  ###
- 示例

```javascript
AlipayJSBridge.call('getNetworkType', function (result) {

	 console.log(result.networkType);
});
```

- 结果

||类型|描述|版本|
|---|---|---|---|
|result.err_msg(兼容微信)|string|网络类型'network_type:fail': 无网络, 或网络断开'network_type:wifi': wifi网络 'network_type:wwan': 非wifi|8.0|
|result.networkType|string|网络类型'fail': 无网络，或网络断开'wifi': wifi网络'wwan': 非wifi|8.2|
|result.networkAvailable|bool|网络是否连网可用|8.2|



- 最低支持版本：8.0+


###  photo (拍照/选择照片)  ###
- 示例


```javascript
AlipayJSBridge.call('photo', {

	 dataType: 'dataURL',
	 imageFormat: 'jpg',
	 quality: 75,
	 maxWidth: 500,
	 maxHeight: 500,
	 allowEdit: true
}, function (result) {

	 image = document.getElementById('myImage');
	 image.src = "data:image/jpeg;base64," + result.dataURL;
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|dataType|string|结果数据格式:dataURL: base64编码的图片数据fileURL: 图片在文件系统中的url图片存放于临时目录中，钱包退出时被清除|Y|dataURL|
|imageFormat|string|jpg / png|Y|jpg|
|quality|int|jpg的图片质量, 取值1到100|Y|75|
|maxWidth|int|图片的最大宽度. 过大将被等比缩小|Y|不限|
|maxHeight|int|图片的最大高度. 过大将被等比缩小|Y|不限|
|allowEdit|bool|是否允许编辑(框选). 为true时，拍照时会有一个方形的选框|Y|false|



- 结果


| |类型|说明|
|---|---|---|
|result.dataURL|string|base64编码的图片数据|
|result.fileURL|string|图片文件URL|



- 错误

|error|描述|
|---|---|
|10|用户取消|
|11|操作失败（权限不够）|



- 最低支持版本：8.1+


###  scan (扫码/扫卡)  ###
- 示例

```javascript
AlipayJSBridge.call('scan', {

	 type: 'bar'
}, function (result) {


});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|type|string|扫描目标类型，qr / bar / card|N|&nbsp;|


- 结果


| |类型|说明|
|---|---|---|
|result.barCode|string|扫描所得条码数据|
|result.qrCode|string|扫描所得二维码数据|
|result.cardNumber|string|扫描所得银行卡号|



- 错误

|error|描述|
|---|---|
|10|用户取消|
|11|操作失败|



- 最低支持版本：8.1+


###  share (分享)  ###
- 备注
- 8.1版本的分享接口重新约定，分享组件存在以下问题，将在8.2解决：
- ios 新浪微博SDK url255限制
- ios 新浪微博不能分享图片+url
- android / ios微信分享不同程度展现不一致

- 示例

```javascript
AlipayJSBridge.call('share', {

	 'channels': [{
	   name: 'Weibo', //新浪微博
	   param: {
	     title: '分享的标题',
	     content: '分享的内容，不能超过140',
	     imageUrl: '分享的图片地址',
	     captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先imageUrl)
	     url: 'http://alipay.com' //分享跳转的url，当添加此参数时，分享的图片大小不能超过32K
	   }
	 }, {
	   name: 'LaiwangContacts', //来往好友
	   param: {
	     title: '分享的标题',
	     content: '分享的内容',
	     imageUrl: '分享的图片地址',
	     captureScreen: true,
	     url: 'http://alipay.com'
	   }
	 }, {
	       name: 'SMS', //短信
	       param: {
	           content: '短信内容',
	           //应业务方需求定制功能
	    contentType: 'url',
	           extData:''
	       }
	   }, {
	       name: 'CopyLink', //复制链接
	       param: {
	           url: 'http://m.alipay.com'
	       }
	   }]
},function(result){
});
```

- 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
|channels|array|分享渠道列表，至少包含一个channel；如果只channel多于一个，会跳出渠道选择框|N|&nbsp;|
|name|string|渠道名称。支持以下几种：Weibo/LaiwangContacts/LaiwangTimeline/Weixin/WeixinTimeLine/SMS/CopyLink|N|&nbsp;|
|param|dictionary|指定渠道的参数，支持以下字段：title: string, 分享标题 content : string, 分享内容 imageUrl : string, 图片url captureScreen : bool, 默认为false, 是否截屏分享 url : string, 分享链接|N|&nbsp;|



- 结果


||类型|描述|
|---|---|---|



- 错误


|error|描述|
|---|---|
|10|分享失败或取消|



- 最低支持版本：8.1+

###  getCities (城市选择)  ###

- 城市选择
- 示例

```javascript
AlipayJSBridge.call('getCities', {

	 currentCity: '杭州市',
	 adcode:'310100'
}, function(result){

	 // 返回用户选择的城市名
	 //  {'city': '北京市','adcode':'110100'}
});
```

- 最低支持版本：8.1+


###  vibrate (调用震动)  ###
- 示例

```javascript
AlipayJSBridge.call('vibrate');
```

- 最低支持版本：8.2+


###  watchShake (摇一摇)  ###
- 摇一摇
- 示例

```javascript
AlipayJSBridge.call('watchShake', function(){

	 //摇到啦
});
```

- 最低支持版本：8.2+