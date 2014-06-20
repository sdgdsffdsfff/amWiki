# ab alipay container bridge
- pubdate: 2014-06-19

支持支付宝容器的bridge接口控件

----
## ab
ab提供了针对AliBridge的通用调用接口和全局绑定事件

### 接口列表

```
	/**
	 * 通用接口，调用方式等同AlipayJSBridge.call
	 * 无需考虑接口的执行上下文，必定调用成功
	 */
	AliBridge.call = function ()

	/**
	 * 绑定全局事件
	 * @param {string} event 事件名称
	 * @param {function} [fn] 回调函数
	 */
	AliBridge.on = function (event, fn)

```

### 示例代码

```
	AliBridge.on("toast",fn);
```