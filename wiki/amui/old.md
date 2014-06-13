# AMUI
- pubdate: 2014-03-06
- tags: 关于
- author: 雷骏

---

AMUI是支付宝无线端快速建站的解决方案，包含通用样式库、场景解决方案等。</br>
当前版本： **_1.0.2_**
>支持iOS4.2+、Android2.2+版本

---

<link rel="stylesheet" type="text/css" href="../static/amui-doc.css" media="all">
<link rel="stylesheet" type="text/css" href="./docs.css" media="all">

<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/city-select.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/timeline.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/article.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/agreement.css" media="all">
<script type="text/javascript" src="./docs.js"></script>
<script type="text/javascript" src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>

##使用方法

### 引入amui.css
>如发现您的amui是老版本，建议升级，ui库会做好新老版本兼容的保证。

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.css" media="all">
```
### 老版本升级
>如发现您的amui是老版本，建议升级，升级方法有两种。

* 一、使用升级补丁
>v1.01升级到v1.02补丁(1.02主要是针对8.1钱包版本做了优化)

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/patch/v101t102.css" media="all">
```

* 二、直接使用最新版文件

### 无线端html模板

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Examples</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="format-detection" content="email=no"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"/>
    <link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.css" media="all">
</head>
<body ontouchstart="">
    <!--你的html页面代码-->
</body>
</html>
```
### 引入amui.js
**_amui.js_**是一个附加性脚本，主要为部分ui的交互需要而制作，如果没有使用到这部分交互，可以选择不引入
>目前还未上线，即将发布，敬请期待，不影响现有使用

```html
<script src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>
```

###combo文件合并服务
combo是支付宝提供的文件合并服务，可以将多个文件合并成一次请求，可以按需使用。
>例：amui.css和city-select两个文件，使用 **_,_**进行文件分隔， **_??_**让文件名与域名隔离。

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/view/city-select.css" media="all">
```

## 布局

###弹性布局
弹性布局是CSS3新引入的布局机制，根据下属弹性元素个数，动态分配空间。可以使用 **_am-flexbox_**结合 **_am-flexbox-item_**来搭建。

>弹性布局的优点：动态分配剩余空间，增删元素，都会达成新的平衡

````html
<!--div.am-example为样例所用，实际使用不需要-->
<div class="am-example">
    <div class="am-flexbox">
        <div class="am-flexbox-item">2列</div>
        <div class="am-flexbox-item">2列</div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item">3列</div>
        <div class="am-flexbox-item">3列</div>
        <div class="am-flexbox-item">3列</div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item">4列</div>
        <div class="am-flexbox-item">4列</div>
        <div class="am-flexbox-item">4列</div>
        <div class="am-flexbox-item">4列</div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item">5列</div>
        <div class="am-flexbox-item">5列</div>
        <div class="am-flexbox-item">5列</div>
        <div class="am-flexbox-item">5列</div>
        <div class="am-flexbox-item">5列</div>
    </div>
</div>
````
>弹性布局的缺点：如果某个元素需要占有空间过多，它会挤占其它元素的空间。<br/>如想避免挤占，可以使用预定义的 **_am-flexbox-average_**，使其强制均分。

````html
<!--div.am-example为样例所用，实际使用不需要-->
<div class="am-example">
    <div class="am-flexbox am-flexbox-average">
        <div class="am-flexbox-item">3</div>
        <div class="am-flexbox-item">使用am-flexbox-average，会让内容不挤占，强制均分</div>
        <div class="am-flexbox-item">3</div>
    </div>
    <div class="am-flexbox am-flexbox-average">
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item am-ft-ellipsis">am-ft-ellipsis文字单行截取</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item">3</div>
        <div class="am-flexbox-item am-ft-ellipsis">某项内容过多，会挤占其它兄弟元素的生存空间</div>
        <div class="am-flexbox-item">3</div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item am-ft-ellipsis">某项内容过多，会挤占其它兄弟元素的生存空间</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
        <div class="am-flexbox-item">6</div>
    </div>
</div>
````


###浮动栅格布局
浮动布局是传统布局已经应用非常灵活的布局机制，无线端再加上一些宽度百分比的自适应实现，也能较灵活使用。可以使用 **_am-grid_**结合 **_am-grid-item_**来搭建。

````html
<!--div.am-example为样例所用，实际使用不需要-->
<div class="am-example">
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-50">50%</div>
        <div class="am-grid-item am-grid-item-50">50%</div>
    </div>
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-25">25%</div>
        <div class="am-grid-item am-grid-item-75">75%</div>
    </div>
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-25">25%</div>
        <div class="am-grid-item am-grid-item-50">50%</div>
        <div class="am-grid-item am-grid-item-25">25%</div>
    </div>
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-25">25%</div>
        <div class="am-grid-item am-grid-item-25">25%</div>
        <div class="am-grid-item am-grid-item-25">25%</div>
        <div class="am-grid-item am-grid-item-25">25%</div>
    </div>
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-33">33%</div>
        <div class="am-grid-item am-grid-item-33">33%</div>
        <div class="am-grid-item am-grid-item-33">33%</div>
    </div>
    <div class="am-grid">
        <div class="am-grid-item am-grid-item-33">33%</div>
        <div class="am-grid-item am-grid-item-66">66%</div>
    </div>
</div>
````
## 常用基础类

###浮动

````html
<div class="fn-clear">
    <div class="fn-left">左浮动</div>
    <div class="fn-right">右浮动</div>
</div>
````

###文字水平对齐

````html
<div class="am-ft-left">
    文字左对齐
</div>
<div class="am-ft-center">
    文字中对齐
</div>
<div class="am-ft-right">
    文字右对齐
</div>
````

###文字大小

````html
<div class="am-ft-sm">
    小 14px
</div>
<div class="am-ft-md">
    正常 16px
</div>
<div class="am-ft-lg">
    稍大 17px
</div>
<div class="am-ft-xl">
    较大 18px
</div>
<div class="am-ft-xxl">
    偏大 20px
</div>
<div class="am-ft-xxxl">
    特大 24px
</div>
````

###文字颜色

````html
<div class="am-ft-white">
    仅用于标题按钮和深色内容 白色文字
</div>
<div class="am-ft-black">
    文本主色 输入框标签，输入内容
</div>
<div class="am-ft-darkgray">
    表单右侧说明文本 深灰色文字
</div>
<div class="am-ft-gray">
    副标题 灰色文字
</div>
<div class="am-ft-lightgray">
    暗提示 浅灰色文字
</div>
<div class="am-ft-darkblue">
    重要信息展示，根据业务信息使用
</div>
<div class="am-ft-blue">
    协议文本色 蓝色
</div>
<div class="am-ft-orange">
    特殊字色 橙色
</div>
<div class="am-ft-green">
    特殊字色 绿色
</div>
````

###文字处理

````html
<div class="am-ft-ellipsis">单行文字自动截取文字自动截取文字自动截取文字自动截取单行文字自动截取文字自动截取文字自动截取文字自动截取单行文字自动截取文字自动截取文字自动截取文字自动截取单行文字自动截取文字自动截取文字自动截取文字自动截取单行文字自动截取文字自动截取文字自动截取文字自动截取单行文字自动截取文字自动截取文字自动截取文字自动截取</div>
````  
##iconfont
iconfont是一套使用特殊字体巧妙的使图标能灵活应用的技术。使用iconfont技术生成的图标，能和字体一样通过控制字体大小、颜色等等，灵活应用在很多场合。
>使用方法：&lt;i class="iconfont **_iconfont-xxx_**"&gt;&lt;/i&gt;</br>基础class **_iconfont_**附加已定义的语义化class **_iconfont-xxx_**

````html
<!--div.am-example2为样例所用，实际使用不需要-->
<ul class="am-example2 fn-clear">
    <li>
        <span>成功：</span>
        <i class="iconfont iconfont-tips-success"></i>
    </li>
    <li>
        <span>错误：</span>
        <i class="iconfont iconfont-tips-error"></i>
    </li>
    <li>
        <span>疑问：</span>
        <i class="iconfont iconfont-tips-question"></i>
    </li>
    <li>
        <span>警告：</span>
        <i class="iconfont iconfont-tips-warn"></i>
    </li>
    <li>
        <span>信息：</span>
        <i class="iconfont iconfont-tips-info"></i>
    </li>
    <li>
        <span>等待：</span>
        <i class="iconfont iconfont-tips-wait"></i>
    </li>
    <li>
        <span>摄像头：</span>
        <i class="iconfont iconfont-camera"></i>
    </li>
    <li>
        <span>列表：</span>
        <i class="iconfont iconfont-list"></i>
    </li>
    <li>
        <span>多人：</span>
        <i class="iconfont iconfont-friends"></i>
    </li>
    <li>
        <span>详细：</span>
        <i class="iconfont iconfont-detail"></i>
    </li>
    <li>
        <span>联系方式：</span>
        <i class="iconfont iconfont-contacts"></i>
    </li>
    <li>
        <span>银行卡：</span>
        <i class="iconfont iconfont-cards"></i>
    </li>
    <li>
        <span>键盘：</span>
        <i class="iconfont iconfont-keyboard"></i>
    </li>
    <li>
        <span>向前：</span>
        <i class="iconfont iconfont-previous"></i>
    </li>
    <li>
        <span>向后：</span>
        <i class="iconfont iconfont-next"></i>
    </li>
    <li>
        <span>刷新：</span>
        <i class="iconfont iconfont-refresh"></i>
    </li>
    <li>
        <span>共享：</span>
        <i class="iconfont iconfont-share"></i>
    </li>
    <li>
        <span>更多：</span>
        <i class="iconfont iconfont-more"></i>
    </li>
    <li>
        <span>清除：</span>
        <i class="iconfont iconfont-clear"></i>
    </li>
    <li>
        <span>锁：</span>
        <i class="iconfont iconfont-lock"></i>
    </li>
    <li>
        <span>搜索：</span>
        <i class="iconfont iconfont-search"></i>
    </li>
    <li>
        <span>验证错误：</span>
        <i class="iconfont iconfont-check-error"></i>
    </li>
    <li>
        <span>验证成功：</span>
        <i class="iconfont iconfont-check-success"></i>
    </li>
    <li>
        <span>向下箭头：</span>
        <i class="iconfont iconfont-arrow-down"></i>
    </li>
    <li>
        <span>下步箭头：</span>
        <i class="iconfont iconfont-arrow-go"></i>
    </li>
    <li>
        <span>回退箭头：</span>
        <i class="iconfont iconfont-arrow-back"></i>
    </li>
</ul>
````

##导航

````html
<div class="am-header">
    <h1>顶部导航 icon</h1>
</div>
<div class="am-header">
    <h1>顶部导航 按钮</h1>
    <a href="#" class="am-header-reverse am-header-reverse-btn">左按钮</a>
    <a href="#" class="am-header-operate am-header-operate-btn">右按钮</a>
</div>
<div class="am-header am-header-grey">
    <h1>灰色导航 icon</h1>
</div>
<div class="am-header am-header-grey">
    <h1>灰色导航 按钮</h1>
    <a href="#" class="am-header-reverse am-header-reverse-btn">左按钮</a>
    <a href="#" class="am-header-operate am-header-operate-btn">右按钮</a>
</div>
````
##搜索
**_am-input-autoclear_**为基础class， **_am-input-autoclear_**为扩展class

````html
<h5>输入框初始无内容</h5>
<div class="am-search am-input-autoclear">
    <div class="am-search-input">
        <span class="am-search-input-icon"><i class="iconfont iconfont-search"></i></span>
        <input type="text" placeholder="搜索" value="">
        <span class="am-search-input-icon"><i class="iconfont iconfont-clear"></i></span>
    </div>
    <div class="am-search-button">
        <button type="button" disabled="disabled" class="am-button am-button-sm am-button-white">确定</button>
    </div>
</div>
<h5>输入框初始有内容</h5>
<div class="am-search am-input-autoclear">
    <div class="am-search-input">
        <span class="am-search-input-icon"><i class="iconfont iconfont-search"></i></span>
        <input type="text" placeholder="搜索" value="搜索内容">
        <span class="am-search-input-icon"><i class="iconfont iconfont-clear"></i></span>
    </div>
    <div class="am-search-button">
        <button type="button" class="am-button am-button-sm am-button-blue">确定</button>
    </div>
</div>
````

可选js配置-输入状态和按钮激活联动
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>

```html
<script src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>
```

可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>
```

##页面提示

````html
<div class="am-message am-message-question">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-question" title="疑问"></i></div>
    <p>疑问提示</p>
</div>
<div class="am-message am-message-success">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-success" title="成功"></i></div>
    <p>成功提示</p>
</div>
<div class="am-message am-message-warn">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-warn" title="警告"></i></div>
    <p>失败提示</p>
</div>
<div class="am-message am-message-error">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-error" title="出错"></i></div>
    <p>出错提示</p>
</div>
<div class="am-message am-message-info">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-info" title="提示"></i></div>
    <p>信息提示</p>
</div>
<div class="am-message am-message-wait">
    <div class="am-message-icon"><i class="iconfont iconfont-tips-wait" title="等待"></i></div>
    <p>等待提示</p>
</div>
````
##按钮组

````html
<div class="am-button-group">
    <button class="" type="button">标签一</button>
    <button type="button">标签二</button>
    <button type="button">标签三</button>
</div>
<div class="am-button-group">
    <button class="am-button-group-current" type="button">选中标签一</button>
    <button type="button">标签二</button>
    <button type="button">标签三</button>
</div>
<div class="am-button-group">
    <a href="#">标签一</a>
    <a class="am-button-group-current" href="#">标签二</a>
    <a href="#">标签三</a>
</div>
````
##按钮
### 基础按钮
基础按钮为蓝色大按钮，可以将button标签替换为a、input[type=button]等其它标签， **_am-button_**为按钮基础class类。

````html
<input type="button" class="am-button" value="基础按钮 Input"/>
````
````html
<a href="#" class="am-button">基础按钮 A</a>
````
````html
<input type="button" class="am-button" value="基础按钮 Input"/>
````

### 按钮颜色调整
按钮有3种颜色可选，附加以下class类其中之一： **_am-button-white_**（白）, **_am-button-blue_**（蓝）, **_am-button-red_**（红）。

````html
<button type="button" class="am-button am-button-white">白色按钮</button>
````
````html
<button type="button" class="am-button am-button-blue">蓝色按钮</button>
````

````html
<button type="button" class="am-button am-button-red">红色按钮</button>
````
### 按钮尺寸调整
按钮有2种尺寸可选，默认大尺寸，附加class类： **_am-button-sm_**即为小尺寸。

````html
<button type="button" class="am-button am-button-sm">蓝色小按钮</button>
````
### 按钮可用性调整
按钮有2种可用性状态可选，默认可用，附加 **_disabled="disabled"_**属性，即为不可用。
>不可用按钮颜色均为灰色按钮

````html
<button type="button" disabled="disabled" class="am-button am-button-sm am-button-white">不可用白色小按钮</button>
````
### 按钮与iconfont
具体可使用 **_iconfont_**，请[点此查看](#iconfont "点此查看")。

````html
<button type="button" class="am-button am-button-blue"><i class="iconfont iconfont-search"></i>搜索</button>
````
### 按钮与布局
具体可使用 **_布局_**，请[点此查看](#布局 "点此查看")。

````html
<div class="am-flexbox">
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-white"><i class="iconfont iconfont-search"></i>白色按钮</button>
    </div>
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-blue">蓝色按钮</button>
    </div>
</div>
````

##列表展示
>列表容器基础class为 **_am-list_**，每项单位为 **_am-list-item_**。

### 圆角列表
圆角列表为基础列表，可以方便改造成扁平化列表。

````html
<div class="am-content">
    <h5>单行不带图标</h5>
    <div class="am-list">
        <a href="#" class="am-list-item">
            文本内容 文本内容
            <span class="am-icon-arrow-horizontal"></span>
        </a>
    </div>
    <div class="am-ft-sm am-ft-gray">
        文本说明文本说明
    </div>
    <h5>展开</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <select>
                    <option>文本内容1</option>
                    <option>文本内容2</option>
                </select>
                <span class="am-icon-arrow-vertical"></span>
            </div>
        </div>
    </div>
    <h5>单行带图标</h5>
    <div class="am-list">
        <div class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
            <div class="am-flexbox-item">文本内容文本内容</div>
        </div>
    </div>
    <h5>单行组合</h5>
    <div class="am-list">
        <a href="#" class="am-list-item">
            文本内容 文本内容
            <span class="am-icon am-icon-arrow-horizontal"></span>
        </a>
        <a href="#" class="am-list-item">
            不要箭头
        </a>
        <a href="#" class="am-list-item">
            文本内容 文本内容
            <span class="am-icon am-icon-arrow-horizontal"></span>
        </a>
    </div>
    <h5>单行带图标组合</h5>
    <div class="am-list">
        <a href="#" class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
            <div class="am-flexbox-item">
                <span class="am-list-item-title am-ft-ellipsis">文本信息</span>
                <span class="am-list-item-text am-ft-ellipsis">8.80元</span>
            </div>
            <span class="am-icon am-icon-arrow-horizontal"></span>
        </a>
        <a href="#" class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
            <div class="am-flexbox-item">
                <span class="am-list-item-title am-ft-ellipsis">樊小虎</span>
                <span class="am-list-item-text am-ft-ellipsis am-ft-blue">重要信息展示</span>
            </div>
            <span class="am-icon am-icon-arrow-horizontal"></span>
        </a>
        <div class="am-list-item am-flexbox">
            <div class="am-flexbox-item">选中状态</div>
            <div class="am-switch am-flexbox-item">
                <input type="checkbox" name="" class="am-switch-checkbox" checked="checked" />
                <label class="am-switch-label">
                    <div class="am-switch-inner"></div>
                    <div class="am-switch-switch"></div>
                </label>
            </div>
        </div>
    </div>
    <h5>帐户信息专用</h5>
    <div class="am-list">
        <a href="#" class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
            <div class="am-flexbox-item">
                <span class="am-list-item-title am-ft-ellipsis">樊小虎</span>
                <span class="am-list-item-text am-ft-ellipsis">fanxiaohu@alipay.com</span>
            </div>
        </a>
    </div>
    <h5>带头尾</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-top">
            这是个am-list-item-top
        </div>
        <div class="am-list-item">
            带头尾的列表
        </div>
        <div class="am-list-item am-list-item-bottom">
            这是个am-list-item-bottom
        </div>
    </div>
</div>
````

### 扁平化列表
扁平化列表相对圆角列表，在容器上附加class **_am-list-flat_**，其余一致

````html
<div class="am-list am-list-flat">
    <div class="am-list-item">扁平化</div>
    <a href="#" class="am-list-item">
        文本内容 文本内容
        <span class="am-icon icon-arrow-horizontal"></span>
    </a>
    <a href="#" class="am-list-item am-flexbox">
        <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
        <div class="am-flexbox-item">
            <span class="am-list-item-title am-ft-ellipsis">文本信息</span>
            <span class="am-list-item-text am-ft-ellipsis">8.80元</span>
        </div>
        <span class="am-icon icon-arrow-horizontal"></span>
    </a>
    <div class="am-list-item">扁平化</div>
</div>
````
### 扁平化带缺口列表
扁平化带缺口列表相对扁平化列表，在容器上附加class **_am-list-flat-chip_**，其余一致

````html
<div class="am-list am-list-flat am-list-flat-chip">
    <a href="#" class="am-list-item">
        文本内容 文本内容
        <span class="am-icon icon-arrow-horizontal"></span>
    </a>
    <a href="#" class="am-list-item am-flexbox">
        <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt="" /></span>
        <div class="am-flexbox-item">
            <span class="am-list-item-title am-ft-ellipsis">文本信息</span>
            <span class="am-list-item-text am-ft-ellipsis">8.80元</span>
        </div>
        <span class="am-icon icon-arrow-horizontal"></span>
    </a>
    <div class="am-list-item">扁平化有缺口</div>
    <div class="am-list-item">扁平化有缺口</div>
</div>
````
### 灵活列表布局应用
列表与弹性布局结合，可以形成较灵活的自适应布局。

````html
<div class="am-content">
    <div class="am-list">
        <div class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/></span>
            <div class="am-flexbox-item am-ft-ellipsis">文字自动裁切 左右宽度自动适应，垂直居中，</div>
            <span class="am-list-item-icon"><i class="iconfont iconfont-camera"></i></span>
        </div>
        <div class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><i class="iconfont iconfont-cards"></i></span>
            <div class="am-flexbox-item am-ft-ellipsis">文字自动裁切 左右宽度自动适应，垂直居中</div>
            <span class="am-list-item-icon"><i class="iconfont iconfont-friends"></i></span>
        </div>
    </div>
    <div class="am-list am-list-flat">
        <div class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="48" height="48" alt=""/></span>
            <div class="am-flexbox-item">左右宽度自动适应，垂直居中</div>
        </div>
        <div class="am-list-item am-flexbox">
            <div class="am-flexbox-item">左右宽度自动适应，垂直居中</div>
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="48" height="48" alt=""/></span>
        </div>
    </div>
    <div class="am-list">
        <a href="#" class="am-list-item am-flexbox">
            <span class="am-list-item-icon"><img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="92" height="92" alt=""/></span>
            <div class="am-flexbox-item">超级连接 左右宽度自动适应，垂直居中</div>
            <span class="am-icon icon-arrow-horizontal"></span>
        </a>
    </div>
</div>
````

##表单控件

###输入框相关
####单行单例

````html
<div class="am-content">
    <h5>组合</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
            <span class="am-list-item-icon"><i class="iconfont iconfont-list"></i></span>
        </div>
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
        </div>
    </div>
    <h5>输入错误的情况</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-list-item-form-error am-input-autoclear am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
            <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-clear"></i></span>
        </div>
    </div>
    <h5>多行输入错误的情况</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-list-item-form-error am-input-autoclear am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
            <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-clear"></i></span>
        </div>
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
        </div>
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="暗提示暗提示" value="">
            </div>
        </div>
    </div>
    <h5>全新登录</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="手机号/会员名" value="">
            </div>
        </div>
        <div class="am-list-item am-list-item-form am-flexbox">
            <div class="am-flexbox-item">
                <input type="text" placeholder="淘宝登录密码" value="">
            </div>
        </div>
    </div>
    <h5>有历史登录过非手机登录域账户</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-flexbox">
            <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-lock"></i></span>
            <div class="am-flexbox-item">
                <input type="text" placeholder="请输入登录密码" value="">
            </div>
        </div>
    </div>
    <h5>非常规表单</h5>
    <div class="am-list">
        <div class="am-list-item am-list-item-form am-input-autoclear am-flexbox">
            <span>优惠券名称:</span>
            <div class="am-flexbox-item">
                <input type="text" placeholder="" value="">
            </div>
            <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-clear"></i></span>
        </div>
        <div class="am-list-item am-list-item-form am-flexbox">
            <span>优惠券密码:</span>
            <div class="am-flexbox-item">
                <input type="text" placeholder="" value="">
            </div>
        </div>
    </div>
    <h5>组合表单</h5>
</div>
````
可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>
```

####输入与按钮组合

````html
<div class="am-content">
    <h5>校验码</h5>
    <div class="am-list">
        <div class="am-flexbox">
            <div class="am-flexbox-item"  style="width:160px;">
                <div class="am-list-item am-list-item-form am-input-autoclear am-flexbox">
                    <div class="am-flexbox-item">
                        <input type="text" placeholder="短信校验码" value="333">
                    </div>
                    <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-clear"></i></span>
                </div>
            </div>
            <div class="am-flexbox-item">
                <button type="button" class="am-button am-button-white">发送校验码</button>
            </div>
        </div>
    </div>
    <div class="am-list">
        <div class="am-flexbox">
            <div class="am-flexbox-item" style="width:160px;">
                <div class="am-list-item am-list-item-form am-input-autoclear am-flexbox">
                    <div class="am-flexbox-item">
                        <input type="text" placeholder="短信校验码" value="">
                    </div>
                    <span class="am-list-item-icon am-ft-lightgray am-ft-xxl"><i class="iconfont iconfont-clear"></i></span>
                </div>
            </div>
            <div class="am-flexbox-item">
                <button type="button" class="am-button am-button-white" disabled="disabled">重发校验码</button>
            </div>
        </div>
    </div>
    <h5>大校验码</h5>
    <div class="am-list">
        <div class="am-flexbox">
            <div class="am-flexbox-item"></div>
            <div class="am-flexbox-item"  style="width:150px;">
                <div class="am-list-item am-list-item-form am-flexbox">
                    <div class="am-flexbox-item">
                        <input class="am-ft-black am-ft-xxxl" type="text" placeholder="短信校验码" value="">
                    </div>
                </div>
            </div>
            <div class="am-flexbox-item"></div>
        </div>
    </div>
    <div class="am-flexbox">
        <div class="am-flexbox-item"></div>
        <div class="am-flexbox-item"  style="width:150px;">
            <button type="button" class="am-button am-button-sm am-button-white ">重新获取校验码</button>
        </div>
        <div class="am-flexbox-item"></div>
    </div>
</div>
````

可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/amui/dpl/1.0.2/amui.js"></script>
```

### 复选框与单选框

>单选框与复选框可以共用样式，只需将input[type]修改为radio。

#### 列表中复选框
>此组件较适合复选框，可以修改input[type]变为单选框

````html
<div class="am-list">
    <div class="am-list-item">
        <label class="am-checkbox">
            表单项复选框——默认未选中
            <input type="checkbox" />
            <span class="am-icon icon-check"></span>
        </label>
    </div>
</div>
<div class="am-list">
    <div class="am-list-item">
        <label class="am-checkbox">
            表单项复选框——默认选中1
            <input type="checkbox" checked="checked" />
            <span class="am-icon icon-check"></span>
        </label>
    </div>
</div>
<div class="am-list">
    <div class="am-list-item">
        <label class="am-checkbox">
            <span class="am-list-item-title">带说明</span>
            <span class="am-list-item-text">说明文字说明文字说明文字说明文字</span>
            <input type="checkbox" checked="checked" />
            <span class="am-icon icon-check"></span>
        </label>
    </div>
</div>
````
#### 列表中单选框
>此组件较适合单选框，可以修改input[type]变为复选框<br/>
单选框注意需要定义 **_name_**才能使其成为同一组

````html
<div class="am-list">
    <div class="am-list-item">
        <label class="am-checkbox am-checkbox-tiny">
            表单项单选框——做第一件事
            <input name="radio-group-1" type="radio" checked="checked" />
            <span class="am-icon icon-check"></span>
        </label>
    </div>
    <div class="am-list-item">
        <label class="am-checkbox am-checkbox-tiny">
            表单项单选框——做第二件事
            <input name="radio-group-1" type="radio"/>
            <span class="am-icon icon-check"></span>
        </label>
    </div>
    <div class="am-list-item">
        <label class="am-checkbox am-checkbox-tiny">
            <span class="am-list-item-title">带说明</span>
            <span class="am-list-item-text">第三件事很好玩</span>
            <input name="radio-group-1" type="radio"  />
            <span class="am-icon icon-check"></span>
        </label>
    </div>
</div>
````

#### 开关复选框

>此组件不适合单选框

````html
<div class="am-list">
    <div class="am-list-item am-flexbox">
        <div class="am-flexbox-item">未选中状态</div>
        <div class="am-switch am-flexbox-item">
            <input type="checkbox" name="" class="am-switch-checkbox">
            <label class="am-switch-label">
                <div class="am-switch-inner"></div>
                <div class="am-switch-switch"></div>
            </label>
        </div>
    </div>
    <div class="am-list-item am-flexbox">
        <div class="am-flexbox-item">选中状态</div>
        <div class="am-switch am-flexbox-item">
            <input type="checkbox" name="" class="am-switch-checkbox" checked="checked">
            <label class="am-switch-label">
                <div class="am-switch-inner"></div>
                <div class="am-switch-switch"></div>
            </label>
        </div>
    </div>
</div>
````
#### 协议复选框
>此组件不适合单选框

````html
<div class="am-content">
    <h5>已选中</h5>
    <div class="am-field">
        <span class="am-checkbox am-checkbox-mini fn-left"><input id="agree" type="checkbox"  checked="checked"><span class="am-icon icon-check"></span></span><label class="am-ft-md">同意<a href="http://www.alipay.com" target="_blank">《信用支付服务合同》</a></label>
    </div>
    <h5>未选中</h5>
    <div class="am-field">
        <span class="am-checkbox am-checkbox-mini fn-left"><input type="checkbox"><span class="am-icon icon-check"></span></span><label class="am-ft-md">同意<a href="http://www.alipay.com" target="_blank">《信用支付服务合同》</a></label>
    </div>
</div>
````

##页面范例
###协议范本页面

````html
<div class="am-content">
    <div class="am-agreement">
        <h2>支付宝用户协议</h2>
        <p>
            协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容协议文字内容</p>
    </div>
</div>
````
>同时，需要引入页面css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/agreement.css" media="all">
```

>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/view/agreement.css" media="all">
```

###文章范文页面

````html
<div class="am-content">
    <div class="am-article">
        <h2>加油卡办卡章程</h2>
        <time>2013-11-23 12:20:00</time>
        <dl>
            <dt>1、文章小标题</dt>
            <dd>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</dd>
        </dl>
        <dl>
            <dt>2、文章小标题</dt>
            <dd>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</dd>
        </dl>
        <dl>
            <dt>3、文章小标题</dt>
            <dd>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</dd>
        </dl>
    </div>
</div>
````
>同时，需要引入页面css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/article.css" media="all">
```

>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/view/article.css" media="all">
```

### 时间线页面

````html
<div class="am-timeline">
    <div class="am-timeline-box">
        <div class="am-timeline-box-icon">
            <img src="http://pic.alipayobjects.com/e/201312/1mx2r1D6Rh.png" alt="" width="30" height="30"/>
        </div>
        <div class="am-timeline-box-content">
            <div class="am-timeline-box-title">晨间项目</div>
            <div class="am-timeline-box-desc">项目介绍</div>
        </div>
    </div>
    <div class="am-timeline-box">
        <div class="am-timeline-box-icon">
            <img src="http://pic.alipayobjects.com/e/201312/1mx2r0hiYX.png" alt="" width="30" height="30"/>
        </div>
        <div class="am-timeline-box-content">
            <div class="am-timeline-box-title">午间项目</div>
            <div class="am-timeline-box-desc">项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍</div>
        </div>
    </div>
    <div class="am-timeline-box">
        <div class="am-timeline-box-icon">
            <img src="http://pic.alipayobjects.com/e/201312/1mx2r21KOD.png" alt="" width="30" height="30"/>
        </div>
        <div class="am-timeline-box-content">
            <div class="am-timeline-box-title">晚间项目</div>
            <div class="am-timeline-box-desc">项目介绍</div>
        </div>
    </div>
</div>
````
>同时，需要引入页面css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/timeline.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/view/timeline.css" media="all">
```

### 城市选择

````html
<div class="am-header">
    <h1><a href="#">上海 <i class="iconfont iconfont-down"></i></a></h1>
</div>
<div class="am-city-select">
    <div class="am-city-select-sub">定位您的城市</div>
    <ul class="am-city-select-list">
        <li><a href="#">上海</a></li>
    </ul>
    <div class="am-city-select-sub">热门城市</div>
    <ul class="am-city-select-list">
        <li><a href="#">上海</a></li>
        <li><a href="#">武汉</a></li>
        <li><a href="#">长沙</a></li>
        <li><a href="#">北京</a></li>
        <li><a href="#">杭州</a></li>
    </ul>
    <div class="am-city-select-sub">所有城市</div>
    <div class="am-city-select-order">B</div>
    <ul class="am-city-select-list">
        <li><a href="#">上海</a></li>
        <li><a href="#">武汉</a></li>
        <li><a href="#">长沙</a></li>
        <li><a href="#">北京</a></li>
        <li><a href="#">杭州</a></li>
    </ul>
</div>
````

>同时，需要引入页面css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/view/city-select.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/view/city-select.css" media="all">
```


### loading

````html
<!--div.am-example3为样例所用，实际使用不需要-->
<div class="am-example3">
    <div class="am-loading">
        <div class="am-loading-text">
            <i class="iconfont iconfont-check-error" title="关闭/错误"></i> 错误提示
        </div>
        <div class="am-loading-text">
            <i class="iconfont iconfont-check-success" title="选择/对勾"></i> 成功提示
        </div>
        <div class="am-loading-text">
            <span class="am-loading-icon"></span> 加载中
        </div>
    </div>
</div>
````

>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/amui/dpl/1.0.2/widget/loading.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??amui/dpl/1.0.2/amui.css,amui/dpl/1.0.2/widget/loading.css" media="all">
```