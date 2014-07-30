# alipay mobile widget

- pubdate: 2014-06-20


------

## 源代码地址
[amw源代码](https://github.com/am-team/amWidget/tree/master/dist)


## button

模拟按钮在按下的同时，手指移动后恢复未点击状态

### 示例代码
html
在html表里直接使用以下的标志，该组件在dom ready之后，会对以下所有具有这样特性的button进行初始化

```html
<button data-active-class="hover">			//声明按下的状态效果class名为hover
```
js
如果你在页面上动态加入了按钮之后，则需要使用js的方式进行初始化
```javascript
	var oBtn = AW.button(document.getElementById('btn')});	//将#btn作为Button的实例化
	oBtn.unlock();				//按钮立刻可以点击并触发事件
	oBtn.tap(					//绑定指定的点击事件，在1000毫秒内不可再次触发亦不可点击
		function(){
			//指定事件
		}, 
		1000,
		true
	)
```

### 接口列表

```javascript

	/**
	 * 为一个Button实例绑定一个tap事件
	 * @param {function|number|boolean} [fn] 需要绑定的tap事件。如果为number类型则自动识别为timelock;如果为boolean自动识别为enableAutoDisabled
	 * @param {function|number|boolean} [timelock] 私有的timelock值。如果为boolean自动识别为enableAutoDisabled
	 * @param {function|number|boolean} [enableAutoDisabled] 私有的autoDisabled
	 * @returns {Button}
	 *
	 * @example
	 * var button = new Button(document.getElementById('button')}).tap(function(){});
	 */
	Button.prototype.tap = function (fn, timelock, enableAutoDisabled)
	
	
	/**
	 * 强制解锁button的锁定状态
	 */
	Button.prototype.unlock = function ()
```

### Demo
**二维码地址**

![button demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RBgvTdV9.png)

`手机观看效果更好`

查看[Demo](../examples/button.html)

## dialog
	控制页面中提示窗的显示及设置参数

	
### 示例代码
js
```javascript
	/**
	 * 默认配置参数
	 *
	 * @memberof AW.dialog
	 * @param {!Object} target - className
	 * @param {!String} message - 默认文案
	 * @param {String} type - 类型（success | error | loading）
	 * @param {Number} hideDelay - 延迟隐藏时间（毫秒）
	 * @param {Number} showDelay - 延迟显示时间（毫秒）
	 * @param {String} animate - 动画效果
	 * @param {Boolean} isWebview - 是否开启容器调用（开启后不在容器则不调用）
	 *
	 * @desc 默认配置参数
	 *
	 */
	 
	var opt = {
		target: '.J-am-dialog',				//className
		title: '亲',						//标题栏
		message: '这里是默认文案，请添加',	//默认文案
		button: '确定',						//btn内容
		animate: 'none',					//动画效果
		isWebview: true						//是否开启容器调用
	}
	
	dialog(opt);	//开启窗口
```


### 接口列表

```javascript

	/**
	 * @description        显示dialog
	 * @param {string|object} options
	 *
	 * @memberof    AW
	 */
	dialog.show = function (options, fn)
	
	/**
	 * @description        显示dialog
	 * @param {string|object} options
	 *
	 * @memberof    AW
	 */
	dialog.alert = function (message, fn)
	
	/**
	 * @description        显示dialog
	 * @param {string|object} options
	 *
	 * @memberof    AW
	 */
	dialog.confirm = function (message, fn)
	
	/**
	 * @description        隐藏dialog
	 *
	 * @memberof    AW.dialog
	 */
	dialog.hide = function ()
	
```

### Demo
**二维码地址**

![dialog demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30R5KlY0sR.png)

`手机观看效果更好`

查看[Demo](../examples/dialog.html)

## InputFormatter

对文本框中输入的数据自动格式化为某种固定格式。  


### 示例代码
html
```
	<input type="text" data-format="4,"/>		input内容自动每4个分为1组,分隔符为逗号
```

js
```javascript
	var list = document.getElementsByTagName("input");	//获取输入框元素集
	AW.inputFormatter.listen(list);					//list为要监听的元素以数组形式的集合
```


### 接口列表

```javascript

	/**
	 * @desc        输入事件监听
	 * @param       {HTMLInputElement[]}    list    要监听的文本框元素
	 * @name        AW.InputFormat.listen
	 */
	kbc.listen = function (list)
	
```

### Demo
**二维码地址**

![inputFormatter demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RFPCKNLD.png)

`手机观看效果更好`

查看[Demo](../examples/inputFormatter.html)

## lazyload
	控制文档中图片，在onload后并由于滚动、页面大小变化或切换方向导致图片出现在偏移量范围内再加载真正图片，俗称懒加载

	
### 示例代码
html
```
	<img data-src="real_pic.png">	//页面载入后自动加载real_pic并显示
```
js
```javascript
	var opt = {
		"auto": true,				//是否自动加载标示位
		"offsetPre": 10,			//预加载偏移量，默认10，提升懒加载体验
		"lazyAttr": 'data-src'		//获取延迟加载的图片地址，如data-src = 'http://www.alipay.com/logo.png'
	}
	AW.lazyload.init(opt);			//执行lazyload
	
	AW.lazyload.load(obj);			//加入新的图片组，obj可以是节点，节点数组，父级元素，jQuery选择字符串等
```


### 接口列表

```javascript
	/**
	 * 初始化方法
	 *
	 * @memberof AW.lazyload
	 * @param {?Object} options - 配置参数
	 *
	 * @desc 初始化方法(可供外部调用)
	 *
	 * @example
	 * AW.lazyload.init();
	 * AW.lazyload.init({offsetPre:20});
	 */
	init: function (options)
	
	/**
	 * 资源池新增图片并触发加载监控
	 *
	 * @memberof AW.lazyload
	 * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 资源池新增图片并触发加载监控
	 *
	 * @example
	 * AW.lazyload.load('.lazy img');//选择器
	 * AW.lazyload.load([Nodelist]);//节点Nodelist（伪数组）
	 * AW.lazyload.load([Array]);//节点Array
	 * AW.lazyload.load(ImageElement);//图片节点
	 * AW.lazyload.load(OtherElement);//除图片外其它节点，找寻内部图片节点
	 * AW.lazyload.load(jQueryObject);//jQuery节点集（伪数组）
	 * AW.lazyload.load(ZeptoObject);//Zepto节点集（伪数组）
	 *
	 */
	load: function (addStack)
	
	/**
	 * 资源池新增图片
	 *
	 * @memberof AW.lazyload
	 * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 资源池新增图片
	 *
	 * @example
	 * AW.lazyload.add('.lazy img');//选择器
	 * AW.lazyload.add([Nodelist]);//节点Nodelist（伪数组）
	 * AW.lazyload.add([Array]);//节点Array
	 * AW.lazyload.add(ImageElement);//图片节点
	 * AW.lazyload.add(OtherElement);//除图片外其它节点，找寻内部图片节点
	 * AW.lazyload.add(jQueryObject);//jQuery节点集（伪数组）
	 * AW.lazyload.add(ZeptoObject);//Zepto节点集（伪数组）
	 *
	 */
	add: function (addStack)
	
	/**
	 * 对资源池添加懒加载监听，同一时间内有限运行仅一次
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 对资源池添加懒加载监听，同一时间内有限运行仅一次
	 *
	 * @example
	 * AW.lazyload.addLoadListener();
	 */
	addLoadListener: function ()
	
	/**
	 * 对资源池移除懒加载监听
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 对资源池移除懒加载监听
	 *
	 * @example
	 * AW.lazyload.addLoadListener();
	 */
	removeLoadListener: function ()
	
	/**
	 * 当前时机，执行一次懒加载遍历尝试
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 当前时机，执行一次懒加载遍历尝试
	 *
	 */
	run: function ()
	
```

### Demo
**二维码地址**

![lazyload demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RDnPmXup.png)

`手机观看效果更好`

查看[Demo](../examples/lazyload.html)

## loading
	在H5容器不支持相应效果时，为数据加载loading过程做出可配置提示

### 示例代码

js
loading配置参数
```javascript
	/**
	 * @description 默认配置参数
	 *
	 * @param {String} message - 默认文案
	 * @param {String} showDelay - 延迟隐藏时间（毫秒）
	 * @param {Boolean} callContainer - 是否开启容器native调用
	 *
	 * @memberof    AW.loading
	 *
	 */
	loading.options = {
		'message': '',
		'showDelay': '0',
		'callContainer': true
	}
```

### 接口列表

```javascript

	/**
	 * @description        loading
	 * @param {string|object} options
	 *
	 * @memberof    AW.loading
	 */
	loading.show = function (options)
	
	
	/**
	 * @description        隐藏loading
	 *
	 * @memberof    AW.loading
	 */
	loading.hide = function ()
```

### Demo
**二维码地址**

![loading demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/32Pbl2Lmw1.png)

`手机观看效果更好`

查看[Demo](../examples/loading.html)
## toast
	控制页面中提示窗的显示及设置参数

	
### 示例代码
js
```javascript
//简单调用：
toast.show('认证成功');
//完整参数调用：
toast.show({
    message: '认证成功',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
toast.hide(); //隐藏
```

### 接口列表
#### toast.show(message|options) 显示toast
`message`
需要显示的消息

`options`
#### message `String` 默认 ''

  * 提示文案

#### type `String` 默认 'none'

  * 'none' : 不显示图标
  * 'success' 会显示成功图标（对钩）
  * 'error' 会显示失败图标（八叉）
  * 'xxx'： 任意名称，需要自己定义图标对应的class属性。例如：am-icon-xxx

#### showDelay `String` 默认 '2500'

  * '2500' : 延时显示toast，毫秒

#### callContainer `Boolean` 默认 'true'

  * true : 开启容器方法
  * false : 关闭容器方法

#### toast.hide() 隐藏toast

### Demo
**二维码地址**

![toast demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RA5c6f8h.png)

`手机观看效果更好`

查看[Demo](../examples/toast.html)
