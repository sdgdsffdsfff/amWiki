# 移动设备调试

- pubdate: 2014-01-23
- tags: 调试, 远程调试
- author: 双十

---
## 网页远程调试
浏览器和webview调试方式不太一样，以下将分别介绍
#### webview
---
目前通用方案是用weinre，
测试页面：[http://ux.alipay-inc.com/weinre/demo.html](http://ux.alipay-inc.com/weinre/demo.html)，weinre详细文档参见[weinre doc](http://ux.alipay-inc.com:9119/doc/)

调试步骤

- debug id 用于区分每个weinre调试会话所用的标识
- 页面中插入[weinre.js](http://ux.alipay-inc.com/weinre/weinre.js)，此脚本随机生成一个100以内的数字做为debug id。做了sessionStorage存储，当前页面会话中，始终使用同一个debug id。
- 打开使用了weinre的页面，页面中间会显示debug id，记下它。电脑上打开如图的[http://ux.alipay-inc.com:9119/client/#](http://ux.alipay-inc.com:9119/client/#) + debug id 页面开始调试。
![weinre debug id](https://i.alipayobjects.com/e/201401/1wTcMHeDnZ.png 'weinre debug id')

其他：

- android 4.4+ 支持原生远程调试，具体参考[Remote Debugging Chrome on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)
- ios safari自带的远程调试，只试用于本地开发的工程。本地工程跑起来后，调试的步骤参见浏览器部分

### 浏览器
---
#### android

系统要求

- 设备浏览器: Chrome
- 设备系统: Android 4.0+
- PC浏览器: Chrome 31+(推荐Canary)

chrome远程调试技术更新较快，版本间方案略有差异，各版本调试方案详见参考

参考：[Remote Debugging Chrome on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)

缺点：Chrome DevTools用的国外服务器，很慢，以前本地搭过DevTools，待解决……

#### ios

系统要求

- 设备浏览器: Safari 6.0+
- 设备系统: ios 6.0+
- PC浏览器: safari 6.0+ (only mac)

调试步骤

- 真机/模拟器 设置-safari-高级-web检查器
- mac safari 偏好设置-高级-在菜单中显示“开发”菜单
- 真机/模拟器中打开web页面
- mac safari 开发-真机/模拟器中选择对应的页面调试




##amlog
---