# 离线H5App开发指南
- pubdate: 2014-04-21
- tags: demo
- author: 仈爪
---

## 前言

该指南旨在解决基于H5Container开发的H5App离线包的整体流程，如有细节问题需要咨询请联系``@仈爪``、``@双十``

以下内容的demo工程可直接从gitlab获取:[http://gitlab.alibaba-inc.com/h5app/h5app-demo](http://gitlab.alibaba-inc.com/h5app/h5app-demo)

## 环境搭建

H5App本身暂时不需要特殊的开发环境，满足常规web站点的本地开发即可。但最终打包为amr包的打包工具是基于Node.js，因此需要先在开发环境安装好一个Node.js

Node.js安装指南：
[http://sealmemory.blogspot.com/2013/12/install-node-js-in-windows-mac-os-x-linux.html](http://sealmemory.blogspot.com/2013/12/install-node-js-in-windows-mac-os-x-linux.html)

## 前期准备

1. `应用中心接入`
如果您开发的H5App是属于支付宝钱包应用中心的。那么首先你应该先向应用中心PD申请一个应用ID(appId)。<br/>
相关申请和管理文档请参考：[钱包8.1应用中心接入应用操作文档](http://doc.alipay.net/pages/viewpage.action?pageId=74090565)

2. `下载amr打包工具` 可以用gitlab下载打包工具，地址为：[http://gitlab.alibaba-inc.com/h5app/h5app-demo/tree/master/tools](http://gitlab.alibaba-inc.com/h5app/h5app-demo/tree/master/tools)


## 项目构建

_目前构建一个新的H5App项目，暂时还需要手动方式，后续将提供自动构建工具，敬请期待。_

以一个appId为20000127，名称为'H5App-demo'，版本号为'1.0.0.0'的项目为例。

1.在文件系统中新建一个名为H5App-demo的空文件夹，然后以此为根目录，新增一个www文件夹，之后的web开发源码都应该存于此文件夹下。

2.www文件夹内新建一个Manifest.xml文件，该文件用于打包信息管理以及客户端升级信息管理。范例内容如下：<br/>

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

4.将下载好的`amr打包工具`内的`tools`文件夹复制到项目根目录下

最终项目文件系统目录应如下：

````
/H5App-demo
--/tools
----/...
--/www
----/css
------base.css
----/js
------helloWorld.js
----index.html
----Manifest.xml
````

## 项目打包

假设之前的H5App-demo项目的根目录磁盘路径为：`/Users/haibinzhb/Project/alipayProject/H5App-demo` <br/>
假设当前版本号为`1.0.0.0`，appId为`20000127`

运行命令行，打包步骤如下：

````
/* 切换路径至项目文件系统根目录 */
cd /Users/haibinzhb/Project/alipayProject/H5App-demo

/* 运行打包工具package.js */
node tools/package.js dev

````

运行以上命令后，打包工具将在项目根目录自动生成dist、package两个文件夹，其中dist文件夹内容可无视，`最终生成的amr离线包将自动保存至package文件夹内`，amr文件名称为`20000127-1.0.0.0_dev.amr`。

amr包文件名内分别包含了此项目的appId、版本号、运行环境标识。appId和版本号会在Manifest.xml文件中自动获取。

其中运行环境标识'dev'字符串，可以通过运行打包工具的node命令时自定义。例如当执行`node tools/package.js pre` 命令时，生成的amr包文件名将会是`20000127-1.0.0.0_pre.amr`。

之后的项目版本迭代过程中如果需要升级版本号，请直接修改Manifest.xml文件内的版本号信息。

## 部署上传

应用中心后台部署相关资料请参考[钱包8.1应用中心接入应用操作文档](http://doc.alipay.net/pages/viewpage.action?pageId=74090565)。

额外需要重点关注`《扩展信息》`这个配置规则。
如H5App-demo应用，它的最基本的扩展信息应为`“{"launchParams":{"url":"/index.html"}}”`
其中url参数代表了默认首页文件相对于项目文件系统中的www文件夹的绝对路径。