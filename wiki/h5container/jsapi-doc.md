# 容器接口文档 #

- pubdate: 2014-07-01

----

##  通用类  ##
###  checkJSAPI (JSApi可用性判断)  ###
- 示例

<pre>
AliBridge.call('checkJSAPI', {
	 api: 'toast'
}, function (result) {
	 console.log(result.available);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>api</td>
<td>string</td>
<td>api名称</td>
<td>N</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.available</td>
<td>bool</td>
<td>JsApi是否可用</td>
</tr></table>

- 最低支持版本：8.1+

###  checkApp (钱包内App可用性判断)  ###
- 示例

<pre>
AliBridge.call('checkApp', {

	 appId: '20000042'
}, function (result) {

	 console.log(result.status);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>appId</td>
<td>string</td>
<td>应用ID</td>
<td>N</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.exist</td>
<td>bool</td>
<td>应用是否存在</td>
</tr>
<tr>
<td>result.status</td>
<td>string</td>
<td>应用的状态。由开放平台定义</td>
</tr>
<tr>
<td>result.version</td>
<td>string</td>
<td>目标应用的版本。如果应用不存在，则此值为undefined</td>
</tr></table>

- 最低支持版本：8.1+

###  isInstalledApp (外部应用存在性判断)  ###
- 示例

<pre>
AliBridge.call('isInstalledApp', {

	 scheme: 'alipays://',
	 packagename: 'com.demo.app'
}, function (result) {

	 console.log(result.installed);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>scheme</td>
<td>string</td>
<td>目标应用的url scheme。ios平台使用</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>package</td>
<td>string</td>
<td>目标应用的包名。android平台使用</td>
<td>N</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.installed</td>
<td>bool</td>
<td>目标应用是否已在用户设备上安装</td>
</tr></table>

- 最低支持版本：8.1+

##  错误处理约定  ##
- JSApi的回调函数的参数是一个dictionary, 里面可能包含一个特殊的字段error，作为api调用的错误码
- 示例

<pre>
{

	 error:1,
	 errorMessage:'参数出错'
}
</pre>

- 小于10为通用错误码，具体api不应使用。定义以下通用错误码:
<table>
<thead>
<th>error</th>
<th>含义</th>
</thead>
<tr>
<td>1</td>
<td>接口不存在</td>
</tr>
<tr>
<td>2</td>
<td>参数无效</td>
</tr>
<tr>
<td>3</td>
<td>发生未知错误</td>
</tr>
<tr>
<td>4</td>
<td>接口无权限</td>
</tr></table>

- 最低支持版本：8.2+

##  界面类  ##

###  titlebar (控制标题栏)  ###
- 示例

<pre>
// 显示标题栏
AliBridge.call("showTitlebar");
// 隐藏标题栏
AliBridge.call("hideTitlebar");

// 显示右按钮
AliBridge.call("showOptionMenu");

// 隐藏右按钮
AliBridge.call("hideOptionMenu");

// 设置标题
AliBridge.call("setTitle", {

	title: 'Hello',
	subtitle: '杭州'  //8.2
});
</pre>


- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>title</td>
<td>string</td>
<td>主标题文案</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>subtitle</td>
<td>string</td>
<td>副标题文案</td>
<td>Y</td>
<td></td>
</tr></table>

<pre>
// 设置右按钮属性
AliBridge.call('setOptionMenu', {

	 title : '按钮',  // 与icon二选一
	 icon : 'http://pic.alipayobjects.com/e/201212/1ntOVeWwtg.png',
});
</pre>


- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>title</td>
<td>string</td>
<td>右按钮文字。调用setOptionMenu时，title与icon必选一个</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>icon</td>
<td>string</td>
<td>右按钮图标url。建议图片尺寸40x40</td>
<td>N</td>
<td></td>
</tr></table>

- 最低支持版本：8.0+

###  toolbar (设置工具栏)
- 示例

<pre>
// 显示工具栏
AliBridge.call("showToolbar");

// 隐藏工具栏
AliBridge.call("hideToolbar");
</pre>

###  toast (弱提示)
- 示例

<pre>
// 显示
AliBridge.call('toast', {

	 content: 'Toast测试',
	 type: 'success',
	 duration: 3000
}, function(){

	 alert("toast消失后执行");
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
<th>版本</th>
</thead>
<tr>
<td>content</td>
<td>string</td>
<td>文字内容</td>
<td>N</td>
<td>""</td>
<td>8.0</td>
</tr>
<tr>
<td>type</td>
<td>string</td>
<td>none / success / fail。 icon类型</td>
<td>Y</td>
<td>none</td>
<td>8.1</td>
</tr>
<tr>
<td>duration</td>
<td>int</td>
<td>显示时长，单位为毫秒。android实际只支持2000/3000两种，小于2500的相当于2000, 大于2500的相当于3000</td>
<td>Y</td>
<td>2000</td>
<td>8.1</td>
</tr></table>

- 最低支持版本：8.0+

###  setToolbarMenu (设置菜单项)  ###
- 示例

<pre>
AliBridge.call('setToolbarMenu',{

	   menus:[
	{name:"字体",tag:"xx", action:"H5MenuActionOfFont"},  //调整字体功能（特殊）
	        {name:"xx",tag:"xx"},
	        {name:"xx",tag:"xx"}
	   ]
}, function () {


});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>menus</td>
<td>array</td>
<td>菜单列表</td>
一个包含菜单项的列表，<br/>name用来表示菜单项的名称必须填写，tag表示其他的信息可选。<br/>当菜单被点击后，传入的值都会被返回。
<td>N</td>
<td></td>
</tr>
</table>
- 结果

<table>
<thead>
<th> </th>
<th>类型</th>
<th>说明</th>
</thead>
<tr>
<td>result.status</td>
<td>string</td>
<td>"Success":添加菜单项成功</td>
</tr></table>

- 错误
- 最低支持版本：8.2+

###  Alert (对话框) ###
- 示例

<pre>
AliBridge.call('alert', {

	 title: '亲',
	 message: '你好',
	 button: '确定'
}, function () {

	 console.log('alert dismissed');
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>title</td>
<td>string</td>
<td>alert框标题</td>
<td>Y</td>
<td>""</td>
</tr>
<tr>
<td>message</td>
<td>string</td>
<td>alert框文本</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>button</td>
<td>string</td>
<td>按钮文字</td>
<td>Y</td>
<td>"确定"</td>
</tr></table>

- 最低支持版本：8.1+

###  Confirm (选择对话框)  ###
- 示例

<pre>
AliBridge.call('confirm', {
	 title: '亲',
	 message: '确定要这么干吧',
	 okButton: '确定',
	 cancelButton: '算了'
}, function (result) {
	 console.log(result.ok);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>title</td>
<td>string</td>
<td>alert框标题</td>
<td>Y</td>
<td>""</td>
</tr>
<tr>
<td>message</td>
<td>string</td>
<td>alert框文本</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>okButton</td>
<td>string</td>
<td>"确定"按钮文字</td>
<td>Y</td>
<td>"确定"</td>
</tr>
<tr>
<td>cancelButton</td>
<td>string</td>
<td>"取消"按钮文字</td>
<td>Y</td>
<td>"取消"</td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
<thead>
<tr>
<td>result.ok</td>
<td>bool</td>
<td>用户点击确定</td>
</tr></table>

- 最低支持版本：8.1+

###  loading(加载中提示)  ###
- 示例

<pre>
// 显示
AliBridge.call('showLoading', {

	 text: '加载中',
	 delay: 1000
});

// 隐藏
AliBridge.call('hideLoading');
</pre>

- 参数 (since 8.1)
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>text</td>
<td>string</td>
<td>文本内容；若不指定，则显示为中间大菊花；如果指定，显示为小菊花右侧带文字</td>
<td>Y</td>
<td>""</td>
</tr>
<tr>
<td>delay</td>
<td>int</td>
<td>延迟多少毫秒后显示；如果在此时间之前调用了hideLoading, 则不会再显示</td>
<td>Y</td>
<td>0</td>
</tr></table>

- 备注
	- 显示loading后，只有标题栏、工具栏可以操作
	- 当前页面unload时，Loading自动隐藏

- 最低支持版本：8.0+


##  事件类  ##

###  resume  ###
当一个webview界面重新回到栈顶时，会触发此事件. 如果这个界面是通过popWindow/popTo到达，且传递了data参数，此页可以收到
如果在界面的resume之前先发生了app的resume, 则event还会有一个resumeParams, 包含app resume时接收到的参数

- 注：
由于ios自身限制，正在进行过场动画的时候不能关闭webview，如果要在resume事件中关闭webview的话需要延时处理。

<pre>
// popWindow示例
AliBridge.call('popWindow', {

	 data: {hello: 1}
});

// popTo示例
AliBridge.call('popTo', {

	 index: -1,
	 data: {hello: 1}
});

// 目标页代码
AliBridge.on('resume', function (event) {
	 console.log(event.data);
	 console.log(event.resumeParams);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>data</td>
<td>any</td>
<td>需要回传给上一页/目标页的数据。此数据将作为resume时的event.data</td>
<td>Y</td>
<td>null</td>
</tr></table>

- 最低支持版本：8.0+

###  back(后退)  ###
用户点击导航栏左上角返回按钮或者Android的物理返回键，页面将会收到此事件
如果在事件的处理函数中调用了event.preventDefault()，容器将忽略backBehaviour，js需要负责回退或做其他操作

<pre>
AliBridge.on('back', function (e) {
	 e.preventDefault();
	 AliBridge.call('popTo', {index: 0});
}, false);
</pre>

- 最低支持版本：8.0+

###  optionMenu  ###
导航条右上角按钮被点击时触发

<pre>
AliBridge.on('optionMenu', function () {
	 // ... do something
}, false);
</pre>

- 最低支持版本：8.0+

### toolbarMenuClick  ###
在8.2及其以上的版本，如果添加了自定义的菜单，当用户点击按钮会触发回调，回调会返回当前点击按钮在初始化的时候传入的name和tag属性。从而做一些业务上的处理

<pre>
AliBridge.on('toolbarMenuClick', function (e) {
	//得到name属性值
	console.log(e.data.name);
	//得到tag属性值
	console.log(e.data.tag)
}, false);
</pre>

- 最低支持版本：8.2+

###  titleClick  ###
- version:8.2
- 事件描述：点击标题触发回调

<pre>
AliBridge.on('titleClick', function () {
}, false);
</pre>

- 最低支持版本：8.2+

###  subtitleClick  ###
- 注：
subtitleClick事件回调会触发titleClick回调，建议titleClick 和 subtitleClick只使用其中一个

- version:8.2
- 事件描述：点击子标题触发回调

<pre>
AliBridge.on('subtitleClick', function () {
}, false);
</pre>

- 最低支持版本：8.2+

##  上下文类  ##

###  popTo (退回指定界面)  ###
- 示例

<pre>
// 按index跳转
AliBridge.call('popTo', {

	 index: -2,
}, function (result) {

	 if (error) {
	   console.log(error);
	 }
});
// 按url跳转
AliBridge.call('popTo', {

	 url: 'http://d.alilpay.com/step2.html'
}, function (result) {

	 if (result.error) {
	   console.log(result.error);
	 }
});
// 按urlPattern跳转
AliBridge.call('popTo', {

	 urlPattern: 'step2.html'
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>index</td>
<td>int</td>
<td>目标界面在会话界面栈中的索引；如果小于零，则将与当前界面的index相加</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>url</td>
<td>string</td>
<td>目标界面的URL</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>urlPattern</td>
<td>string</td>
<td>目标界面的URL匹配表达式（URL如果包含urlPattern，匹配成功）</td>
<td>N</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result</td>
<td>undefined</td>
<td>操作成功时，回调可能不被调用；result不应被使用</td>
</tr></table>

- 错误
<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>未配置参数； </td>
无效的index;
未匹配url;
未匹配urlPattern;
</tr></table>

- 最低支持版本：8.1+

###  exitApp (退出当前H5应用)  ###
- 例子

<pre>
AliBridge.call('exitApp');
</pre>

- 参数

	无

- 最低支持版本：8.2+

###  openInBrowser (浏览器中打开)  ###

- 示例

<pre>
AliBridge.call('openInBrowser', {
	 url: 'http://m.baidu.com/'
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>url	</td>
<td>string</td>
<td>要打开的URL</td>
<td>Y</td>
<td>当前页面URL</td>
</tr></table>

- 最低支持版本：8.1+

###  窗口控制  ###
- 示例

<pre>
// 开新窗口
AliBridge.call('pushWindow', {

	 url: 'http://www.baidu.com/',
	 param: {
	   readTitle: true,
	   defaultTitle: true,
	   showToolBar: false
	   // ...
	 }
});

// 关闭窗口，可传递参数
AliBridge.call('popWindow',{

	data: {
	}
});

// 关闭窗口（别名）
AliBridge.call('closeWebview');
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
<th>版本</th>
</thead>
<tr>
<td>url</td>
<td>string</td>
<td>要打开的url</td>
<td>N</td>
<td></td>
<td>8.0: 支持绝对url<br>8.1: 支持绝对/相对url</td>
</tr>
<tr>
<td>param</td>
<td>dictionary</td>
<td>新开窗口的属性配置<br>支持的key/value参见启动参数列表(其中的"YES"/"NO"需要使用true/false代替)</td>
<td>Y</td>
<td>{}</td>
<td>8.0: <br></td>
8.1: 没有指定的属性将从当前窗口继承
</tr></table>

- 最低支持版本：8.0+

##  扩展类  ##
###  getNetworkType (获取网络状态)  ###
- 示例

<pre>
AliBridge.call('getNetworkType', function (result) {

	 console.log(result.networkType);
});
</pre>

- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
<th>版本</th>
</thead>
<tr>
<td>result.err_msg(兼容微信)</td>
<td>string</td>
<td>网络类型<br>'network_type:fail': 无网络, 或网络断开<br>'network_type:wifi': wifi网络<br> 'network_type:wwan': 非wifi</td>
<td>8.0</td>
</tr>
<tr>
<td>result.networkType</td>
<td>string</td>
<td>网络类型<br>'fail': 无网络，或网络断开<br>'wifi': wifi网络<br>'wwan': 非wifi</td>
<td>8.2</td>
</tr>
<tr>
<td>result.networkAvailable</td>
<td>bool</td>
<td>网络是否连网可用</td>
<td>8.2</td>
</tr></table>

- 最低支持版本：8.0+

###  sendSMS (调起短信发送界面)  ###
- 示例


<pre>
AliBridge.call("sendSMS",{
	mobile: '15088640308',
	content: 'Hello'
} function(result) {

	console.log(result.status);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>mobile</td>
<td>string</td>
<td>预填入的目标手机号</td>
<td>Y</td>
<td></td>
</tr>
<tr>
<td>content</td>
<td>string</td>
<td>预填入的短信内容</td>
<td>Y</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.status</td>
<td>string</td>
<td>短信发送结果<br/>'Success': 发送成功<br/>'Failed': 发送失败，比如网络问题<br/>
'Canceled': 用户取消发送
</td>
</tr>
</table>

- 最低支持版本：8.0+


###  contact (调用本地通讯录)  ###
- 示例


<pre>
AliBridge.call("contact", function(result) {

	 console.log(result.name, result.mobile);
});
</pre>

- 结果

<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.name</td>
<td>string</td>
<td>选中的联系人姓名</td>
</tr>
<tr>
<td>result.mobile</td>
<td>string</td>
<td>选中的联系人手机号</td>
</tr></table>

- 错误
<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>没有权限</td>
</tr>
<tr>
<td>11</td>
<td>用户取消操作</td>
</tr></table>

- 最低支持版本：8.0+


###  photo (拍照/选择照片)  ###
- 示例


<pre>
AliBridge.call('photo', {

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

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>dataType</td>
<td>string</td>
<td>结果数据格式:<br>dataURL: base64编码的图片数据<br>fileURL: 图片在文件系统中的url<br>图片存放于临时目录中，钱包退出时被清除</td>
<td>Y</td>
<td>dataURL</td>
</tr>
<tr>
<td>imageFormat</td>
<td>string</td>
<td>jpg / png</td>
<td>Y</td>
<td>jpg</td>
</tr>
<tr>
<td>quality</td>
<td>int</td>
<td>jpg的图片质量, 取值1到100</td>
<td>Y</td>
<td>75</td>
</tr>
<tr>
<td>maxWidth</td>
<td>int</td>
<td>图片的最大宽度. 过大将被等比缩小</td>
<td>Y</td>
<td>不限</td>
</tr>
<tr>
<td>maxHeight</td>
<td>int</td>
<td>图片的最大高度. 过大将被等比缩小</td>
<td>Y</td>
<td>不限</td>
</tr>
<tr>
<td>allowEdit</td>
<td>bool</td>
<td>是否允许编辑(框选). 为true时，拍照时会有一个方形的选框</td>
<td>Y</td>
<td>false</td>
</tr>
</table>

- 结果

<table>
<thead>
<th> </th>
<th>类型</th>
<th>说明</th>
</thead>
<tr>
<td>result.dataURL</td>
<td>string</td>
<td>base64编码的图片数据</td>
</tr>
<tr>
<td>result.fileURL</td>
<td>string</td>
<td>图片文件URL</td>
</tr></table>

- 错误
<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>用户取消</td>
</tr>
<tr>
<td>11</td>
<td>操作失败（权限不够）</td>
</tr></table>

- 最低支持版本：8.1+


###  scan (扫码/扫卡)  ###
- 示例

<pre>
AliBridge.call('scan', {

	 type: 'bar'
}, function (result) {


});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>type</td>
<td>string</td>
<td>扫描目标类型，qr / bar / card</td>
<td>N</td>
<td></td>
</tr>
</table>
- 结果

<table>
<thead>
<th> </th>
<th>类型</th>
<th>说明</th>
</thead>
<tr>
<td>result.barCode</td>
<td>string</td>
<td>扫描所得条码数据</td>
</tr>
<tr>
<td>result.qrCode</td>
<td>string</td>
<td>扫描所得二维码数据</td>
</tr>
<tr>
<td>result.cardNumber</td>
<td>string</td>
<td>扫描所得银行卡号</td>
</tr></table>

- 错误
<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>用户取消</td>
</tr>
<tr>
<td>11</td>
<td>操作失败</td>
</tr></table>

- 最低支持版本：8.1+


###  share (分享)  ###
- 备注
- 8.1版本的分享接口重新约定，分享组件存在以下问题，将在8.2解决：
- ios 新浪微博SDK url255限制
- ios 新浪微博不能分享图片+url
- android / ios微信分享不同程度展现不一致

- 示例

<pre>
AliBridge.call('share', {

	 'channels': [{
	   name: 'Weibo', //新浪微博
	   param: {
	     title: '分享的标题',
	     content: '分享的内容，不能超过140',
	     imageUrl: '分享的图片地址',
	     captureScreen: true, //分享当前屏幕截图(和imageUrl同时存在时，优先imageUrl)
	     url: 'http://baidu.com' //分享跳转的url，当添加此参数时，分享的图片大小不能超过32K
	   }
	 }, {
	   name: 'LaiwangContacts', //来往好友
	   param: {
	     title: '分享的标题',
	     content: '分享的内容',
	     imageUrl: '分享的图片地址',
	     captureScreen: true,
	     url: 'http://baidu.com'
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
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>channels</td>
<td>array</td>
<td>分享渠道列表，至少包含一个channel；如果只channel多于一个，会跳出渠道选择框</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>渠道名称。支持以下几种：Weibo/LaiwangContacts/LaiwangTimeline/Weixin/WeixinTimeLine/SMS/CopyLink</td>
<td>N</td>
<td></td>
</tr>
<tr>
<td>param</td>
<td>dictionary</td>
<td>指定渠道的参数，支持以下字段：<br>title: string, 分享标题<br> content : string, 分享内容<br> imageUrl : string, 图片url<br> captureScreen : bool, 默认为false, 是否截屏分享<br> url : string, 分享链接</td>
<td>N</td>
<td></td>
</tr></table>

- 结果

<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
<thead>
<th>result</th>
<th>dictionary</th>
<th>android 无回调</th>
</tr></table>

- 错误

<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>分享失败或取消</td>
</tr></table>

- 最低支持版本：8.1+

###  getCities (城市选择)  ###

- 城市选择
- 示例

<pre>
AliBridge.call('getCities', {

	 currentCity: '杭州市',
	 adcode:'310100'
}, function(result){

	 // 返回用户选择的城市名
	 //  {'city': '北京市','adcode':'110100'}
});
</pre>

- 最低支持版本：8.1+


###  vibrate (调用震动)  ###
- 示例

<pre>
AliBridge.call('vibrate');
</pre>

- 最低支持版本：8.2+


###  watchShake (摇一摇)  ###
- 摇一摇
- 示例

<pre>
AliBridge.call('watchShake', function(){

	 //摇到啦
});
</pre>

- 最低支持版本：8.2+

##  业务类  ##

### alipayContact (支付宝联系人)  ###
- 示例

<pre>
AliBridge.call("alipayContact", {

	 showMobileContacts: true
}, function(result) {

	 console.log(result.name, result.account);
});
</pre>

- 参数
<table>
<thead>
<th>名称</th>
<th>类型</th>
<th>描述</th>
<th>可选</th>
<th>默认值</th>
</thead>
<tr>
<td>showMobileContacts</td>
<td>bool</td>
<td>是否可从手机联系人中选择</td>
<td>N</td>
<td></td>
</tr></table>
- 结果
<table>
<thead>
<th></th>
<th>类型</th>
<th>描述</th>
</thead>
<tr>
<td>result.type</td>
<td>string</td>
<td>'local' / 'alipay' 选中的是手机联系人还是支付宝联系人</td>
</tr>
<tr>
<td>result.name</td>
<td>string</td>
<td>联系人姓名。result.type=='alipay'时为真实姓名</td>
</tr>
<tr>
<td>result.mobile</td>
<td>string</td>
<td>选中的联系人手机号；仅当result.type='local'时有效</td>
</tr>
<tr>
<td>result.account</td>
<td>string</td>
<td>选中的支付宝联系人账号；仅当result.type=='alipay'时有效</td>
</tr></table>

- 错误
<table>
<thead>
<th>error</th>
<th>描述</th>
</thead>
<tr>
<td>10</td>
<td>没有权限</td>
</tr>
<tr>
<td>11</td>
<td>用户取消操作</td>
</tr></table>

- 最低支持版本：8.1+


###  getClientInfo (获取客户端信息)  ###
- 示例

<pre>
AliBridge.call('getClientInfo', function (result) {


});
</pre>

- 参数
- 结果
<table>
<thead>
<th> </th>
<th>类型</th>
<th>说明</th>
</thead>
<tr>
<td>result</td>
<td>dictionary</td>
<td></td>
可以用以下key得到相关的信息
client.uid 用户id
client.version 钱包版本
os.name 客户端系统名称
os.version 客户端系统版本
device.id 客户端IMEI号
形如:{"client.uid":"2088xxxxx"}
</tr></table>

- 错误
- 最低支持版本：8.2+
