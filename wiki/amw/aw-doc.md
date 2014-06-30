# alipay mobile widget

- pubdate: 2014-06-20

------

## button
	设置指定按钮的点击事件函数

### 接口列表

```
	/**
	 * @name Button
	 * @class 封装的单个button类
	 * @param {Object} ele 传入Element类型的值
	 *
	 * @example
	 * var button = new Button(document.getElementById('button')});
	 */
	var Button = function (ele)
	
	/**
	 * Button类的prototype值，如果大于0则代表该button将启用timeLock功能，时间间隔内不能再次触发tap事件.
	 * @enum {number}
	 */
	Button.prototype.timeLock = 0;

	/**
	 * Button类的prototype值，如果为true则代表该button在timeLock期间会在dom结构上增加[disabled='disabled']属性
	 * @enum {boolean}
	 */
	Button.prototype.autoDisabled = false;

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
	 * 强制解锁一个button的锁定状态
	 */
	Button.prototype.unlock = function ()
```

### 示例代码

```
	var oBtn = new Button(document.getElementById('btn')});	//将#btn作为Button的实例化
	oBtn.timeLock = 1000;			//1000毫秒内不可以再次触发事件
	oBtn.autoDisabled = true;		//按钮不可点击
	oBtn.unlock = true;				//按钮立刻可以点击并触发事件
	oBtn.tap(						//绑定指定的点击事件，在1000毫秒内不可再次触发亦不可点击
		function(){
			//指定事件
		}, 
		1000,
		true
	)
```

### 演示
## dialog
	控制页面中提示窗的显示及设置参数

### 接口列表

```
	/**
	 * 显示toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	show: function (callback)
	
	/**
	 * 隐藏toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	hide: function ()
	
	/**
	 * 确认按钮的回调函数
	 *
	 * @memberof AW.dialog
	 *
	 * @type {Function}
	 */
	success: function ()
	
	/**
	 * 取消按钮的回调函数
	 *
	 * @memberof AW.dialog
	 *
	 * @type {Function}
	 */
	cancel: function ()
	
```

### 示例代码

```
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
	{
		target: '.J-am-dialog',				//className
		title: '亲',						//标题栏
		message: '这里是默认文案，请添加',	//默认文案
		button: '确定',						//btn内容
		animate: 'none',					//动画效果
		isWebview: true						//是否开启容器调用
	}
	
	dialog(opt);	//开启窗口
```

### 演示 可选
## InputFormat

对文本框中输入的数据自动格式化为某种固定格式。  

支持 AMD、CMD 规范，在不使用此类规范的环境中会以 [AW.InputFormat](http://www.google.com) 全局变量开放出来。

API文档: [http://site.alipay.im/AM/about/about.html](http://site.alipay.im/AM/about/about.html)


### 接口列表

```
	/**
	 * @desc        输入事件监听
	 * @param       {HTMLInputElement[]}    list    要监听的文本框元素
	 * @name        AW.InputFormat.listen
	 */
	kbc.listen = function (list)
	
```

### 示例代码

```
	formatVal('abcdefghijkmln', '4 ');	//需要格式化的值为'abcdefghijkmln'，规则为4位一组，以空格分隔开
		returns 'abcd efgh ijkm ln'		//则返回值为'abcd efgh ijkm ln'
	kbc.listen(list)					//list为要监听的元素以数组形式的集合
```

### 演示 可选
## lazyload
	控制文档中图片用简单图片占位，在onload后再加载真正图片，俗称懒加载

### 接口列表

```
	/**
	 * 初始化方法
	 *
	 * @memberof AW.lazyload
	 * @param {!Object} options - 配置参数
	 *
	 * @desc 初始化方法(可供外部调用)
	 *
	 * @example
	 * AW.lazyload.init();
	 * AW.lazyload.init({offsetPre:20});
	 */
	init: function (options)
	
	/**
	 * 对资源池添加懒加载监听，仅运行一次
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 对资源池添加懒加载监听，仅运行一次(可供外部调用)
	 *
	 * @example
	 * AW.lazyload.run();
	 */
	run: function ()
	
	/**
	 * 添加新的图片
	 *
	 * @memberof AW.lazyload
	 * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 添加新的图片(可供外部调用)
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
	
```

### 示例代码

```
	var opt = {
		"auto": true,				//是否自动加载标示位
		"offsetPre": 10,			//预加载偏移量，默认10，提升懒加载体验
		"lazyAttr": 'data-src'		//获取延迟加载的图片地址，如data-src = 'http://www.alipay.com/logo.png'
	}
	AW.lazyload.init(opt);			//执行lazyload
```

### 演示 可选
## toast
	控制页面中提示窗的显示及设置参数

### 接口列表

```
	/**
	 * 显示toast
	 *
	 * @memberof AW.loading
	 *
	 * @desc 外部调用
	 *
	 */
	show: function (callback)
	
	/**
	 * 隐藏toast
	 *
	 * @memberof AW.loading
	 *
	 * @desc 外部调用
	 *
	 */
	hide: function ()
	
	/**
	 * 确认按钮的回调函数
	 *
	 * @memberof AW.loading
	 *
	 * @type {Function}
	 */
	success: function ()
	
	/**
	 * 取消按钮的回调函数
	 *
	 * @memberof AW.loading
	 *
	 * @type {Function}
	 */
	cancel: function ()
	
```

### 示例代码

```
	/**
	 * 默认配置参数
	 *
	 * @memberof AW.loading
	 * @param {!Object} target - className，node对象
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
		target: '.J-am-toast',
		message: '这里是默认文案，请添加',
		type: 'none',
		hideDelay: '2500',
		showDelay: '0',
		animate: 'none',
		isWebview: true
	}
	
	dialog(opt);	//开启窗口
```

### 演示 可选