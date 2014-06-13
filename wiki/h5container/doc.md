# H5Container接口文档
- pubdate: 2014-03-06
- tags: 接口
- author: 左契
---
##接入方式


##启动参数

| 名称 | 缩写  | 类型 | 说明 | 默认 | pushWindow可用 | 备注 |
| :----------- | :-----------| ----------- |----------- |----------- |-----------|-----------|
| url | u | string | 起始url | "" | Y ||
| defaultTitle| dt| string| 默认标题, 在页面第一次加载之前显示在标题栏上| ""| Y||
| showTitleBar| st| string| YES/NO, 是否显示顶部标题栏| "NO"| Y||
| showToolBar| sb| string| YES/NO, 是否显示底部工具条| "YES"| Y| |
| showLoading| sl| string| YES/NO, 是否在页面加载前显示全局菊花| "NO"| Y||
| closeButtonText| cb| string| 工具条上的关闭按钮文案| "关闭"| Y||
| ssoLoginEnabled| le| string| YES/NO, 是否启用淘宝免登| "NO"| -||
| safePayEnabled| pe| string| YES/NO, 是否拦截wap收银台唤快捷| "NO"|-||
| safePayContext| sc| string| 用于拦截wap收银台请求时构造bizcontext时追加的内容, 见下文| ""| -||
| safeMode| sm| string| YES/NO，是否启用安全模式。安全模式下部分JSApi将不可使用。见后文| "NO"| -||
| readTitle| rt| string| YES/NO, 是否读取网页标题显示在titleBar上| "YES"| Y||
| bizScenario| bz| string| 业务场景。用户的相关配置(如设置的字体大小等)将以此为key保存| ""| -||
| antiPhishing| | bool| YES/NO，是否开启反钓鱼功能| true| -| since 8.1<br>scheme中不可用|
| toolMenu | tm| string| JSON字符串，工具栏扩展菜单定义示例<br/>示例：'[{"key": "#fontSize", "text": "文字大小"}, {"key": "share", "text": "分享"}]'<br/>'#'开头的key为容器处理；其它会发送toolMenu事件给JS| '[]'|-| since 8.1<br>scheme中不可用|
| backBehavior| bb| string| back/pop/event/auto. 指定后退按钮行为<br>back: history.length > 0 ? history.back() : closeWebview()<br>pop: popWindow()<br>event: 发送back事件给js<br>auto: toolbar可见时相当于back, toolbar不可见时相当于pop| 'auto'| -| since 8.1<br>scheme中不可用|


## 容器功能 ##

## 淘宝免登 ##

## 支付拦截 ##

## 反钓鱼 ##

## 安全提示 ##

* 用户在网页上填写表单，弹出键盘时，toast提示“请勿输入支付宝登录或支付密码”。参照微信
** 对于白名单中的域名，不弹出此提示。白名单由配置项whitelist定义。whitelist定义一个正则表达式的pattern， 如<pre>\.(baidu|taobao)\.com$</pre>
* iOS平台，当用户下拉webview时，可以看到背景上显示"由 xxxx.com 提供"；参照微信

# 环境变量 #

## 钱包及容器版本 ##

## 启动参数 ##

## 扩展事件 ##

### AlipayJSBridgeReady ###

window.onload以后，容器会初始化，产生一个全局变量AlipayJSBridge, 然后触发此事件

<pre>
document.addEventListener('AlipayJSBridgeReady', function () {
  console.log(typeof AlipayJSBridge);
}, false);
</pre>

###optionMenu###

导航条右上角按钮被点击时触发

<pre>
document.addEventListener('optionMenu', function () {
  // ... do something
}, false);
</pre>

###resume###

当一个webview界面重新回到栈顶时，会触发此事件. 如果这个界面是通过popWindow/popTo到达，且传递了data参数，此页可以收到
<pre>
document.addEventListener('resume', function (e) {
  console.log(e.data);
}, false);
</pre>

### toolMenu ###

从8.1开始，底部工具条支持配置弹出菜单；菜单中的由js处理的项被点击会被触发此事件，并带上menu item的key<br>
工具栏菜单项目的配置，目前支持在启动参数中指定，在pushWindow中覆盖
<pre>
document.addEventListener('toolMenu', function (e) {
  console.log(e.menuKey);
}, false);
</pre>

### back ###

用户点击导航栏左上角返回按钮或者Android的物理返回键<br>只有启动参数中的backBehaviour设置为‘event’时，此事件才会触发
<pre>
document.addEventListener('back', function (e) {
  AlipayJSBridge.call('popTo', {index: 0});
}, false);
</pre>

# 扩展接口 #

## 错误处理 ##
* JSApi的回调函数的参数是一个dictionary, 里面可能包含两个特殊的字段，用于描述错误信息
*# error: 错误码
*# errorMessage: 出错消息。可选 
* 小于10为通用错误码，具体api不应使用。定义以下通用错误码:

| error | 含义 |
|---|---|
| 1 | 接口不存在 |
| 2 | 参数无效 |


## 8.0 ##

### 获取网络状态 ###
* 示例
<pre>
AlipayJSBridge.call('getNetworkType', function (result) {
  console.log(result.networkType);
});
</pre>
* 结果

| |类型|描述|
|---|---|---|
|result.networkType|string|网络类型<br>'wifi': wifi网络;<br> 'edge': 非wifi, 包含3G/2G; <br>'none': 无网络|

### 唤起快捷支付 ###
* 示例
<pre>
AlipayJSBridge.call("tradePay",{
  tradeNO: "201209071234123221"
}, function(result){
}); 
</pre>
* 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
| tradeNO| string| 交易号。多个用";"分隔| N| |
| partnerID| string| 商户id| Y| ""|
| bizType| string| 交易类型| Y| "trade"|
| bizSubType| string| 交易子类型| Y| ""|
| displayPayResult| bool| 是否显示支付结果页| Y| true|

* 结果

| |类型| 描述|
|---|---|---|
| result.resultCode| string| 支付结果<br>'9000': 订单支付成功;<br>'8000': 正在处理中;<br>'4000': 订单支付失败;<br>'6001': 用户中途取消;<br>'6002': 网络连接出错|
| result.callbackUrl| string| 交易成功后应跳转到的url；一般为空, 除非交易有特殊配置|

### startApp ###
* 示例
<pre>
AlipayJSBridge.call('startApp', {
  appId: '20000042',
  param: {
    publicId: 'xxxxxx'
  },
  closeCurrentApp: false
}, function (result) {
  
});
</pre>
* 参数

|名称|类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| appId| string| 钱包内应用ID| N||
| param| dictionary| 启动应用的参数, 由具体业务应用定义<br>8.0时value仅支持字符<br>从8.1开始value增加对bool, int, double的支持| Y||
| closeCurrentApp| bool| 是否先退出当前app再启动新的app. 适用于页面用作中转页的情况. since 8.1| Y| false|

* 结果

|  |类型|描述|
|---|---|---|
| result.success| bool| 启动app是否成功。如果失败，会有回调。如果成功，不一定有|

* 错误

|error|描述|
|---|---|
| 10| 指定appId不存在|
| 11| 启动app失败|

### 控制标题栏 ###
* 示例

```
// 显示标题栏
AlipayJSBridge.call("showTitlebar");

// 隐藏标题栏
AlipayJSBridge.call("hideTitlebar");

// 显示右按钮
AlipayJSBridge.call("showOptionMenu");

// 隐藏右按钮
AlipayJSBridge.call("hideOptionMenu");

// 设置右按钮属性
AlipayJSBridge.call('setOptionMenu', {
  title : '按钮', 
  icon : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',
});
```

* 参数

|名称|类型|描述|可选|默认值|
|---|---|---|---|---|
| title| string| 右按钮文字。调用setOptionMenu时，title与icon必选一个| N| |
| icon| string| 右按钮图标url。建议图片尺寸40x40| N||

### 设置工具栏 ###
* 示例

```
// 显示工具栏
AlipayJSBridge.call("showToolbar");

// 隐藏工具栏
AlipayJSBridge.call("hideToolbar");

// 显示右按钮
AlipayJSBridge.call("showOptionMenu");

// 隐藏右按钮
AlipayJSBridge.call("hideOptionMenu");

// 设置右按钮属性
AlipayJSBridge.call('setOptionMenu', {
  title : '按钮', 
  icon : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',
});
```

### 窗口控制 ###
* 示例
<pre>
// 开新容口
AlipayJSBridge.call('pushWindow', {
  url: 'http://www.baidu.com/',
  param: {
    readTitle: true,
    defaultTitle: true,
    showToolBar: false
    // ...
  }
});
</pre>
<pre>
// 关闭窗口
AlipayJSBridge.call('popWindow');

// 关闭窗口（别名）
AlipayJSBridge.call('closeWebview');
</pre>

* 参数

|名称|类型|描述|可选|默认值|
|---|---|----|----|---|
| url| string| 要打开的url<br>8.0只支持绝对url, 8.1开始支持相对url| N| |
| param| dictionary| 新开窗口的属性配置<br>支持的key/value参见启动参数列表<br>8.1以后，没有指定的属性将从当前窗口继承| Y| {}|

### Loading提示 ###
* 示例
<pre>
// 显示
AlipayJSBridge.call('showLoading');

// 隐藏
AlipayJSBridge.call('hideLoading');
</pre>
* 备注
*# 显示loading后，只有标题栏、工具栏可以操作
*# 当前页面unload时，Loading自动隐藏

### 唤起钱包登录功能 ###
* 示例
<pre>
AlipayJSBridge.call('login', function () {
  conslog.log('did login');   
});
</pre>
* 备注
** 调用login可以延续钱包的登录session, 一般会有免登，不会弹出钱包登录界面
** 回调函数执行时，一定是登录已经成功

### 调起短信发送界面 ###
* 示例
<pre>
AlipayJSBridge.call("sendSMS", {
  mobile: '15088640308',
  content: 'Hello'
}, function(result) {
  console.log(result.Status);
});
</pre>
* 参数


|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| mobile| string| 预填入的目标手机号| Y| ''|
| content| string| 预填入的短信内容| Y| ''|

* 结果

| 类型| 描述|
|---|---|
| result.status| string| 短信发送结果<br>'Success': 发送成功<br>'Failed': 发送失败，比如网络问题<br>'Canceled': 用户取消发送|

### 调用通讯录 ###
* 示例
<pre>
AlipayJSBridge.call("contact", function(result) {
  console.log(result.name, result.mobile);
});
</pre>
* 结果

| |类型|描述|
|---|---|---|
|result.name|string| 选中的联系人姓名|
| result.mobile| string| 选中的联系人手机号|

### 选择渠道并分享 ###
* 示例
<pre>
AlipayJSBridge.call('share', {
  LAIWANG_FEED: {
    title: '分享的标题',
    content: '分享的内容',
    imageUrl: '分享的图片',
    imageView: true, //分享当前视图
    url: '分享跳转的url'
  },
  SINA_WEIBO: {
    // ...
  }
});
</pre>
* 参数(待规范化)
** 每个key代表一个可选渠道; value是一个dictionary
** 8.0支持LAIWANG_FEED（来往朋友圈）和SINA_WEIBO（微博）

## 8.1 ##

### 拍照/选择照片 ###
* 示例
<pre>
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
</pre>
* 参数

|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| dataType| string| 结果数据格式:<br>dataURL: base64编码的图片数据<br>fileURL: 图片在文件系统中的url<br>图片存放于临时目录中，钱包退出时被清除| Y| dataURL|
| imageFormat| string| jpg / png| Y| jpg|
| quality| int| jpg的图片质量, 取值1到100| Y| 75|
| maxWidth| int| 图片的最大宽度. 过大将被等比缩小| Y| 不限|
| maxHeight| int| 图片的最大高度. 过大将被等比缩小| Y| 不限|
| allowEdit| bool| 是否允许编辑(框选). 为true时，拍照时会有一个方形的选框| Y| false|

* 结果

||类型| 说明|
|---|---|---|
| result.dataURL| string| base64编码的图片数据|
| result.fileURL| string| 图片文件URL|

* 错误

|error|描述|
|---|---|
| 10| 用户取消|
| 11| 操作失败（权限不够）|

### 扫码/扫卡 ###
* 示例
<pre>
AlipayJSBridge.call('scan', {
  type: 'bar'
}, function (result) {
  
});
</pre>
* 参数

|名称|类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| type| string| 扫描目标类型，qr / bar / card <br> TODO: 由扫码应用定| Y| qrcode|

* 结果

||类型| 说明|
|---|---|---|
| result.barCode| string| 扫描所得条码数据|
| result.qrCode| string| 扫描所得二维码数据|
| result.cardNumber| string| 扫描所得银行卡号|

* 错误

|error| 描述|
|---|---|
| 10| 用户取消|
| 11| 操作失败|


### resume with data ###
* 示例
<pre>
// popWindow示例
AlipayJSBridge.call('popWindow', {
  data: {hello: 1}
});
</pre>
<pre>
// popTo示例
AlipayJSBridge.call('popTo', {
  index: -1,
  data: {hello: 1}
});
</pre>
<pre>
// 目标页代码
document.addEventListener('resume', function (event) {
  console.log(event.data);
});
</pre>
* 参数

|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| data| any| 需要回传给上一页/目标页的数据。此数据将作为resume时的event.data| Y| null|

### 获取位置信息 ###
* 示例
<pre>
AlipayJSBridge.call('getLocation', function (result) {
  if (error) {
    alert(error.message);
    return;
  }
  console.log(result.city, result.latitude, result.longitude);
});
</pre>
* 结果

||类型| 说明|
|---|---|---|
| result.city| string| 城市名称|
| result.latitude| double| 纬度|
| result.longitude| double| 经度|

* 错误

|error| 描述|
|---|---|
| 10| 定位失败|

### 会话数据 ###
* 示例
<pre>
// 读
AlipayJSBridge.call('getSessionData', {
  keys: ['name']
}, function (result) {
  console.log(result.data.name);
});
</pre>
<pre>
// 写
AlipayJSBridge.call('setSessionData', {
  data: {
    name: 'Liu Hunan',
    age: '15'
  }
});
</pre>
* 参数

|名称|类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| keys| array| 要读取的数据的key| N| |
| items| array| 要写入的数据项，每一项是一个dictionary, 包含key和value。value只支持字符串| N| |

* 结果

||类型|描述|
|---|---|---|
| result.data| dictionary| 包含keys所指定的且存在的数据项|

### Alert ###
* 示例
<pre>
AlipayJSBridge.call('alert', {
  title: '亲',
  message: '你好',
  buttons: ['按钮1', '按钮2']
}, function (result) {
  console.log('clicked button at index: ' + result.index);
});
</pre>
* 参数

|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| title| string| alert框标题| Y| ""|
| message| string| alert框文本| N||
| buttons| array| 各按钮文字。每项是一个字符串。最多三项| N||

* 结果

| |类型| 描述|
|---|---|---|
|result.index|int|用户点击的按钮在buttons数组中的index，从0开始|

### JSApi可用性判断 ###
* 示例
<pre>
AlipayJSBridge.call('checkJSApi', {
  name: 'tradePay'
}, function (result) {
  console.log(result.available);
});
</pre>
* 参数

|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| name| string| api名称| N| |

* 结果

||类型| 描述|
|---|---|---|
| result.available| bool| JsApi是否可用|

### 钱包内App可用性判断 ###

* 示例
<pre>
AlipayJSBridge.call('checkApp', {
  appId: '20000042'
}, function (result) {
  console.log(result.status);
});
</pre>
* 参数

|名称| 类型| 描述| 可选| 默认值|
|---|---|---|---|---|
| appId| string| 应用ID| N| |

* 结果

||类型| 描述|
|---|---|---|
| result.exist| bool| 应用是否存在|
| result.status| string| 应用的状态。由开放平台定义|
| result.version| string| 目标应用的版本。如果应用不存在，则此值为undefined|

### 外部应用存在性判断 ###
* 示例
<pre>
AlipayJSBridge.call('checkApp', {
  scheme: 'alipays://',
  package: 'com.alipay.client'
}, function (result) {
  console.log(result.installed);
});
</pre>

* 参数

|名称| 类型|描述| 可选| 默认值|
|---|---|---|---|---|
| scheme| string| 目标应用的url scheme。ios平台使用| N| |
| package| string| 目标应用的包名。android平台使用| N| |

* 结果

||类型|描述|
|---|---|---|
| result.installed| bool| 目标应用是否已在用户设备上安装|

### 退回指定界面 ###
* 示例
<pre>
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
  if (error) {
    console.log(error);
  }
});
</pre>
* 参数

|名称| 类型|描述| 可选| 默认值|
|---|---|---|---|---|
| index| int| 目标界面在会话界面栈中的索引；如果小于零，则将与当前界面的index相加| N| |
| url| string| 目标界面的URL| N| |

* 结果

||类型|描述|
|---|---|---|
| result| undefined| 操作成功时，回调可能不被调用；result不应被使用|

* 错误

|error| 描述|
|---|---|
| 10| 无效的index或者url|

### 退出当前app ###
* 示例
<pre>
AlipayJSBridge.call('exit');
</pre>

## 分享 ##
* 示例
<pre>
AlipayJSBridge.call('share', {
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
  }]
});
</pre>
* 参数

|名称| 类型|描述| 可选| 默认值|
|---|---|---|---|---|
| channels| array| 分享渠道列表，至少包含一个channel；如果只channel多于一个，会跳出渠道选择框| N| |
| name| string| 渠道名称。支持以下几种：Weibo/LaiwangContacts/LaiwangTimeline/Weixin/WeixinTimeLine/SMS/CopyLink| N| |
| param| dictionary| 指定渠道的参数，支持以下字段：<br>title: string, 分享标题<br> content : string, 分享内容<br> imageUrl : string, 图片url<br> captureScreen : bool, 默认为false, 是否截屏分享<br> url : string, 分享链接| N| |

## 浏览器中打开 ##
* 示例
<pre>
AlipayJSBridge.call('openInBrowser', {
  url: 'http://m.baidu.com/'
});
</pre>
* 参数

|名称| 类型|描述| 可选| 默认值|
|---|---|---|---|---|
| url| string| 要打开的URL| Y| 当前页面URL|


## 账户充值 ##
* 示例
<pre>
AlipayJSBridge.call('deposit', {
  displayPayResult: false
}, function (result) {
  if (result.resultCode ## '9000') {
    console.log('支付成功');
  }
});
</pre>
* 参数

||类型|描述|
|---|---|---|
| displayPayResult| bool| 是否显示支付完成页|

* 结果

||类型|描述|
|---|---|---|
| result.resultCode| string| 支付结果码，常见为以下几种（完整定义参考）<br>"9000": 订单支付成功<br>"4000": 订单支付失败<br>"6001": 用户中途取消<br>"6002": 网络连接出错|

## 8.2 ##

### RPC ###
* 示例
<pre>
AlipayJSBridge.call('rpc', {
  operationType: 'alipay.client.xxxx',
  requestData: []
}, function (result) {
  console.log(result);
});
</pre>
* 参数

|名称| 类型|描述| 可选| 默认值|
|---|---|---|---|---|
| operationType| string| rpc服务名称| N| |
| requestData| array| rpc请示的参数。需要开发者根据具体rpc接口自行构造| Y| []|

* 结果

||类型|描述|
|---|---|---|
|result|dictionary|rpc响应的结果|

* 错误

|error|描述|
|---|---|
| 10| 网络错误|
| 11| 请求超时|
| 其他| 由mobilegw网关定义|