# AMJ alipay mobile javascript kit

- pubdate: 2014-06-19

----
## date
date提供了获取当前时间戳和格式化指定日期的方法

### 示例代码
js
```
	var date = AJ.date;
	var d = new Date();
	var ds = date.format(d,'yy-MM-dd'); //2014-05-03
	var dnow = date.now(); //返回当前时间戳，如：1403104207894
```

### 接口列表

```

	/**
	 * 日期格式化方法
	 *
	 * @memberof AJ.date
	 * @param {!Date} date - 日期对象
	 * @param {?String} formatter - 指定格式化格式 格式说明 y代表年份，M代表月份，d代表天数，h代表时，m代表分，s代表秒
	 *
	 * @returns {String}
	 *
	 * @desc 日期格式化方法
	 *
	 * @example
	 * var d = new Date();
	 * var ds = AJ.date.format(d,'yy-MM-dd'); //2014-05-03
	 * var ds = AJ.date.format(d,'yy/M/d'); //2014/5/3
	 * var ds = AJ.date.format(d,'yy/MM/d hh:mm:ss'); //2014/5/3 18:31:24
	 */
	format: function (date, formatter)
	
	/**
	 * 当前时间时间戳
	 *
	 * @memberof AJ.date
	 *
	 * @returns {Number}
	 *
	 * @desc 当前时间时间戳
	 *
	 * @example
	 * var nowStamp= AJ.date.now();
	 */
	now: function ()

```
## image
image提供了将图片文件转为base64编码的方法

### 示例代码
js
```
	AJ.image.toBase64("abc.png",function(base64Data,error){
		//返回值base64Data即为结果，如"data:image/png;base64....."，
	})
```

### 接口列表

```
	/**
	 * image转换base64编码方法
	 *
	 * @memberof AJ.toBase64
	 * @param {!path} path - 图片地址（需要同域,项目目录）
	 * @param {!function} callback - 返回数据 callback有两个参数，如除非异常，error为具体的Exception对象，如果非异常的情况，为undefined
	 *
	 * @desc 图片转换base64编码
	 *
	 * @example
	 * AJ.image.toBase64("abc.png",function(base64Data,error){
     *  //data:image/png;base64.....
	 * })
	 */
	 image.toBase64 = function (path, callback)

```

### 规则说明
1. 不支持跨域图片的base64编码
2、不支持file形式的图片base64编码
## storage
storage提供了页面的数据存储的模式，采用了localstorage的机制进行数据存储


### 示例代码
js
```
	var storage = AJ.storage;
	storage.set("key1","value1");
	storage.get("key1"); //返回value1
	storage.clear();	//清空所有键值
	storage.getExpiredDate("key1")		//获取key1键值的过期时间
```


### 接口列表

```
	/**
	 *
	 * 获取储存内容
	 * @param {string} key 存储内容的key值
	 * @returns {string|undefined} 返回值为undefined没找到该内容
	 *
	 * @example
	 * var content = AJ.storage.get("name");
	 *
	 * */
	get: function (key)

	/**
	 * 设置储存内容
	 * @param {string} key 存储的key值，区分大小写
	 * @param {*} val 设置的存储数值，除了object对象会做JSON.stringify处理，其他皆会转成string类型
	 * @param {?number|date} expire 过期时间,如果是date类型，则是过期日期，如果是number则是过几秒后过期 单位：秒
	 *
	 * @returns {undefined|object} 成功返回undefined，不成功，返回一个异常对象
	 *
	 * */
	set: function (key, val, expire)

	/**
	 * 删除存储值
	 * @param {string} key 储存的键值
	 *
	 * */
	remove: function (key)

	/**
	 * 清空所有键值
	 *
	 * */
	clear: function ()

	/**
	 *
	 * 获取过期日期
	 * @param {string} key 键值
	 * @returns {undefined|date} 如果该key不存在或者没有日期，则返回undefined,否则返回date对象
	 *
	 * */
	getExpiredDate: function (key)

```

### 规则说明
1.  该storage设置的key值和原生的通用，不过要使用过期功能，则必须使用该组件。建议在代码中不要把该组件和原生混用，以便出现不符预期的情况
2.  原生storage如果传入的value为object的时，会转成[object Object]，该组件会对object进行JSON.stringify处理，其他类型皆和原生storage处理一致
3.  该组件的输出value为string，不会强制做JSON.parse，需要使用方根据事情情况，自行处理
4.  该组件对于异常，键值不存在，storage不支持等情况，api的返回皆为undefined
## string
string提供了计算字符串长度的方法，中文算两个，英文算一个

### 示例代码
js
```	
	var str = "alipay";
	var length = AJ.string.getFullLen(str); //返回字符串str的长度
```

### 接口列表

```
    /**
     * 计算字符串长度的方法，中文算两个，英文算一个，特殊字符不算
     *
     * @memberof AJ.string
     * @param {!str} str - 需要计算长度的字符串
     *
     * @returns {int|undefined} 如果传入的不是string字符串，一律返回undefined
     *
     * @desc 计算字符串长度的方法
     *
     * @example
     * AJ.string.getFullLen($(this).val())
     */
	string.getFullLen = function (str)

```

## uri
uri提供了对url进行对象化以及提供了便捷的方法，更加容易对url进行queryString的操作


### 示例代码
js
```
	var uri = AJ.uri;
	var url = uri.parse(location.href); //返回一个uri对象
	uri.setParam(location.href,"name","value"); //返回当前的url并且在queryString上加上name=value的值
```


### 接口列表

```
	/**
	 * 解析url，将url解析成uri对象
	 * @param {string} url url字符串,如果传入的是对象，这不做任何处理，返回
	 * @returns {object} uri对象
	 * @example
	 * AJ.uri.parse(location.href);
	 * */
	parse: function (url)

	/**
	 *
	 * 将uri对象转换成string对象
	 * @param {object} uri uri对象
	 * @returns {string}
	 *
	 * @example
	 * console.log(AJ.uri.stringify(uri)); // http://www.alipay.com
	 *
	 * */
	stringify: function (uri)

	/**
	 *
	 * 设置queryString的值
	 * @param {!string|object} url url字符串或者是uri对象
	 * @param {!string|object} name queryString的名字 如果是对象的话，则进行批量设置
	 * @param {?string} value queryString的值
	 *
	 * @returns {string|object} 如果传入的参数是string，则返回string，否则返回uri对象
	 *
	 * */
	setParam: function (url, name, value)

	/**
	 * 获取QueryString的值
	 * @param {!string|object} url url字符串或者是uri对象
	 * @param {!string} name 需要查找的名称
	 * @returns {string|undefined} 如果未找到，则返回undefined
	 *
	 * */
	getParam: function (url, name)

	/**
	 *
	 * 删除param中的name
	 * @param {string|object} url url字符串或者是uri对象
	 * @param {string} name queryString 中的名字
	 *
	 * @returns {string|object}  如果传入的参数是string，则返回string，否则返回uri对象
	 *
	 * */
	removeParam: function (url, name)

```

### 规则说明
1.
