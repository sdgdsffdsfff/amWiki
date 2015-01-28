# 移动Web开发规范指南

- pubdate: 2015-01-28

---
## 移动基础规范指南
（版本：1.0）

>对该文档有任何疑问或建议，请 [到这里](http://gitlab.alibaba-inc.com/animajs/feedback/issues) 提出意见。同时欢迎加入【Anima解决方案沟通群：`253907639`】交流，谢谢！


### 总则
**开放** **默契** **人性**

1. 此指南是在开发中积累下来的经验和参考其它规范/指南制定的，它只是起指导作用，除个别条目强制之外，大多数为非强制约束，开发者可根据自己的实际情况自行决定是否要遵守
2. 该指南只是保证大方向一致性和最佳实践的阶段性总结，不是最后结论，它会随着时间而变化。
3. 该指南是开放性的，任何人对此可以进行提出异议和建议
5. 该指南对于特定条目会有指导性语言描述，该基本描述如下标注类型

【定义】对于某个词汇进行的范围和概念的限定

【最佳】最佳实践 根据开发中积累的经验提出的比较好的方式

【规范】强制实行的条目（非常少，只是在某些场合，考虑到整体需要，需要规范的条目须征得多数人的同意

【注意】需要注意 一般此项主要表明在某些场合下，处于性能、兼容或者其他环境的情况，需要关注这个条目，在此条目下面会加上注意的主要

【讨论】主要讨论确定，暂无定论，讨论本身会直接生成一个讨论的链接地址，以供参考

### 通用指南
*	使用html5文档定义【最佳】
*	优先使用utf-8编码进行编码，如遇其他编码的模板，静态资源需保持utf-8编码【最佳】
*	定义viewport属性，一般定义格式如下,如果网站需要进行放大/缩小，需要根据实际情况定义scale的比例【最佳】

		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0;"
          name="viewport"/>
*	android版本兼容性考虑2.3+，ios版本考虑5.0+【推荐】
*	html页面中的标签结构平坦化
*	图片采用懒加载的方式 - 推荐使用懒加载组件来实现
*	对于icon类`简单`小图标采用css3>base64/sprite>iconfont的优先级考虑使用.
*	移动性能 手机上的性能问题，主要集中在repaint和reflow上，因此脚本在处理的时候，需要特别注意。- 链接到最佳实践
*	网络环境 在手机开发web的时候，需要特别注意的就是弱网络环境（2G/2.5G或者在信号不稳定）的问题，

### UI组件指南
#### UI组件总则
*	对于组件的使用，建议使用如下优先考虑

	1. 容器提供的组件，比如说dialog，toast等
	2. JS模拟组件
	3. 浏览器提供的组件，比如说input，alert，confirm等
*	在组件开发中，建议按照以上的优先级进行优雅降级的考虑
*	对于使用浏览器原生组件，不保持一致性原则，即不强制要求在不同系统ios，android，不同的手机厂商中的UI组件一致性

#### 组件化
##### 通用约定
*	考虑webkit内核浏览器，其他核心，除IE10以上，不考虑其他兼容性【最佳】
*	使用无衬线字体

		body {
	    	font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
		}
*	组件命名中fn,ui,text为保留字，除在指南中约定之外，建议不在其他场合进行使用，并且凡以此命名的类名，其中所有的数值的设定，皆为非important关键字【规范】

	* fn-clear 清除浮动,fn-left,fn-right 左右浮动
	* fn-show，fn-hide 显示 display:block，隐藏 display:none
	* text-left，text-center,text-right 文字左中右居中

*	凡被JS使用的类名，在通常命名前加上J_或j-前缀,在同一个项目里需要保持形式的一致性【最佳】

*	特定浏览器CSS属性的前缀采用以下两种，-webkit-和-ms-,凡对特定浏览器属性的样式编写范式如下:【最佳】

		-webkit-{prop}:{value}
		-ms-{prop}:{value}
		{prop}:{value}

*	通用业务组件名称，建议使用如下约定：【最佳】

		button btn 按钮
		nav 导航
		list 列表
		paging 分页
		tab 标签页
		select 下拉框
		input 输入框
		group 特性相似的群，与list的区别在于，list有明确的列表布局的特性，group没有其特性
		form 表单

*	常用模块状态名称【最佳】

		current	当前模块状态
		selected	被选中状态
		disabled	失效状态
		focus	焦点集中状态
		blur	焦点失去状态
		checked	被勾选状态
		success	成功状态
		error	错误状态

		hover active	手指在模块上状态【讨论】

##### UI模块组织方式
**扁平化方式，分为三个层级：**【最佳】

1. 	基础库（reset）

	* 采用reset（控制倾向性）的方式，不过将reset拆分成两个部分：normalize（自然倾向性）部分和reset部分【规范】

2. 通用组件 符合UI规范的样式组件
	* iconfont 推荐使用以下iconfont http://iconfont.cn/【注意】

	在使用iconfont的时候，需要注意，iconfont的字体是需要网络上下载的，并且部分手机不会缓存，而且是异步下载的，因此可能会出现iconfont加载不成功的情况，并且从实际的应用来看，这种情况发生的概率不小。

	使用iconfont的时候，建议将特有icon文字放在样式里定义，而非直接复制到html中【最佳】

		<div>
			<span>成功：</span>
        	<i class="iconfont iconfont-tips-success"></i>
    	</div>
3. 页面样式 体现具体页面特性的样式

##### 组件命名
######	组件【定义】

具有独立特征的层级嵌套结构，它本身可以嵌入其他组件，也同时可以被其他组件嵌套，但是无论什么嵌套形式，他本身的独立特征不会丢失，同时它与其他组件的独立特征不会产生相互影响。

######	命名指南

*	组件命名是明晰的，从拼写的单词能直观的看出组件用途【最佳】
*	建议不使用缩写，除对字母长度超过6个以上的单词。如果使用缩写建议缩写后的单词在4个字母以上，谨慎使用3个字母及以下的缩写，除非该含义非常清晰可见，并没有歧义，比如说btn，不建议的缩写，例如 ui，【最佳】
*	组件命名采用层次命名的方式，中间采用-为间隔符，层次方式如下

	**[样式库名称] - [组件名称] (- [组件状态])? (- [子组件名称])? (- [子组件状态])?

	例如：amui库中有个list列表，里面有个按钮，当用户点击list中当前被选中的那个item中的按钮的时候，产生一个按上去的效果，这个时候的命名方式建议如下：am-list-current-btn-active

	* 样式库名称建议使用该样式库的名称简写，建议2~4个字母
	* 样式库名称不建议使用宽泛且无具体意义的命名，比如说ui等【规范】

*	组件内部的类名需要体现上层的含义，体现的方式没有强行规定，但是可以直观看出

	例如：list表中嵌套一个按钮，

*	独立系统里统一命名风格【规范】

	在一个完整的模块命名方式，对于相同类型的模块命名保持一致，比如说，使用了button作为模块类名之后，后面如果再需用到按钮，不再建议使用btn的方式。

##### 最佳实践
*	对于css3的兼容性参考以下网站：[http://caniuse.com/](http://caniuse.com/)
*	对于水平布局，建设使用flex样式【最佳】【注意】
	flex有各种版本以及操作系统的兼容性问题，详细文档参考：[flex-guide](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
*	使用css3来绘图，减少使用图片

#### 推荐样式库
*	[amui](http://aliceui.org/mobile/openapi.html) 移动端ui样式库

### Javascript指南
#### 无线web开发脚本的特点
1. html5特性使用 在手机中进行web开发，使用html5特性进行开发，其中包括html5的标签，api使用，es5的支持等，兼容性可以参考http://caniuse.com
2. 移动特性的考虑 比较特别的是以下几种特性：[touch事件](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)，[屏幕旋转事件](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)，[滚动事件](http://stackoverflow.com/search?q=mobile+web+scroll)，对于移动方面，以上几种特性有一些非常独特的处理方式主要注意

	附注参考：[webkit滚动实现机制](http://www.iunbug.com/archives/2012/09/19/411.html)
3. 兼容性考虑 移动web无需考虑ie和w3c标准的兼容性问题，但是需要注意以下兼容性问题
	1. android不同版本之间的兼容性 2.x 和 4.x 4.4 - [参加资料](http://caniuse.com/#compare=android+2.1,android+2.2,android+2.3,android+4,android+4.1,android+4.2-4.3,android+4.4,android+4.4.3)
	3. 手机之间的兼容性 由于手机厂商各种林立，造成不同厂商对于webkit核心有做部分修改，造成不同的手机之间的兼容性问题

#### Javascript模块组织
对于脚本的加载层次

1.	移动类库和Loader模块加载（可选）

	是否使用Loader加载器，根据业务的复杂度，对于小微web，建议不使用模块加载机制。

	微web【定义】
	展现型应用，少量简单交互，业务独立且逻辑简单，其js有效代码规模在千行以下，其业务的需求有限，日常不会进行频繁迭代开发，
2. 轻量级Widget(可选)
3. 页面中的业务逻辑

##### 轻量级widget组件
1.	“短“代码 保证代码最简化和逻辑可读性之间的平衡，控制总体代码的大小
2.	依赖“平”坦化 建议依赖层次<3层，无依赖为最佳
3.	“弱”侵入 对于业务代码具有最弱化侵入性，业务代码能对其进行低成本的拆装
4.	接口形“似” 开放api接口的命名和参数已现有其他类似widget，jquery，zepto等命名和参数列表作为参考
5.	代码“开放” widget代码结构清晰，逻辑明确可读性强，具有必要的注释，可供其他人阅读和修改
6.	适量重复，适度灵活（扩展性） swtichable/autocomplete

- 推荐组件样例

##### 最佳实践
*	不建议使用jquery作为移动web的类库，推荐轻量级类库yocto等类库
*	不推荐使用mv*模式库例如angularjs进行无线web开发
*	对于带有图片的长列表，需要做好性能上的优化处理，特别是对于图片方面的优化，这个直接会影响到页面性能 - [参考资料](http://www.smashingmagazine.com/2013/08/12/creating-high-performance-mobile-websites/)


### 性能指南
网站的性能由很多方面，以下按照几个大类进行分别阐述：
#### 网络请求
需要考虑到2G、2.5G以及无线的不稳定性的特性，作为请求数量需要保持尽可能少，建议除图片资源外，其他静态资源的请求数量控制在5个以内，类似静态资源的访问，尽可能合并处理，并且需要控制大小【最佳】

注意301/302跳转，每一跳的代价很大，特别是不同域名的跳转。在2G下性能变差将尤其明显

**事实证明，在2G或者弱3G信号环境下连续超过3次以上的301/302，用户将会放弃此次浏览**
#### 最佳实践
* 尽可能合并js、css等多个网络请求数
* 小图片尽可能使用css3实现，减少图片请求数
* 对于网络请求，需要gzip压缩
* js、css等静态资源使用cdn
* 对于js和css的量不是很大的情况下，可以考虑合并在页面中，一次加载到手机
* 可以考虑h5缓存的方案，减少网络请求

#### 页面渲染

由于移动版的浏览器性能主要瓶颈在于DOM的reflow和repaint的耗时，因此对于页面动画效果，处理的时候，需要特别谨慎【注意】

##### 2D渲染
*   对于绝大多数的渲染，浏览器引擎能正常进行解析和显示，不过对于CSS3中的一些2D渲染，主要值得注意。
*   在使用圆角，阴影，渐变的css3属性，需要考虑到其性能，特别是渐变/阴影，对低端Android机的性能的影响较大


##### 3D渲染
3D渲染是个非常cool的属性，它能将页面上的元素进行3D化的渲染，实现各种非常炫酷的效果。不过由于其非常的先进性，所以能支持3D的属性的机型、版本、厂商也会有很多的不同。需要注意的是：

* 3D兼容性 不同的机型、版本、厂商对其支持的力度不同
* 3D会造成大量CPU计算，耗性能，尽可能不要长时间进行3D渲染
* 3D的渲染存在缺陷 对于图片的3D渲染的时候，部分机型发现一些渲染问题。

从实践的角度来看，3D的最大的好处，它使用了硬件加速功能，因此在做页面动画的时候，即使不是做3D的变化，却可以通过3D的设置开启硬件加速功能，提升渲染性能。建议使用 translateZ(0)；开启当前的节点硬件加速功能，又不会带来渲染变化，是一个比较安全的方法。【最佳】

**使用2D动画并不会开启硬件加速，必须使用3D属性，才会开启硬件加速，**【注意】

##### 图片

页面中的图片是对性能的一大挑战，因为图片不但会直接影响DOM的渲染，同时还会占用大量的内存。大量的内容暂用，会导致浏览器变卡，变慢。

对于图片，需要严格控制大小和数量，以及载入时机。

#### 最佳实践
*   html代码的层次近可能扁平
*   在编写代码的时候，尽可能要避免DOM的reflow和repaint的事件，如果发生，尽可能控制在局部区域
*   在写动画的时候，推荐是css3的动画，而不是采用style的方式。【最佳】
*   对于大量的图片的处理，尽可能采用懒加载的方式，并且在一个页面中控制图片的数量
*   在做动画时候，使用translateZ(0)；的方式开启3D硬件加速功能

### 注意事项
*	click事件有300ms的延迟，需要关注【注意】

	android4.4之后，对于viewport中如果设置了width=device-width参数，click事件将不会再有300ms的延迟，对于之前，有对应的解决方案，参见[fastclick](https://github.com/ftlabs/fastclick)
*   事件绑定，对于大量重复性的事件绑定到父节点，不推荐将所有事件都绑定到根节点
*   避免对于DOM的`短时间 大量 频繁`操作，适度使用throttle、debounce机制，这两种机制可参考如下[文档](http://blog.csdn.net/dyllove98/article/details/9281507)

### 性能方面资料参考
*	[http://www.smashingmagazine.com/2013/08/12/creating-high-performance-mobile-websites/](http://www.smashingmagazine.com/2013/08/12/creating-high-performance-mobile-websites/)
*	[http://www.sencha.com/blog/5-myths-about-mobile-web-performance/](http://www.sencha.com/blog/5-myths-about-mobile-web-performance/)
*	[http://www.webperformancetoday.com/tag/mobile-web-performance/](http://www.webperformancetoday.com/tag/mobile-web-performance/)
*	[https://developers.google.com/speed/docs/best-practices/mobile](https://developers.google.com/speed/docs/best-practices/mobile)

## 兼容性指南
###   设备兼容性
*	兼容性需要考虑不同的机器的开发商，特别要注意国内深度定制的厂商，比如阿里云，小米，魅族，锤子手机等
*	不同设备的屏幕分辨率 - [http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density](http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density)

#### 移动端Web分级标准
![mobile-web-grade](https://t.alipayobjects.com/images/T1mB0eXodbXXXXXXXX.jpg) 
##### 说明
1. 作为一级的类目里面的设备，系统和浏览器是自测的必要选项【规范】
2. 一级以下的类目不作为必须的自测项，手上有设备方便看的话，可以测试一下
3. 该数据的统计时间为2015.1月份，今后每三个月会重新做一次统计

### 语言兼容性
*   [html5兼容性参考](http://caniuse.com/#agents=ios_saf,op_mini,android,bb,ie_mob&cats=HTML5)
*   [css兼容性](http://caniuse.com/#agents=ios_saf,op_mini,android,bb,ie_mob&cats=CSS)
*   [jsapi兼容性](http://caniuse.com/#agents=ios_saf,op_mini,android,bb,ie_mob&cats=JS_API)

### 推荐阅读
*	[移动WEB性能](http://www.webperformancetoday.com/tag/mobile-web-performance/)
*	[优化WEB缓存](https://developers.google.com/speed/docs/best-practices/caching)
*	[最小化RTT次数](https://developers.google.com/speed/docs/best-practices/rtt)
*	[最小化请求负载](https://developers.google.com/speed/docs/best-practices/payload)
*	[优化浏览器渲染](https://developers.google.com/speed/docs/best-practices/rendering)
