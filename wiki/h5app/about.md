# H5App应用

- pubdate: 2014-06-30

---------

## 离线类H5App开发

## 前言

该指南旨在解决基于H5Container开发的H5App离线包的整体流程

以下内容的demo工程可直接从github获取: [h5app-demo.zip](https://github.com/am-team/am-team.github.io/blob/master/h5app/h5app-demo.zip)

## 环境搭建

H5App本身不需要特殊的开发环境，满足常规web站点的本地开发即可。但最终打包为amr包的打包工具是基于Node.js，因此需要先在开发环境安装好一个Node.js

Node.js安装指南：
[http://sealmemory.blogspot.com/2013/12/install-node-js-in-windows-mac-os-x-linux.html](http://sealmemory.blogspot.com/2013/12/install-node-js-in-windows-mac-os-x-linux.html)

## 前期准备

1. `应用中心接入`
如果您开发的H5App是属于支付宝钱包应用中心的。那么首先你应该先向应用中心PD申请一个应用ID(appId)。<br/>
相关申请和管理文档请参考：[钱包8.1应用中心接入应用操作文档](http://doc.alipay.net/pages/viewpage.action?pageId=74090565)

2. `安装ak47` 可以用npm安装，具体安装帮助请点击 [这里](ak47-doc.html)


## 项目构建

### 自动构建
可使用 `ak47 init` 自动构建一个新项目，具体操作教程请参考 [这里](ak47-doc.html#启动方式：ak47-init)

### 手动构建：
以一个appId为20000127，名称为`H5App-demo`，版本号为`1.0.0.0`的项目为例。

1.在文件系统中新建一个名为H5App-demo的空文件夹，然后以此为根目录，新增一个www文件夹，之后的web开发源码都应该存于此文件夹下。

2.H5App-demo根目录下新建一个Manifest.xml文件，该文件用于打包信息管理以及客户端升级信息管理。范例内容如下：<br/>

````
<?xml version="1.0" encoding="utf-8"?>
<package>
	<!--业务包appId -->
	<uid>20000127</uid>

	<!--业务包名称 -->
	<name>H5App-demo</name>

	<!--业务包版本 -->
	<version>1.0.0.0</version>

	<!--业务包介绍 -->
	<descriptor>H5App离线业务包打包样例</descriptor>
</package>

````
3.在www目录下新增index.html文件，js、css等web开发源文件

最终项目文件系统目录应如下：

````
H5App-demo/
    |-- www                         H5App源文件目录 (必须)
        |-- css                     样式目录 (非必须)
            `-- base.css            样式文件 (非必须)
        |-- /js                     js脚本目录 (非必须)
            `-- aliBridge.js        js文件 (非必须)
        `-- index.html              静态页面 (非必须)
    |-- res                         资源文件 (必须)
        `-- icon_android.png        android版低清图标 (必须)
        `-- icon_android@2x.png     android版高清图标 (必须)
        `-- icon_ios.png            ios版低清图标 (必须)
        `-- iicon_ios@2x.png        iso版高清图标 (必须)
    `-- Manifest.xml                H5App配置文件 (必须)
````

## 项目打包
可使用 `ak47 pkg` 功能打包，具体操作教程请参考ak47 gitlab源


## 部署上传

应用中心后台部署相关资料请参考[钱包8.1应用中心接入应用操作文档](http://doc.alipay.net/pages/viewpage.action?pageId=74090565)。

额外需要重点关注`《扩展信息》`这个配置规则。
如H5App-demo应用，它的最基本的扩展信息应为`{"launchParams":{"url":"/www/index.htm"}}`
其中url参数代表了默认首页文件相对于项目文件系统根目录的绝对路径。