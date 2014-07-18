# AMUI
- pubdate: 2014-07-16
- tags: 关于
- author: 雷骏
---

AMUI是支付宝无线端快速建站的解决方案，包含通用样式库、场景解决方案等。</br>
当前版本： **_1.2.2_**
>支持iOS4.2+、Android2.2+版本

---

<style>
#content .nico-insert-code h2{margin:0;padding:0;border-bottom:0;}
</style>

<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/amui-doc.css" media="all">
<link rel="stylesheet" type="text/css" href="./docs.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/city-select.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/timeline.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/article.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/agreement.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/widget/dialog.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/widget/simple-password.css" media="all">
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/util/iconfont.css" media="all">
<script type="text/javascript" src="./docs.js"></script>
<script type="text/javascript" src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>

##使用方法

### 引入amui.css
>注意最新目录为anima/dpl下属目录。 

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.css" media="all">
```
### 老版本amui
>如发现您的amui是老版本，不在anima/dpl下属目录，那么您使用的是老版本，请酌情考虑升级。</br>
anima版本amui和老版本amui不互相兼容，且老版本amui后续不再更新新功能，但会保证原有功能可以使用。</br>

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
    <link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.css" media="all">
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
<script src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>
```

###combo文件合并服务
combo是支付宝提供的文件合并服务，可以将多个文件合并成一次请求，可以按需使用。
>例：amui.css和city-select两个文件，使用 **_,_**进行文件分隔， **_??_**让文件名与域名隔离。

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/city-select.css" media="all">
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

##页面提示
###单行提示

````html
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-question"></div>
    <div class="am-message-main">疑问提示</div>
</div>
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-success"></div>
    <div class="am-message-main">成功提示</div>
</div>
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-warn"></div>
    <div class="am-message-main">失败提示</div>
</div>
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-error"></div>
    <div class="am-message-main">出错提示</div>
</div>
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-info"></div>
    <div class="am-message-main">信息提示</div>
</div>
<div class="am-message">
    <div class="am-message-icon am-icon-message am-icon-message-wait"></div>
    <div class="am-message-main">等待提示</div>
</div>
````

###多行提示
>多行（主提示多行、带副提示）需要附加class **_ am-message-multi_**

````html
<div class="am-message am-message-multi">
    <div class="am-message-icon am-icon-message am-icon-message-success"></div>
    <div class="am-message-main">主提示多行主提示多行主提示多行主提示多行主提示多行主提示多行</div>
</div>
<div class="am-message am-message-multi">
    <div class="am-message-icon am-icon-message am-icon-message-success"></div>
    <div class="am-message-main">主提示</div>
    <div class="am-message-sub">副提示</div>
</div>
````

##按钮组


````html
<div class="am-button-group">
    <button type="button">标签一</button>
    <button type="button">标签二</button>
    <button type="button">标签三</button>
</div>
````
>附加class **_ am-button-group-current_** 标识选中项

````html
<div class="am-button-group">
    <button class="am-button-group-current" type="button">选中标签一</button>
    <button type="button">标签二</button>
    <button type="button">标签三</button>
</div>
````

>**_ disabeld禁用某项_**

````html
<div class="am-button-group">
    <button class="am-button-group-current" type="button">选中标签一</button>
    <button type="button">标签二</button>
    <button type="button" disabled="disabeld">标签三</button>
</div>
````
>可以按需改造成链接

````html
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

````html
<button type="button" class="am-button am-button-black">黑色按钮</button>
````
### 按钮尺寸调整
按钮有3种尺寸可选，默认大尺寸，附加class类： **_am-button-sm_**即为小尺寸 ,  **_am-button-md_**即为中尺寸。

````html
<button type="button" class="am-button am-button-sm">蓝色小按钮</button>
<button type="button" class="am-button am-button-md am-button-red">红色中按钮</button>
````


### 按钮可用性调整
按钮有2种可用性状态可选，默认可用，附加 **_disabled="disabled"_**属性，即为不可用。
>不可用按钮颜色均为灰色按钮

````html
<button type="button" disabled="disabled" class="am-button am-button-sm am-button-white">不可用白色小按钮</button>
````

### 按钮与布局
具体可使用 **_布局_**，请[点此查看](#布局 "点此查看")。

````html
<div class="am-flexbox am-flexbox-average">
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-white">白色按钮</button>
    </div>
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-blue">蓝色按钮</button>
    </div>
</div>
````
### 按钮风格调整
按钮有轻量样式，附加class类： **_am-button-light_**即为轻量按钮。

````html
<div class="am-flexbox am-flexbox-average">
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-sm am-button-blue am-button-light">轻量小按钮</button>
    </div>
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-sm am-button-white am-button-light">轻量小按钮</button>
    </div>
</div>
<br/>
<div class="am-flexbox am-flexbox-average">
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-md am-button-blue am-button-light">轻量中按钮</button>
    </div>
    <div class="am-flexbox-item">
        <button type="button" class="am-button am-button-md am-button-white am-button-light">轻量中按钮</button>
    </div>
</div>
````

##列表展示
>列表容器基础class为 **_am-list_**，每项单位为 **_am-list-item_**。

### 基础列表（8.2默认使用扁平化列表）

````html
<div class="am-content">
    <div class="am-list-header">列表纯内容</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item">
        <div class="am-list-content">文本内容 文本内容</div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-header">链接引导</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <a href="#" class="am-list-item">
        <div class="am-list-content">链接内容</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
</div>
````

### 列表组合
````html
<div class="am-content">
    <div class="am-list-header">列表组合头部</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item">
        <div class="am-list-content">文本内容 文本内容</div>
    </div>
    <a href="#" class="am-list-item">
        <div class="am-list-content">链接内容</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
</div>
<div class="am-content">
    <div class="am-list-footer">列表底部额外信息备注</div>
</div>
````

### 列表信息多元化
````html
<div class="am-content">
    <div class="am-list-header">图标搭配文字</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item">
        <div class="am-list-thumb">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/>
        </div>
        <div class="am-list-content">图标左，内容右</div>
    </div>
    <div class="am-list-item">
        <div class="am-list-content am-ft-ellipsis">内容左，图标右（同时内容超长截断）</div>
        <div class="am-list-thumb">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/>
        </div>
    </div>
    <div class="am-list-item">
        <div class="am-list-thumb">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/>
        </div>
        <div class="am-list-content">
            <div class="am-list-title">右侧有附加信息</div>
        </div>
        <div class="am-list-extra">8.80元</div>
    </div>
    <a href="#" class="am-list-item">
        <div class="am-list-thumb">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/>
        </div>
        <div class="am-list-content">
            <div class="am-list-title am-ft-ellipsis">详细信息链接引导</div>
        </div>
        <div class="am-list-extra am-ft-ellipsis">8.80元</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
    <a href="#" class="am-list-item">
        <div class="am-list-thumb">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="32" height="32" alt=""/>
        </div>
        <div class="am-list-content">
            <div class="am-list-title am-ft-ellipsis">重要信息链接引导</div>
        </div>
        <div class="am-list-extra am-list-key am-ft-ellipsis">重要信息展示</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
    <div class="am-list-item">
        <div class="am-list-thumb am-list-thumb-radius">
            <img src="http://img0.bdstatic.com/img/image/daren/ximeng2.jpg" width="46" height="46" alt=""/>
        </div>
        <div class="am-list-content">
            <div class="am-list-title am-ft-ellipsis">主信息（图标自定义大小）</div>
            <div class="am-list-brief am-ft-ellipsis">辅助信息</div>
        </div>
    </div>
</div>
````


### 扁平化带缺口列表
>扁平化带缺口列表相对扁平化列表，在容器上附加class **_am-list-flat-chip_**，其余一致

````html
<div class="am-list-header">列表组合头部</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-top">
        <div class="am-list-content">扁平化置顶列表</div>
    </div>
    <div class="am-list-item">
        <div class="am-list-content">文本内容 文本内容</div>
    </div>
    <a href="#" class="am-list-item">
        <div class="am-list-content">链接内容</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
</div>
<div class="am-list-footer">列表底部额外信息备注</div>
````

### 圆角列表

````html
<div class="am-list-header">列表组合头部</div>
<div class="am-list">
    <div class="am-list-item am-list-top">
        <div class="am-list-content">扁平化置顶列表</div>
    </div>
    <div class="am-list-item">
        <div class="am-list-content">文本内容 文本内容</div>
    </div>
    <a href="#" class="am-list-item">
        <div class="am-list-content">链接内容</div>
        <div class="am-list-arrow"><span class="am-icon-arrow-horizontal"></span></div>
    </a>
</div>
<div class="am-list-footer">列表底部额外信息备注</div>
````


##表单输入

###输入框相关

####单行单例

````html
<div class="am-content">
    <div class="am-list-header">组合</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
        <div class="am-list-thumb"><i class="am-icon-camera"></i></div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-header">输入错误的情况</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-list-item-error am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="333">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-header">多行输入错误的情况</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-list-item-error am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="暗提示暗提示" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-header">全新登录</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="手机号/会员名" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-control">
            <input type="text" placeholder="淘宝登录密码" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-footer am-ft-right"><a href="#">忘记密码？</a></div>
</div>
<div class="am-content">
    <div class="am-list-header">有历史登录过非手机登录域账户</div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-input-autoclear">
        <div class="am-list-thumb"><i class="am-icon-lock"></i></div>
        <div class="am-list-control">
            <input type="text" placeholder="请输入登录密码" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form">
        <div class="am-list-control">
            我是文字我是文字我是文字我是文字我是文字我是文字我是我是文字我是字我是文字我是文字我是文字我是文字
        </div>
    </div>
</div>

<div class="am-content">
    <div class="am-list-header">非常规表单（label固定宽度不对齐）</div>
</div>

<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券名称:</div>
        <div class="am-list-control">
            <input type="text" placeholder="最多5个字" value="">
            <input type="hidden" placeholder="" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券密码:</div>
        <div class="am-list-control">
            <input type="text" placeholder="" value="">
            <input type="hidden" placeholder="" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券有效期:</div>
        <div class="am-list-control">永久可用</div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
</div>
<div class="am-content">
    <div class="am-list-header">非常规表单（label固定宽度对齐）</div>
</div>
<div class="am-list  am-list-flat am-list-flat-chip am-list-6lb">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券名称:</div>
        <div class="am-list-control">
            <input type="text" placeholder="" value="">
            <input type="hidden" placeholder="" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券密码:</div>
        <div class="am-list-control">
            <input type="text" placeholder="" value="">
            <input type="hidden" placeholder="" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">优惠券有效期:</div>
        <div class="am-list-control">永久可用</div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
    </div>
</div>
````
可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>
```

####验证码

````html
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">校验码</div>
        <div class="am-list-control">
            <input type="text" placeholder="输入短信校验码" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
        <div class="am-list-button">
            <button type="button">发送校验码</button>
        </div>
    </div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">校验码</div>
        <div class="am-list-control">
            <input type="text" placeholder="输入短信校验码" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
        <div class="am-list-button">
            <button type="button" disabled="disabled">58秒后重发</button>
        </div>
    </div>
</div>
<div class="am-list am-list-flat am-list-flat-chip">
    <div class="am-list-item am-list-item-form am-input-autoclear">
        <div class="am-list-label">校验码</div>
        <div class="am-list-control">
            <input type="text" placeholder="输入短信校验码" value="">
        </div>
        <div class="am-list-clear"><i class="am-icon-clear"></i></div>
        <div class="am-list-button">
            <button type="button">重发验证码</button>
        </div>
    </div>
</div>
````

可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>
```

### 开关与单复选框

#### 开关

````html
    <div class="am-list am-list-flat am-list-flat-chip">
        <div class="am-list-item">
            <div class="am-list-content">开关选中状态</div>
            <div class="am-switch">
                <input type="checkbox" name="k1" class="am-switch-checkbox" checked="checked"/>
                <label class="am-switch-label">
                    <div class="am-switch-inner"></div>
                    <div class="am-switch-switch"></div>
                </label>
            </div>
        </div>
        <div class="am-list-item">
            <div class="am-list-content">开关未选中状态</div>
            <div class="am-switch">
                <input type="checkbox" name="k2" class="am-switch-checkbox"/>
                <label class="am-switch-label">
                    <div class="am-switch-inner"></div>
                    <div class="am-switch-switch"></div>
                </label>
            </div>
        </div>
    </div>
````

#### 列表复选框
>单选框与复选框可以共用样式，只需将input[type]修改为radio。<br/>
单选框注意需要定义 **_name_**才能使其成为同一组

````html
    <div class="am-list am-list-flat am-list-flat-chip">
        <div class="am-list-item am-list-check">
            <div class="am-list-content">表单项复选框——默认选中1</div>
            <div class="am-checkbox am-checkbox-tiny">
                <input type="checkbox" name="x1" checked="checked"/>
                <span class="am-icon icon-check"></span>
            </div>
        </div>
        <div class="am-list-item am-list-check">
            <div class="am-list-content">表单项复选框——默认未选中</div>
            <div class="am-checkbox am-checkbox-tiny">
                <input type="checkbox" name="x1"/>
                <span class="am-icon icon-check"></span>
            </div>
        </div>
        <div class="am-list-item am-list-check">
            <div class="am-list-content">表单项复选框——默认选中不可改</div>
            <div class="am-checkbox am-checkbox-tiny">
                <input type="checkbox" name="x1" disabled="disabled" checked="checked"/>
                <span class="am-icon icon-check"></span>
            </div>
        </div>
    </div>
    <div class="am-list am-list-flat am-list-flat-chip">
        <div class="am-list-item am-list-check">
            <div class="am-list-content">带说明复选框</div>
            <div class="am-list-extra am-ft-ellipsis">附加说明</div>
            <div class="am-checkbox am-checkbox-tiny">
                <input type="checkbox" name="x2"/>
                <span class="am-icon icon-check"></span>
            </div>
        </div>
    </div>
````

#### 协议复选框

````html
<div class="am-content">
    <div class="am-list-header">选中</div>
    <div class="am-protocol-check">
        <span class="am-checkbox am-checkbox-mini am-radio fn-left"><input id="agree" type="checkbox" checked="checked"><span class="am-icon icon-check"></span></span><label class="am-ft-md">同意<a href="http://www.alipay.com" target="_blank">《信用支付服务合同》</a></label>
    </div>
    <div class="am-list-header">未选中</div>
    <div class="am-protocol-check">
        <span class="am-checkbox am-checkbox-mini am-radio fn-left"><input type="checkbox"><span class="am-icon icon-check"></span></span><label class="am-ft-md">同意<a href="http://www.alipay.com" target="_blank">《信用支付服务合同》</a></label>
    </div>
    <div class="am-list-header">选中不可改</div>
    <div class="am-protocol-check">
        <span class="am-checkbox am-checkbox-mini am-radio fn-left"><input type="checkbox" disabled="disabled" checked="checked"><span class="am-icon icon-check"></span></span><label class="am-ft-md">同意<a href="http://www.alipay.com" target="_blank">《信用支付服务合同》</a></label>
    </div>
</div>
````

##导航

````html
<div class="am-header">
    <h1>顶部导航 icon</h1>
</div>
<div class="am-header am-header-grey">
    <h1>灰色导航 icon</h1>
</div>
````
##搜索
**_am-input-autoclear_**为基础class， **_am-input-autoclear_**为扩展class


#### 默认无搜索词
````html
<div class="am-search am-input-autoclear">
    <div class="am-search-input">
        <div class="am-search-icon"><i class="am-icon-search"></i></div>
        <input class="am-search-value" type="text" placeholder="搜索" value="">
        <div class="am-search-clear"><i class="am-icon-clear am-icon-clear-16"></i></div>
    </div>
    <div class="am-search-button">
        <button type="button" class="am-button am-button-sm am-button-blue">确定</button>
    </div>
</div>
````

#### 默认有搜索词

````html
<div class="am-search am-input-autoclear">
    <div class="am-search-input">
        <div class="am-search-icon"><i class="am-icon-search"></i></div>
        <input class="am-search-value" type="text" placeholder="搜索" value="搜索内容">
        <div class="am-search-clear"><i class="am-icon-clear am-icon-clear-16"></i></div>
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
<script src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>
```

可选js配置-输入清除功能
>使用条件：<br/>
1. 可选引入amui.js，注意引入一次即可<br/>
2. 同时需要附加class **_am-input-autoclear_**来激活

```html
<script src="https://a.alipayobjects.com/anima/dpl/1.2.2/amui.js"></script>
```

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



>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/agreement.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/agreement.css" media="all">
```

###文章范文页面

````html
<div class="am-article">
    <h2>中石化加油卡办卡章程</h2>
    <time>2013-11-23 12:20:00</time>
    <p><img src="http://lorempixel.com/290/200/nature/2/" width="290" height="200"/></p>
    <p>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</p>
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
    <p>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</p>
</div>
````

>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/article.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/article.css" media="all">
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


>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/timeline.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/timeline.css" media="all">
```

### 城市选择

````html
<div class="am-header">
    <h1><a href="#">上海 <i class="am-icon-down"></i></a></h1>
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

>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/city-select.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/city-select.css" media="all">
```

### toast

<style>
.am-example-toast .am-toast{position:absolute}
</style>

````html
<!--div.am-example-toast为样例所用，实际使用不需要-->
<div class="am-example am-example-toast" style="position:relative;height:480px;">
    <div class="am-toast">
        <div class="am-toast-text">
            <span class="am-icon-wrong"></span> 错误提示
        </div>
        <div class="am-toast-text">
            <span class="am-icon-right"></span> 成功提示
        </div>
        <div class="am-toast-text">
            <span class="am-icon-loading"></span> 加载中
        </div>
    </div>
</div>
````

>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/widget/toast.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/widget/toast.css" media="all">
```

### 空白、插画、提示

####空白页

````html
<!--div.am-example4为样例所用，实际使用不需要-->
<div class="am-example4" style="height:480px;">
    <div class="am-page-result">
        <div class="am-page-result-wrap">
            <div class="am-page-result-pic">
                <img src="https://i.alipayobjects.com/i/ecmng/png/201407/30NvQVuHAd.png" width="140" height="140"/>
            </div>
            <div class="am-page-result-title">我是空白页</div>
            <div class="am-page-result-brief">页面没有内容时候会成为空白页</div>
            <div class="am-page-result-button"><button class="am-button">按钮</button></div>
        </div>
    </div>
</div>
````

####404页面

````html
<!--div.am-example4为样例所用，实际使用不需要-->
<div class="am-example" style="height:480px;">
    <div class="am-page-result">
        <div class="am-page-result-wrap">
            <div class="am-page-result-pic">
                <img src="https://i.alipayobjects.com/i/ecmng/png/201407/30NvQ6bZHj.png" width="140" height="140"/>
            </div>
            <div class="am-page-result-title">暂时无法访问</div>
            <div class="am-page-result-button">
                <div class="am-flexbox am-flexbox-average">
                    <div class="am-flexbox-item">
                        <button class="am-button am-button-white">关闭</button>
                    </div>
                    <div class="am-flexbox-item">
                        <button class="am-button">刷新</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
````

####插画页

````html
<!--div.am-example4为样例所用，实际使用不需要-->
<div class="am-example" style="height:480px;">
    <div class="am-page-result">
         <div class="am-page-result-wrap">
             <div class="am-page-result-pic">
                 <img src="http://dummyimage.com/280x280/e36de3/fff" width="140" height="140"/>
             </div>
             <div class="am-page-result-title">我是插画页</div>
             <div class="am-page-result-button"><button class="am-button am-button-white">按钮</button></div>
         </div>
     </div>
</div>
````

####提示页

````html
<!--div.am-example4为样例所用，实际使用不需要-->
<div class="am-example" style="height:480px;">
    <div class="am-page-result am-page-result-status">
        <div class="am-page-result-wrap">
            <div class="am-page-result-pic">
                <img src="http://dummyimage.com/280x280/e36de3/fff" width="140" height="140"/>
            </div>
            <div class="am-page-result-title">无记录</div>
        </div>
    </div>
</div>
````


>同时，需要引入扩展css

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/anima/dpl/1.2.2/view/page-result.css" media="all">
```
>注意：多个文件可以使用支付宝提供的combo服务，多个文件一次请求。[点此查看](#combo文件合并服务 "点此查看")combo的介绍

```html
<link rel="stylesheet" type="text/css" href="https://a.alipayobjects.com/??anima/dpl/1.2.2/amui.css,anima/dpl/1.2.2/view/page-result.css" media="all">
```