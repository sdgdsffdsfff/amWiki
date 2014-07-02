# ab - alipay container bridge kit
- pubdate: 2014-06-19

----
支持支付宝容器的bridge接口控件

## ab
提供了针对Alipay JSAPI的通用调用接口和全局绑定事件，调用方无需关注接口实现细节


### 示例代码
js
```
    //唤起弱提示
	AB.call("toast",{
	    content:"这是弱提示"
	},function(){
	});

    //返回当当前页面时唤起的事件
	AB.on("resume",function(){
	    AB.call("toast",{
	        content:"重新唤起此页面"
	        });
	});

```


### 接口列表

```
	/**
	 *
	 * 通用接口，调用方式等同AlipayJSBridge.call
	 * 无需考虑接口的执行上下文，必定调用成功
	 * @param {String} name 接口名
	 * @param {object} param 接口参数
	 * @fn {function} fn 回调函数
	 */
	AB.call = function (name,param,fn)

	/**
     * 绑定全局事件
     * @param {string} event 事件名称
     * @param {function} [fn] 回调函数
     */
    AB.on = function (event, fn)

```
