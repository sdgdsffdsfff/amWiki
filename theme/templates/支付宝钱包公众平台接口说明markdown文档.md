# Hello Nico

- pubdate: 2014-06-04

------

## 1文档说明
###  1.1功能描述
该文档为服务窗开发商或者机构入驻支付宝服务窗平台技术标准文档，详细了说明和约束各个接口的参数和规则。
###  1.2阅读对象
该文档面向即将使用支付宝钱包服务窗平台的相关人员，需要具有一定的网站开发能力，了解ASP、PHP、JAVA、ASP.NET等开发语言中的一种及SQL数据库语言的网站开发、维护和管理人员。
###  1.3业务术语
1.业务术语

| 术语 | 解释 |
| ------------ | -------------| 
| 请求 | 支付宝服务端以字符串形式把需要传输的数据发送给接收方的过程。| 
| 通知 | 服务器异步通知。支付宝根据得到的数据处理完成后，支付宝的服务器主动发起通知给商户的网站，同时携带处理完成的结果信息反馈给商户网站。| 
|服务窗账号 | 商户机构入驻支付宝服务窗平台的账号，通过该账号，该商户机构可以提供自己的服务。简称为服务窗号|
|关注（Follow）| 支付宝钱包用户添加服务窗账号。通过关注操作，钱包用户可以使用服务窗账号提供的服务。|
|取消关注（Unfollow）| 支付宝钱包用户将之前已经关注的对象移出的过程。通过取消关注操作，钱包用户将不再使用服务窗账号提供的服务。|
|鉴权（Authentication）| 服务窗账号所对应的机构对支付宝用户在该机构下开设账户的一次验证过程。|
|绑定（Binding）| 将服务窗账号和支付宝用户在服务窗账号对应机构下开设的某个账号在支付宝建立对应关系的一个过程。|
|支付宝预定义菜单 | 商户与支付宝在签约时，商户与支付宝协定好的菜单，该菜单由支付宝创建。|
|服务窗账号自定义菜单 | 商户通过“服务窗账号自定义菜单”接口或登录开放平台，自行设置的菜单内容。|
|信息授权 | 钱包内访问服务窗网站的时候，可以把当前用户的信息授权给服务窗，服务窗可以用此信息注册账户或登录服务窗网站。|


## 2简单接入
### 2.1接入指南

* 2.1.1第一步：申请消息接口

在公众平台网站的高级功能 – 开发模式页，填写“开发者网关”和“开发者公钥”，其中“开发者网关”是开发者用来接收支付宝服务器数据的接口URL。“开发者公钥”可由开发者任意填写，用作生成签名（请参见“21 签名机制”。）。

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kYgs4XLi9.png)

* 2.1.2第二步：验证URL有效性

开发者提交信息后，支付宝服务器将发送请求到开发者填写的网关URL上。
请求使用POST，编码方式为GBK，请求样例：

```
http（或https）://开发者网关服务地址?
sign=kC4Tu9/f2us1gxeprwARx6D6tnJYNXeoo+ok+bOXS2uY6db01p5ZsjLQU2BotSN2ez0jjIfuwxm8CveNJhtnnwE8cKe2HnUxrWrxyYNxUs5Q+lQYdVU4m1/fbDNZ1nU61EfGnXal8vWomagzsoBUQx33IW4uv/efsGz5Y//V1jk=&biz_content=“biz_content示例”
&sign_type=RSA&service=alipay.service.check&charset=GBK
````
其中各个参数的含义：

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| 协议参数 | 
| service | 接口名称 | String | 本接口名称：alipay.service.check。 | 不可空 |alipay.mobile.public.account.add|
| app_id | 服务窗账号ID | String(32) | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。 | 不可空 | 2013091300001633|
| sign | 签名 | String | RSA加密算法后得出的结果，请参见“签名机制”。 | 不可空 |899rerojeorjeo9434343| 
| sign_type | 签名方式 | String | 签名方式只支持RSA。 | 不可空 | RSA |
| charset | 参数编码字符集 | String | 合作伙伴系统与支付宝系统之间交互信息时使用的编码字符集。合作伙伴可以通过该参数指定使用何种字符集对传递参数进行编码。同时，支付宝系统也会使用该字符集对返回参数或通知参数进行编码。默认值为GBK。注意：该参数必须在queryString中传递，不论使用的是POST还是GET方式发送请求。如：https://openapi.alipay.com/gateway.do?charset=GBK | 不可空 |  GBK| 
| timestamp | 时间戳 | String | 时间戳，调用接口时的当前时间，格式为yyyy-MM-dd HH:mm:ss。| 不可空 | 2012-07-30 13:56:27| 
| 业务参数 |
| biz_content | 业务内容 | String | 业务内容，不同的方法，业务内容不一样。  | 不可空 | 如下 |
 
 其中，biz_content示例的值为以下xml串（实际请求时不需要换行、空格）：
 
````
<?xml version="1.0" encoding="gbk"?>
<XML>
<AppId><![CDATA[2014010300073039]]></AppId>
<FromUserId></FromUserId>
<CreateTime><![CDATA[1389171239298]]></CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<EventType><![CDATA[verifygw]]></EventType>
<ActionParam></ActionParam>
<AccountNo></AccountNo>
</XML>

````
AppId：为开发者的公众号标识appId
CreateTime：消息创建时间（long类型）
MsgType：event标识消息体类型
eventType消息体的子类型，verifygw标识验证网关

* 2.1.3第三步：成为开发者 

服务窗可以在服务窗管理平台网站中申请认证，认证成功的服务窗将获得众多接口权限，以满足开发者需求。此后用户每次向服务窗发送消息、或者产生自定义菜单点击事件时，响应URL将得到推送。服务窗调用各接口时，一般会获得正确的结果，具体结果可见对应接口的说明。返回错误时，可根据返回码来查询错误原因。全局返回码说明用户向服务窗发送消息时，服务窗收到的消息发送者是一个OpenID，是使用用户支付宝账户加密后的结果，每个用户对每个公众号有一个唯一的OpenID。

### 2.2典型案例介绍

值得借鉴的公众帐号主要是服务号，试列举并介绍如下： 

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kZMszOVvZ.png) 

你可以办理中石化加油卡，进行支付宝充值，消费查询，附件加油站查询。中石化公众号可以让用户将中石化会员服务和支付宝账号绑定起来，通过该公众号在线申请办卡，使用支付宝充值。

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kZPiyzmFx.png)

你可以通过支付宝实现酒店预订、订单查询、积分查询、活动参与等功能。
只需用手机号绑定一次账户，便可享受布丁酒店公众服务以及92折优惠，可以方便快捷的预订、完成支付。

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kZPjjNMPt.png)

如果你是持卡人，可快捷查询信用卡账单、额度及积分；快速还款、申请账单分期；信用卡消费，支付宝免费提醒。

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kZPjjCNM5.png)

你可以在支付宝里绑定自己的电信手机号，除了可以立即完成话费充值外，还可以随时进行余额、套餐以及流量查询，另外，还能知晓电信最新优惠信息。

![alt text](https://i.alipayobjects.com/i/ecmng/png/201405/2kZPjjQi0r.png)

在我们身处异地办理违章缴款并不方便、或是时间不充裕的时候，选择支付宝钱包代办交通违章无疑非常方便，万事不求人，填写完车牌号、发动机号等资料后就可以对车辆的违章情况进行查询，如果我们对违章情况没有异议的话可以直接在这里缴纳违章费用。。

### 2.3开放者规范

开发者进行服务窗开发时，除了需要满足每个接口的规范限制、调用频率限制外，还需特别注意模版消息、用户数据等敏感信息的使用规范。

涉及用户数据时：

* 您的服务需要收集用户任何数据的，必须事先获得用户的明确同意，且仅应当收集为运营及功能实现目的而必要的用户数据， 同时应当告知用户相关数据收集的目的、范围及使用方式等，保障用户知情权。
* 您收集用户的数据后，必须采取必要的保护措施，防止用户数据被盗、泄漏等。
* 您在特定支付宝服务窗中收集的用户数据仅可以在该特定支付宝服务窗中使用，不得将其使用在该特定支付宝服务窗之外或为其他任何目的进行使用，也不得以任何方式将其提供给他人。
* 如果支付宝认为您收集、使用用户数据的方式，可能损害用户体验，支付宝有权要求您删除相关数据并不得再以该方式收集、使用用户数据。
* 一旦您停止使用本服务，或支付宝基于任何原因终止您使用本服务，您必须立即删除全部因使用本服务而获得的数据（包括各种备份）， 且不得再以任何方式进行使用。

其他规范：

* 请勿为任何用户自动登录到支付宝服务窗平台提供代理身份验证凭据。
* 请勿提供跟踪功能，包括但不限于识别其他用户在个人主页上查看、点击等操作行为。
* 请勿自动将浏览器窗口定向到其他网页。
* 请勿设置或发布任何违反相关法规、公序良俗、社会公德等的玩法、内容等。
* 请勿公开表达或暗示，您与支付宝之间存在合作关系，包括但不限于相互持股、商业往来或合作关系等，或声称支付宝对您的认可。


## 3基础支持

### 3.1签名机制

详见9.签名机制。

## 4接收消息

### 4.1验证消息有效性 

请参见“验证 URL有效性”。 

### 4.2接收事件推送 

用户在支付宝钱包客户端的服务窗账号所做操作触发的消息，支付宝服务器将POST该消息到商户的服务器上。目前消息类型主要为事件消息。

请注意该接口与“商户回复消息”是同一个接口，用户发送是请求request，商户回复是response。

* 4.2.1发送消息到商户请求样例

注意：http请求实际方式为POST。

````
https://商户服务端网关地址?sign=SKlbQBMz7ImtuU0dvTvYybMI+jRu2hvM9RXHcs4/OoDEQmYzr6vX7X8RH70YV4bcd8aHLF132GGZYteYGAdD+ntBajD4UdjaHXDJOOtz2Pt7vO6SST37NIyrlqDEzMdsY6yBH5SCTwg7bA3oj1kpAxYIs0iLqPk8h98PLssbpAs=&biz_content=“biz_content示例”&sign_type=RSA&service=alipay.mobile.public.message.notify&charset=GBK

````
* 4.2.1关注消息 

````
<XML>
    <AppId><![CDATA[2013091400029967]]></AppId>
    <FromUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></FromUserId>
    <CreateTime>1380108585332</CreateTime>
    <MsgType><![CDATA[event]]></MsgType>
    <EventType><![CDATA[follow]]></EventType>
    <ActionParam><![CDATA[]]></ActionParam>
    <AgreementId><![CDATA[]]></AgreementId>
    <AccountNo><![CDATA[]]></AccountNo>
    <UserInfo><![CDATA[{
       "logon_id": "135****1009",
       "user_name": "*iuxu527"
       }]]>
    </UserInfo>
</XML>

````
* 4.2.2取消关注

````
<XML>
<AppId><![CDATA[2013091400029967]]></AppId>
<FromUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></FromUserId>
<CreateTime>1380111494883</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<EventType><![CDATA[unfollow]]></EventType>
<ActionParam><![CDATA[]]></ActionParam>
<AgreementId><![CDATA[]]></AgreementId>
<AccountNo><![CDATA[]]></AccountNo>
<UserInfo><![CDATA[
{
    "logon_id": "135****1009",
    "user_name": "*iuxu527"
}
]]>
</UserInfo>
</XML>

````
* 4.2.3点击菜单

````
<XML>
<AppId><![CDATA[2013091400029967]]></AppId>
<FromUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></FromUserId>
<CreateTime>1380111761024</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<EventType><![CDATA[click]]></EventType>
<ActionParam><![CDATA[ZFB_HFCX]]></ActionParam>
<AgreementId><![CDATA[20130925000001318457]]></AgreementId>
<AccountNo><![CDATA[]]></AccountNo>
<UserInfo><![CDATA[
{
    "logon_id": "135****1009",
    "user_name": "*iuxu527"
}
]]></UserInfo>
</XML>

````
* 4.2.4发送消息到商户的请求参数 

1.发送消息到商户请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| 协议参数 | 
| service | 接口名称 | String | 本接口名称：alipay.mobile.public.message.notify | 不可空 | alipay.mobile.public.message.notify|


2.用户发送消息到服务窗账号biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| AppId | 服务窗账号ID | String(64) | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。| 不可空 |2013080800008888 | 
| FromUserId | 用户的支付宝用户号 | String | 普通用户的支付宝账户用户号。事件类型为follow（关注消息）或unfollow（取消关注）时，本参数不可空。|可空 |aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01| 
| CreateTime | 消息创建时间 | String | 消息创建时间（整型）。时间戳，值是根据1970年起算。| 不可空 | 12334349884 | 
| MsgType | 消息类型 | String | 消息类型：event（事件）。 | 不可空 | event | 
| EventType | 事件类型 | String | 事件类型。follow：关注消息；unfollow：取消关注；click：自定义菜单点击事件。| 不可空 | follow | 
| ActionParam | 按钮标识 | String | 按钮标识，为自定义菜单中的actionParam的值。eventType为follow（关注消息）或unfollow（取消关注）时，本参数为空值，赋值为：<![CDATA[]]>。eventType为click时，本参数需有值：就是菜单的key。| 不可空 | MENU_V01_REPAYMENT | 
| AgreementId | 协议号 | String(32) | 协议号是商户会员在支付宝服务窗账号中的唯一标识。只有在绑定商户会员号高级功能且为click事件时才会有值。| 可空 | 2013080800008888 | 
| AccountNo | 商户的会员账号 | String | 商户的会员账号。只有在绑定商户会员号高级功能且为click事件才会有值。| 可空 | 188986578765 | 
| UserInfo | 用户信息 | 	String | 支付宝的用户信息，json字符串。目前包括：logon_id：隐藏的支付宝账号，如：shu***@163.com；user_name：用户姓名，如：*小虎。| 可空 | { "logon_id": "135****1009","user_name":"*iuxu527"}| 

## 5发送消息 
### 5.1发送被动响应消息

 * 5.1.1概述
 
 用户操作服务窗账号中的功能时（如关注、菜单点击等），商户可以根据业务不同，向指定支付宝用户发送处理结果或后续业务操作的回复，该回复以消息的形式显示到服务窗平台上。商户通过调用本接口，以XML格式组装成处理结果数据直接打印出来。
请注意本章节内容不是一个独立接口，而是配合“接收事件推送”章节接口作为其同步返回。

* 5.1.2回复样例 

````
<XML>
    <ToUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></ToUserId>
    <AppId><![CDATA[2013091300001603]]></AppId>
    <CreateTime>1380160451638</CreateTime>
    <MsgType><![CDATA[image-text]]></MsgType>
    <ArticleCount>1</ArticleCount>
    <Articles>
        <Item>
            <Title><![CDATA[优惠信息]]></Title>
            <Desc><![CDATA[老用户全场优惠，免运费。]]></Desc>
            <ImageUrl><![CDATA[http://alipay.com/ima/2013.jpg]]></ImageUrl>
            <Url><![CDATA[http://alipay.com/7602.html]]></Url>
        </Item>
    </Articles>
</XML>

````

* 5.1.3回复参数 

服务窗账号回复消息参数说明
 
| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| ToUserId | 接收方支付宝用户号 | String | 接收方的支付宝账户OpenID。| 不可空 | aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 |
| AppId | 服务窗账号ID | String | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。| 不可空 | 2013091300001603 | 
|CreateTime | 消息创建时间 | String | 消息创建时间（整型）。 | 不可空 | 1380160451638 | 
| MsgType| 消息类型 | String | 消息类型：image-text（图文消息）。目前只支持这种消息类型，后面会扩展。 | 不可空 | image-text | 
| ArticleCount | 图文消息个数 | String | 图文消息个数，目前只支持1个。 | 不可空 | 1 | 
| Articles | 图文消息 | String | 图文的详细信息，为XML格式字符串。由Item（单个图文项）组成。 | 不可空 |  <Item><Title><![CDATA[这个是标题]]></Title><Desc><![CDATA[这个是图文内容]]></Desc><ImageUrl><![CDATA[http://domain.url]]></ImageUrl><Url><![CDATA[http://domain/do.url]]></Url></Item>|
| Item（单个图文项）参数 | 


| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| Title | 图文消息标题 | String | 图文消息标题。 | 有一项不为空 | 这个是标题 | 
| Desc | 图文消息描述 | String | 图文消息描述，不超过2000字节。 | 有一项不为空 |这个是图文内容 | 
| ImageUrl | 图文地址 | String | 图文地址，，图片支持PNG、JPG格式。如果不设置本参数，则需赋值为：<![CDATA[]]>。| 有一项不为空 | 图片所对应的超链接 | 
| Url | 跳转链接地址 | String | 点击图文消息跳转的链接地址。如果不设置本参数，则需赋值为：<![CDATA[]]>。如果在绑定商户会员号流程中，该参数须有效，且能正常访问。 | 可空 | 图文消息对应的详情页面 |
| ActionName | 跳转说明| String | 服务窗账号消息页面展现消息按钮文案，建议跳转就用“立即前往”，查看就用“立即查看”，不超过10个汉字。默认：立即查看| 可空 | 立即查看 | 
| AuthType | 授权类型 | String | 配置参数为loginAuth即为信息授权，请参见“网页授权用户基本信息”。该参数只支持loginAuth。| 可空 | loginAuth |

### 5.2向用户发送消息

* 5.2.1概述

商户主动推送消息给关注的用户。目前支持推送消息类型：文本消息和图文消息。

* 5.2.2请求样例

注意：http请求实际方式为POST。

````
https://openapi.alipay.com/gateway.do?access_token=ACCESS_TOKEN&method=alipay.mobile.public.message.push&charset=GBK&app_id=2013091300001633&biz_content=“下面的内容”

````
biz_content数据示例如下：

1.推送图文消息

````
<XML>
<ToUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></ToUserId>
<AppId><![CDATA[20885678888]]></AppId>
<CreateTime>12334349884</CreateTime>
<MsgType><![CDATA[image-text]]></MsgType>
<ArticleCount>1</ArticleCount>
<Articles>
<Item>
<Title><![CDATA[This is title1]]></Title>
<Desc><![CDATA[This is describle]]></Desc>
<ImageUrl><![CDATA[http://domain.url]]></ImageUrl>
<Url><![CDATA[http://domain/do.url]]></Url>
</Item>
</Articles>
</XML>

````
2. 推送纯文本消息 

````
<XML>
<ToUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></ToUserId>
<AppId><![CDATA[20885678888]]></AppId>
<CreateTime>12334349884</CreateTime>
<MsgType><![CDATA[image-text]]></MsgType>
<ArticleCount>1</ArticleCount>
<Articles>
<Item>
<Title><![CDATA[这是标题]]></Title>
<Desc><![CDATA[这是纯文本内容]]></Desc>
<ImageUrl><![CDATA[]]></ImageUrl>
<Url><![CDATA[]]></Url>
</Item>
</Articles>
</XML>

````

* 5.2.3请求参数

1.请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| 协议参数 | 
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.message.push。| 不可空 | alipay.mobile.public.message.push | 

2.服务窗账号下发消息biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| ToUserId | 接收方支付宝账户ID | String | 接收方的支付宝账户OpenID。 | 可空 |aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 | 
| AppId | 服务窗账号ID | String | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。| 不可空 | 20885678888 | 
| CreateTime | 消息创建时间 | String | 消息创建时间（整型）。时间戳，具体值是根据自1970年计算的毫秒数。 | 不可空 | 12334349884 | 
| MsgType | 消息类型 | String | 消息类型：image-text（图文消息）。 |不可空 | image-text | 
| ArticleCount | 消息个数 | String |  图文/文本消息个数，目前最多支持4个。 | 不可空 | 1 | 
| Articles | 图文消息 | String | 发送出去的详细信息，为XML格式字符串。由Item（单个图文项）组成。 | 不可空 | <Item><Title><![CDATA[This is title1]]></Title><Desc><![CDATA[This is describle]]></Desc><ImageUrl><![CDATA[http://domain.url]]></ImageUrl><Url><![CDATA[http://domain/do.url]]></Url></Item> | 
| Item（单个图文项）参数 | 
| Title | 图文消息标题 | String | 消息标题。如果不设置本参数，则需赋值为：<![CDATA[]]>。| 单图文有一项不为空，多图文必须有标题和图片 | This is title1 | 
| Desc | 图文消息描述 | String | 图文消息摘要、文本消息正文。如果不设置本参数，则需赋值为：<![CDATA[]]>。Title和Desc不可同时为空。| 单图文有一项不为空，多图文必须有标题和图片 | This is describle如果需要换行，请使用\n | 
| ImageUrl | 图文地址 | String | 图片链接地址，图片支持PNG、JPG格式。如果不设置本参数，则需赋值为：<![CDATA[]]>。| 单图文有一项不为空，多图文必须有标题和图片 | http://domain.url | 
| Url | 跳转链接地址 | String | 点击图文消息跳转的链接地址。如果不设置本参数，则需赋值为：<![CDATA[]]>。 | 可空 |  http://domain/do.url | 

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| ActionName | 跳转说明 | String | 服务窗账号消息页面展现消息按钮文案，建议跳转就用“立即前往”，查看就用“立即查看”，不超过10个汉字。默认：立即查看 | 可空 | 立即查看 | 
| AuthType | 授权类型 |  String | 配置参数为loginAuth即为信息授权，请参见“10  免登机制”。该参数只支持loginAuth。| 可空 | loginAuth |

* 5.2.4 推送消息关键参数设置说明 

商户可以根据下表设置要发送消息的特定类型的用户
 
 1. 推送消息关键参数设置说明

| 参数：ToUserId | 推送效果 | 
| ------------ | -------------|
| 空值 | 推送消息给所有关注的用户，频率为每周一次。 | 
| 非空值 | 推送给指定关注用户。 |

* 5.2.5 同步返回参数 

1 返回参数列表

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| alipay_mobile_public_message_push_response | 
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1  业务返回码”。| 不可空 | 200 |
| msg | 含义 | String | 支付宝返回的处理结果说明处理成功：success；处理失败：请参考“13.1  业务返回码”。| 不可空 | 成功 |
| sign | 签名结果 | String | 支付宝返回的签名结果。目前仅支持RSA方式。 | 不可空 | gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw= |

* 同步返回样例

正常输出：

````
{"alipay_mobile_public_message_push_response":{"code":200,"msg":"成功"},"sign":"gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw="}

````

发生错误时输出： 

````
{"alipay_mobile_public_message_push_response":{"code":12001,"msg":"服务窗号与消息体内不一致"},"sign":"bIZJ2Swk5CLsLU8Ug4w93n46AR/kkCDAlof+2S+MlAOY89t4OriRSaKhzI2RBt1eTWmr4ErwQkt35501xqgGKNdSNvt6VsFWZVplXmzFoSRkr10GCaIbaO4ASVNndG+PG3qWTbobqBxe67xY86KcZlhZtCRko290gWmZFABliz0="}

````

## 6用户管理

### 6.1获取用户地理位置

* 概述

商户向支付宝申请开通了查询地理位置接口权限后，用户进入该服务窗之后。商户可以对关注其服务窗账号的用户获取地理位置信息。

* 请求样例


````
http://openapi.alipaydev.com/gateway.do?access_token=ACCESS_TOKEN&method= alipay.mobile.public.gis.get&charset=GBK&biz_content={"usrid":" aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 "}

````
biz_content示例（实际赋值时，需去除换行与空格）：

````
{
"usrid":" aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01  "
}

````

* 6.1.3请求参数
 
1.请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| 协议参数 |
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.gis.get。 | 不可空 | alipay.mobile.public.gis.get |


2.查询用户地理位置biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| usrid | 支付宝用户ID | String | 要查询的关注用户的支付宝用户号，以英文加字母组合的字符串。 | 不可空 | aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01  |

* 6.1.4 同步返回参数


1.返回参数列表

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| alipay_mobile_public_gis_get_response | 
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1  业务返回码”。 | 不可空 | 200 |
| msg | 含义 | String | 支付宝返回的处理结果说明处理成功：成功；处理失败：请参考“13.1  业务返回码”。 | 不可空 | 成功 | 
| latitude | 纬度 | String | 纬度信息。 | 不可空 | 30.28291805940034 | 
| longitude | 经度 | String | 经度信息。 | 不可空 | 120.0208392468977 |
| accuracy | 误差范围 | String | 误差范围，单位：米。 | 不可空 | 65.0 | 

#### 6.2网页授权获取用户基本信息

* 6.2.1 概述

如果用户在钱包中访问服务窗的第三方网页，开发者可以通过此接口获取当前用户基本信息（包括昵称、性别、城市、国家）。利用用户信息，可以实现体验优化、用户来源统计、帐号绑定、用户身份鉴权等功能。请注意，“获取用户基本信息接口是在用户和服务窗产生消息交互时，才能根据用户OpenID获取用户基本信息，而网页授权的方式获取用户基本信息，则无需消息交互，只是用户进入到公众号的网页，就可弹出请求用户授权的界面，用户授权后，就可获得其基本信息（此过程甚至不需要用户已经关注公众号。）”
 本接口是通过OAuth2.0来完成网页授权的，是安全可靠的，关于OAuth2.0的详细介绍，可以参考OAuth2.0协议标准。
具体而言，网页授权流程分为四步：

1.引导用户进入授权页面同意授权，获取auth_code。这个获取在钱包中有多种模式。
2.通过auth_code换取网页授权access_token（与基础支持中的access_token不同）
3.如果需要，开发者可以刷新网页授权access_token，避免过期
4.通过网页授权access_token获取用户基本信息

* 6.2.2 获得授权码

当触发信息授权功能时，当前页面会跳转至商户的页面上，商户的服务端会接收支付宝传递过来的参数auth_code（授权码）。如下：
http://商户自定义地址?ALIPAY_AUTH=publicp&auth_code=af1a1304b37240d2a78f2c51ea8500e1&PUBLIC_ID=2013102100032529&app_id=2013102100032529&sourceId=publicplatform

有以下2种方式可配置信息授权。


* 6.2.3 在服务窗平台中配置

商户可登录服务窗平台，在“菜单管理”中，选择“设置动作”为“自动登录网页”，并填写网址，点击“完成”，即可实现。
 
![alt text](https://i.alipayobjects.com/i/ecmng/png/201406/2mBvRHXF25.png)


* 6.2.4 通过调用API配置

在接口API中有2种菜单类型：一种是link，一种是out。
设置link类型菜单时
在url参数中的biz_content业务参数内容里把authType配置为loginAuth。
设置out类型菜单时

   商户同步返回
	
支付宝调用商户“接收事件推送”接口时，发送的回复消息中需设置<AuthType>loginAuth</AuthType>参数，且Item节点下的参数Url必须设置。ActionName参数是消息体里面展现的文案，建议配置成立即前往，如下：

````
<XML>
<ToUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01]]></ToUserId>
<AppId><![CDATA[2013081700023966]]></AppId>
<CreateTime>12334349884</CreateTime>
<MsgType><![CDATA[image-text]]></MsgType>
<ArticleCount>1</ArticleCount>
<Articles>
<Item>
<Title><![CDATA[标题]]></Title>
<Desc><![CDATA[内容]]></Desc>
<ImageUrl><![CDATA[http://domain.url]]></ImageUrl>
<Url><![CDATA[http://domain/do.url]]></Url>
<ActionName><![CDATA[立即前往]]></ActionName>
<AuthType><![CDATA[loginAuth]]></AuthType>
</Item>
</Articles>
</XML>

````

   商户主动发起
支付宝调用商户“接收事件推送”接口时，发送的回复消息中需设置<AuthType>loginAuth</AuthType>参数，且Item节点下的参数Url必须设置。ActionName参数是消息体里面展现的文案，建议配置成立即前往，如下：

````
<XML>
<ToUserId><![CDATA[aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 ]]></ToUserId>
<AppId><![CDATA[2013081700023966]]></AppId>
<CreateTime>12334349884</CreateTime>
<MsgType><![CDATA[image-text]]></MsgType>
<ArticleCount>1</ArticleCount>
<Articles>
<Item>
<Title><![CDATA[标题]]></Title>
<Desc><![CDATA[内容]]></Desc>
<ImageUrl><![CDATA[http://domain.url]]></ImageUrl>
<Url><![CDATA[http://domain/do.url]]></Url>
<ActionName><![CDATA[立即前往]]></ActionName>
<AuthType><![CDATA[loginAuth]]></AuthType>
</Item>
</Articles>
</XML>

````

* 6.2.5 调用换取授权访问令牌接口

商户拿到auth_code（授权码）后，调用换取授权访问令牌接口（alipay.system.oauth.token），该接口相关信息请参考：

````
https://openhome.alipay.com/doc/viewApiDoc.htm?name=alipay.system.oauth.token&version=1.0&subVersion=1.4&packageCode=TOOL

````


调用成功之后，取支付宝的返回参数access_token（访问令牌），如下：

````
"access_token":"20120823ac6ffaa4d2d84e7384bf983531473993"

````

成功获取到access_token表示商户系统可以实现具体信息共享业务功能了。

 注意：
信息授权的实现方式是，商户根据支付宝用户号对比商户会员数据里是否已经存在该支付宝用户，如果不存在那么自动把该支付宝用户变成商户的会员，并让该用户登录进商户网站，如果已存在则直接登录商户网站。
禁止出现让用户设置商户网站的会员密码的操作界面等把支付宝会员转换为商户网站自己的会员的操作。


##7  自定义菜单
###7.1  概述
服务窗账号可以使用该接口完成自定义菜单的创建、查询和更新操作。

菜单说明：

* 菜单创建后，在支付宝钱包客户端是实时生效的，即创建成功后就可以在钱包里面显示设置的菜单。
* 删除原有菜单，服务窗账号需要保留删除菜单的响应服务一天。
* 菜单包括支付宝预定义菜单和服务窗账号自定义菜单。一级菜单最多设置4个， 二级菜单最多设置5个。支付宝预定义一级菜单最多可以设置2个，服务窗账号自定义的一级菜单，最多可以设置4个。服务窗号自定义一级菜单的个数和支付宝预设一级菜单的个数，其两者的总数不能超过4个。
* 一级菜单的显示名称最多不能超过4个汉字，二级菜单其名称最多不能超过12个汉字。
###7.2  自定义菜单创建接口
####7.2.1  请求样例

注意：https请求实际方式为POST。

```
https://openapi.alipay.com/gateway.do?charset=GBK&biz_content=“biz_content示例”&sign=o7AZ4bA+VubGly3CmL7m7Z1PT7va27MJhgZ92DOU8lXGYxdLutIh8XAXu1qdLEyu6xKMf5aMo2kI1dV/llSaGV+RO7D0D8R4khrw/DlZ4ZVRgLS0ttsoIVqNzkTH0PSQxNUpq+nWfab6VpYPEx8cPCXAPH4SmmKiEI5USnBanhk=&sign_type=RSA&app_id=2013091400029967&method=alipay.mobile.public.menu.add&timestamp=2013-10-10 10:10:10
```
biz_content示例（实际赋值时，需去除换行与空格）：
```
{
    "button": [
        {
            "actionParam": "ZFB_HFCZ",
            "actionType": "out",
            "name": "话费充值"
        },
        {
            "name": "查询",
            "subButton": [
                {
                    "actionParam": "ZFB_YECX",
                    "actionType": "out",
                    "name": "余额查询"
                },
                {
                    "actionParam": "ZFB_LLCX",
                    "actionType": "out",
                    "name": "流量查询"
                },
                {
                    "actionParam": "ZFB_HFCX",
                    "actionType": "out",
                    "name": "话费查询"
                }
            ]
        },
        {
            "actionParam": "http://m.alipay.com",
            "actionType": "link",
            "name": "最新优惠"
        }
    ]
}
```
上述菜单格式对应在支付宝客户端菜单区域的展示如下图所示：
![alert text](https://i.alipayobjects.com/i/ecmng/png/201406/2m7yk61HLp.png "Title")
  
图7-1 菜单样例

####7.2.2  请求参数
通过POST一个特定结构体，实现支付宝钱包客户端的服务窗账号创建自定义菜单。
本接口只可以调用一次，菜单已存在无需再次创建，今后只需要调用更新接口。

表7-1 菜单创建请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 | 
| ------------ | -------------|
| 协议参数 |
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.menu.add。 | 不可空 | alipay.mobile.public.menu.add |

表7-2 菜单创建biz_content参数说明


| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| button | 按钮	| 数组 | 按钮数组，定义菜单按钮。 | 不可空 | 参见“3.2.2  请求样例” |
| subButton | 子按钮	| 数组 | 子按钮数组，定义子菜单按钮。 | 可空 | 参见“3.2.2  请求样例” |
| actionType | 动作类型 | String | 菜单动作类型.out：点击钱包服务窗账号首页中的菜单请求支付宝服务窗平台，支付宝服务窗平台会从服务窗账号的网关中获取该菜单对应的响应；link：点击菜单直接跳转web/wap页面，不需要请求支付宝服务窗平台。 | 不可空 | out | 
| name | 按钮名称 | String | 按钮显示名称。一级菜单最多4个汉字;二级菜单最多12个汉字。 | 不可空      | 立即还款 |
| actionParam | 按钮标识 | String | 当菜单actionType=out时，actionParam是标识按钮作用的键值，用于“4  用户发送消息到”接口。当菜单actionType=link时，actionParam的值为直接跳转web/wap的链接地址。actionParam用于超链接时不能超过255个字符，不能使用特殊符号，如冒号。 | 不可空 | MENU_V01_REPAYMENT | 
| authType | 信息授权标识 | String | 当需要免登时，该参数必须取值为loginAuth。只有actionType为link时才能配置该参数。如果actionType为out，需在商户调用“5  商户回复消息”接口时，设置参数authType来标识是否免登。 | 可空 | loginAuth |


####7.2.3  同步返回参数

表7-3 菜单创建返回参数列表

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay.mobile.public.menu.add |
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1业务返回码业务返回码”。 | 不可空 | 200 | 
| msg | 含义 | String | 支付宝返回的处理结果说明。处理成功：success；处理失败：请参考“13.1业务返回码”。 | 不可空 | 成功 |
| sign | 签名结果 | String | 支付宝返回的签名结果。 | 不可空 | gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw= |

####7.2.4  同步返回样例

*	正常输出：
```
{"alipay_mobile_public_menu_add_response":{"code":200,"msg":"成功"},"sign":"gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw="}
```
*	发生错误时输出：
```
{"alipay_mobile_public_menu_add_response":{"code":11013,"msg":"菜单已经创建过"},"sign":"SFIJp0ZUTrjymCGTfLnfsGBh8objZgCEF1HsDvofpCjCZmTAnuuz/x8rRKiEEtnfipp0XHGpGRykMEzCvaJ6jt+FkAFiU0WCQAhXQFMX62tDCAqWu2RsKJVYeoJf1ApZESbIxAz0GE6WOwDFXQSHlCastLt30Lt4s9+vhiF7cHk="}
```
###7.3  自定义菜单更新接口
####7.3.1  请求样例
注意：https请求实际方式为POST。
```
http://openapi.alipaydev.com/gateway.do?access_token=ACCESS_TOKEN&method= alipay.mobile.public.menu.update&charset=GBK&app_id=2013091300001633&biz_content =“biz_content示例”
```
biz_content示例（实际赋值时，需去除换行与空格）：
```
{
    "button": [
        {
            "actionParam": "ZFB_HFCZ",
            "actionType": "out",
            "name": "话费充值"
        },
        {
            "name": "查询",
            "subButton": [
                {
                    "actionParam": "ZFB_YECX",
                    "actionType": "out",
                    "name": "余额查询"
                },
                {
                    "actionParam": "ZFB_LLCX",
                    "actionType": "out",
                    "name": "流量擦寻"
                },
                {
                    "actionParam": "ZFB_HFCX",
                    "actionType": "out",
                    "name": "话费查询"
                }
            ]
        }
    ]
}
```
以上示例是将上述创建的菜单中的“最新优惠”去掉。上述菜单格式对应在支付宝客户端菜单区域的展示如下图所示：
![alt text](https://i.alipayobjects.com/i/ecmng/png/201406/2mBTZccTCH.png "Title")

图7-2 菜单样例

####7.3.2  请求参数

通过POST一个特定结构体，实现支付宝钱包客户端的服务窗账号更新自定义菜单。每一次的更新是针对全部自定义菜单的更新。

表7-4 菜单更新请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.menu.update。 | 不可空 | alipay.mobile.public.menu.update | 
| button | 按钮	| 数组 | 按钮数组，定义菜单按钮。 | 不可空 | 参见“3.2.2请求样例” |
| subButton | 子按钮	| 数组 | 子按钮数组，定义子菜单按钮。 | 可空 | 参见“3.2.2请求样例” |
| actionType | 动作类型	| String | 菜单动作类型。out：点击钱包服务窗账号首页中的菜单请求支付宝服务窗平台，支付宝服务窗平台会从服务窗账号的网关中获取该菜单对应的响应；link：点击菜单直接跳转web/wap页面，不需要请求支付宝服务窗平台。 | 不可空 | out |
| name | 按钮名称 | String | 按钮显示名称。一级菜单最多4个汉字；二级菜单最多12个汉字。| 不可空 | 立即还款 |
| actionParam | 按钮标识	| String | 当菜单actionType=out时，actionParam是标识按钮作用的键值，用于“4  用户发送消息到”接口。当菜单actionType=link时，actionParam的值为直接跳转web/wap的链接地址。actionParam用于超链接时不能超过255个字符，不能使用特殊符号，如冒号。 | 不可空 | MENU_V01_REPAYMENT |
| authType | 信息授权标识 | String | 当需要免登时，该参数必须取值为loginAuth。只有actionType为link时才能配置该参数。如果actionType为out，需在商户调用“5  商户回复消息”接口时，设置参数authType来标识是否免登。 | 可空 | loginAuth |

表7-5 菜单更新biz_content参数说明

####7.3.3  同步返回参数

表7-6 菜单更新返回参数列表

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay_mobile_public_menu_update_response |
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1业务返回码”。 | 不可空 | 200 |
| msg | 含义	| String | 支付宝返回的处理结果说明。处理成功：成功；处理失败：请参考“13.1业务返回码”。 | 不可空 | 成功 |
| sign | 签名结果 | String | 支付宝返回的签名结果。 | 不可空 | gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw= |

####7.3.4  同步返回样例

*	正常输出：
```
{"alipay_mobile_public_menu_update_response":{"code":200,"msg":"成功"},"sign":"gi771WtMTPpLY68/jCibUyHZ1S6wbVFzD+E2ggH2TkwrJAl6tP2a/TyJIgxWrwnoYQfT6MEY3FwzC5x1jAhvb4l31fDKXfhi9iqfs87y4WT27rXRvvszXt5ILOkFLZ7NbZ1lZcZzPvL4fUf5qZLfsGlhzfkMUlThiMD8T+6VqVw="}
```
*	发生错误时输出：
```
{"alipay_mobile_public_menu_update_response":{"code":11006,"msg":"二级菜单超出个数"},"sign":"wwd3ofIpMD/eJIYhm3xTJgo4k1YvoW5JYInWxNJLVmqZ4ikTyZ90/KJCNN3PyquWyslego/6FSFj4D9TFRuGFSiTqQ0vnM0TT/wznn/8pKdC8cmmoZAIIAuyA/tnHoWYSt1cG/SsceF2pX87/TEL6rDY7xp36ha6D4SD4cpXxgA="}
```
###7.4  自定义菜单查询接口
####7.4.1  请求样例
注意：https请求实际方式为POST。
```
http://openapi.alipaydev.com/gateway.do?access_token=ACCESS_TOKEN&method= alipay.mobile.public.menu.get&charset=GBK&app_id=2013091300001633&biz_content =“biz_content示例”
```
####7.4.2  请求参数
查询当前使用的自定义菜单。

表7-7 菜单查询请求参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| 协议参数 |
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.menu.get。 | 不可空 | alipay.mobile.public.menu.get |


####7.4.3  同步返回参数

表7-8 菜单查询返回参数说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay_mobile_public_menu_get_response |
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1  业务返回码”。 | 不可空 | 200 |
| msg | 含义 | String | 支付宝返回的处理结果说明。处理成功：成功；处理失败：请参考“13.1  业务返回码”。 | 不可空 | 成功 |
| sign | 签名结果 | String | 支付宝返回的签名结果。目前仅支持RSA签名。 | 不可空 | jTU/3xLG9x612YuruHiFNMHyqafouXqD0Jjml1spsWZ7xeRt/zmFaHMZXyGVRp/tTOdugpSDmNU6+vO3bkQtFxKpNizPy7tFiERoAb7dYiFRdgZSpxRpjs5H9vi5dDcI9WZ455kkv9zVMz2siqyI5IKBvXAvUWMWOgb9lDN7uCY= |
| menu_content | 菜单内容 | String | 查询菜单的所有内容，为JSON格式，请参考“表3-9  菜单查询返回参数menu_content说明” | 可空 | 参见“3.4.4  同步返回样例” |

表7-9 菜单查询返回参数menu_content说明

| 参数 | 参数名称 | 类型（长度范围）| 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| button | 按钮 | 数组 | 按钮数组，定义菜单按钮。 | 不可空 | 参见“3.4.4同步返回样例” |
| subButton | 子按钮 | 数组 | 子按钮数组，定义子菜单按钮。 | 可空 | 参见“3.4.4同步返回样例” |
| actionType | 动作类型 | 数组 | 菜单动作类型。out：点击钱包服务窗账号首页中的菜单请求支付宝服务窗平台，支付宝服务窗平台会从服务窗账号的网关中获取该菜单对应的响应；link：点击菜单直接跳转web/wap页面，不需要请求支付宝服务窗平台。| 不可空 | out |
| name | 按钮名称 | String | 按钮显示名称。一级菜单最多4个汉字；二级菜单最多12个汉字。| 不可空 | 立即还款 |
| actionParam | 按钮标识 | String | 当菜单actionType=out时，actionParam是标识按钮作用的键值，用于“4用户发送消息到”接口。当菜单actionType=link时，actionParam的值为直接跳转web/wap的链接地址。actionParam用于超链接时不能超过255个字符，不能使用特殊符号，如冒号。 | 不可空 | MENU_V01_REPAYMENT |
| authType | 授权类型 | String | 当需要免登时，该参数必须取值为loginAuth。只有actionType为link时才能配置该参数。如果actionType为out，需在商户调用“5  商户回复消息”接口时，设置参数authType来标识是否免登。 | 可空 | loginAuth |



####7.4.4  同步返回样例

*	查询成功：
```
{"alipay_mobile_public_menu_get_response":{"code":200, "menu_content":"menu_content内容","msg":"成功","sign":"jTU/3xLG9x612YuruHiFNMHyqafouXqD0Jjml1spsWZ7xeRt/zmFaHMZXyGVRp/tTOdugpSDmNU6+vO3bkQtFxKpNizPy7tFiERoAb7dYiFRdgZSpxRpjs5H9vi5dDcI9WZ455kkv9zVMz2siqyI5IKBvXAvUWMWOgb9lDN7uCY="}
```
其menu_content如下（实际返回无换行和空格），
```
{
    "button": [
        {
            "actionParam": "ZFB_HFCZ",
            "actionType": "out",
            "name": "话费充值"
        },
        {
            "name": "查询",
            "subButton": [
                {
                    "actionParam": "ZFB_YECX",
                    "actionType": "out",
                    "name": "余额查询"
                },
                {
                    "actionParam": "ZFB_LLCX",
                    "actionType": "out",
                    "name": "流量查询"
                },
                {
                    "actionParam": "ZFB_HFCX",
                    "actionType": "out",
                    "name": "话费查询"
                }
            ]
        }
    ]
}
```
###7.5  自定义菜单事件推送
请参考章节“接收时间发送”中关于菜单点击事件。

##8  商户会员号
###8.1  添加绑定商户会员号
####8.1.1  概述
当用户成为商户的关注用户后，可以在商户的服务窗平台中点击“添加绑定商户会员号”功能，支付宝系统收到操作请求后将该动作通知给商户（调用“4  用户发送消息到”接口，eventType（事件类型）为click，actionParam（按钮标识）为authentication），商户根据此通知调用“5  商户回复消息”接口（其中须包含Url链接地址），支付宝收到商户的回复消息中的链接地址后，自动跳转至商户平台的上商户会员绑定界面中，让用户完成账户绑定。
当用户有效完成账户绑定后，商户调用本接口，把绑定结果数据通知给支付宝。
####8.1.2  请求样例

注意：https请求实际方式为POST。
```
https://openapi.alipay.com/gateway.do?charset=GBK&biz_content=“biz_content示例”
sign=dsu74et9OXghnarL8VfnJmt/XsgKPwktZ7SolBN2iQZTpBKivS+KYEf66c3up9YA2F9epJ2TO0EEGZQFPfrkpdjT3PrWdcHtPgEb8LUYwXYExA6YSQpygAs8x9BEsYbm5jEQ4tMvrT3kRkNtfAbk+ttbpOw2kiKASHo8yGXnB/Y=&sign_type=RSA&app_id=2013091300001633&method=alipay.mobile.public.account.add&timestamp=2013-10-10 10:10:10
```
biz_content示例（实际赋值时，需去除换行与空格）：
```
{
"displayName":"尾号0088",
"appId":"3424324243",
"realName":"王小毛",
"bindAccountNo":"6226250032060088",
"fromUserId":" aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 "
}
```
####8.1.3  请求参数
表8-1 请求参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| 协议参数 | 
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.account.add。| 不可空 | alipay.mobile.public.account.add | 



表8-2 服务窗账号添加绑定商户会员号biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| displayName | 显示信息 | String | 服务窗账号期望支付宝用户在服务窗账号首页看到的关于该用户的显示信息。最长10个汉字。| 不可空 | 尾号0088 | 
| appId | 服务窗账号ID | String(64) | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。| 不可空 | 2013091300001633 | 
| realName | 真实姓名 | String | 要绑定的商户会员的真实姓名。最长10个汉字。| 可空 | 王小毛 |
| bindAccountNo | 绑定账号 | String(64) | 要绑定的商户会员号。建议在商户的系统中保持唯一性。 | 不可空 | 6226250032060088 | 
| fromUserId | 支付宝用户号 | String | 要绑定的商户会员对应的支付宝用户号，以英文加字母组合的字符串。| 不可空 | aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 | 



参数	参数名称	类型（长度范围）	参数说明	是否可为空	样例

####8.1.4  同步返回参数

表8-3 添加绑定商户会员号返回参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay_mobile_public_account_add_response | 
| code | 结果码 | String | 返回结果码，200为成功，其他为失败，请参见“13.1  业务返回码”。| 不可空 | 200 | 
| msg | 结果信息 | String | 结果信息请参见“13.1  业务返回码”。 | 不可空 | 成功 | 
| agreement_id | 协议号 | String | 协议号是商户会员在支付宝服务窗账号中的唯一标识。只有以下2种情况下不可空：当成功时，即code为200，返回成功的协议号；当重复添加同一个商户会员号时，code为200，此时返回的协议号为该账号之前已经添加的协议号，如果请求的其他会员信息有变更，则会更新但协议号不变。| 可空 | 3214313123131 |
| sign | 签名结果 | String | 支付宝返回的签名结果。目前仅支持RSA方式。 | 不可空 | f3AKCWksumTLzW5Pm38xiP9llqwHptZl9QJQxcm7zRvcXA4g/9tqOxH3Fva5anJyYo4lq5BZ2zdyPrzNR3sooggHzqi645cT85huT6i9KZUdE1M/vl5lyZWTKwmNyZ8dcA9t7y2PSYpyGWaawp82l93tKYiL32KV9S0AhhExXj8= | 

####8.1.5  同步返回样例
*	正常输出：
```
{"alipay_mobile_public_account_add_response":{"agreement_id":"20131017000001476688","code":200,"msg":"成功"},"sign":"f3AKCWksumTLzW5Pm38xiP9llqwHptZl9QJQxcm7zRvcXA4g/9tqOxH3Fva5anJyYo4lq5BZ2zdyPrzNR3sooggHzqi645cT85huT6i9KZUdE1M/vl5lyZWTKwmNyZ8dcA9t7y2PSYpyGWaawp82l93tKYiL32KV9S0AhhExXj8="}
```
*	发生错误时输出：
```
{"alipay_mobile_public_account_add_response":{"code":10013,"msg":"您添加的账户已达上限"},"sign":"WTU3FQRE0Ol6IfjsBQFlvHXY0ai8stWDIvGb84WDtHiG0me7WXA1/7MF5qXOLsIZS9aGCqOvZi6YB4CW+R9UGz+hpAZIFwi2vJH8vRGpXTVy+/Px9H7mNOgqaKmpV1+L2bb8VO7zHuP7MNaetk82obgbPR2aZjOeLzYg9Hie/aE="}
```
###8.2  解除绑定商户会员号
####8.2.1  概述
有以下三种情况会触发解除绑定在支付宝服务窗号的商户会员号：

*	用户在支付宝客户端取消关注某服务窗号，也就是在服务窗账号列表上长按某个服务窗账号，显示出移除按钮，点击移除，此时会把该服务窗账号下所有已绑定的会员账户都解绑；
*	用户在支付宝客户端详细点击某个已绑定的会员账户，点击“解除此账户”；
*	商户系统通过接口方式请求支付宝解除绑定会员号。

前两种是支付宝通知商户服务器调用“4  用户发送消息到商户”接口实现，第三种是商户主动请求支付宝，调用“7  解除绑定商户会员号”接口实现。其中第一种情况下，如果用户有绑定三个商户会员号，那么此时支付宝服务器会发送4次通知（无顺序），这些通知分别是取消关注通知及解除绑定每个商户会员号的通知。

####8.2.2  请求样例
注意：https请求实际方式为POST。
```
https://openapi.alipay.com/gateway.do?charset=GBK&biz_content=“biz_content示例”
sign=dsu74et9OXghnarL8VfnJmt/XsgKPwktZ7SolBN2iQZTpBKivS+KYEf66c3up9YA2F9epJ2TO0EEGZQFPfrkpdjT3PrWdcHtPgEb8LUYwXYExA6YSQpygAs8x9BEsYbm5jEQ4tMvrT3kRkNtfAbk+ttbpOw2kiKASHo8yGXnB/Y=&sign_type=RSA&app_id=2013091300001633&method=alipay.mobile.public.account.delete&timestamp=2013-10-10 10:10:10
```
biz_content示例（实际赋值时，需去除换行与空格）：
```
{
"agreementld":"20131017000001476688",
}
```
####8.2.3  请求参数
表8-4 请求参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| 协议参数 |
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.account.delete | 不可空 | alipay.mobile.public.account.delete | 


表8-5 服务窗账号解除绑定商户会员号biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| agreementId | 协议号 | String(32) | 协议号是商户会员在支付宝服务窗账号中的唯一标识。 | 有一项不可空 | 20131017000001476688 |
| bindAccountNo | 绑定账号 | String(64) | 要绑定的商户会员号。建议在商户的系统中保持唯一性。 | 有一项不可空 | 6226250032060088 | 

####8.2.4  同步返回参数
表8-6 解除绑定商户会员号返回参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay_mobile_public_account_delete_response |
| code | 结果码 | String | 返回结果码，200为成功，其他为失败，请参见“13.1  业务返回码”。 | 不可空 | 200 | 
| msg | 结果信息 | String | 结果信息请参见“13.1  业务返回码”。 | 不可空 | 成功 |
| agreement_id | 协议号 | String | 协议号是商户会员在支付宝服务窗账号中的唯一标识。 | 可空 | 20131017000001476688 | 
| sign | 签名结果 | String | 支付宝返回的签名结果。目前仅支持RSA方式。 | 不可空 | f3AKCWksumTLzW5Pm38xiP9llqwHptZl9QJQxcm7zRvcXA4g/9tqOxH3Fva5anJyYo4lq5BZ2zdyPrzNR3sooggHzqi645cT85huT6i9KZUdE1M/vl5lyZWTKwmNyZ8dcA9t7y2PSYpyGWaawp82l93tKYiL32KV9S0AhhExXj8= | 



####8.2.5  同步返回样例
*	正常输出：
```
{"alipay_mobile_public_account_delete_response":{"agreement_id":"20131017000001476688","code":200,"msg":"成功"},"sign":"f3AKCWksumTLzW5Pm38xiP9llqwHptZl9QJQxcm7zRvcXA4g/9tqOxH3Fva5anJyYo4lq5BZ2zdyPrzNR3sooggHzqi645cT85huT6i9KZUdE1M/vl5lyZWTKwmNyZ8dcA9t7y2PSYpyGWaawp82l93tKYiL32KV9S0AhhExXj8="}
```
*	发生错误时输出：
```
{"alipay_mobile_public_account_add_response":{"code":10019,"msg":"查不到对应的外部账号"},"sign":"WTU3FQRE0Ol6IfjsBQFlvHXY0ai8stWDIvGb84WDtHiG0me7WXA1/7MF5qXOLsIZS9aGCqOvZi6YB4CW+R9UGz+hpAZIFwi2vJH8vRGpXTVy+/Px9H7mNOgqaKmpV1+L2bb8VO7zHuP7MNaetk82obgbPR2aZjOeLzYg9Hie/aE="}
```
###8.3  查询已绑定商户会员号
####8.3.1  概述
当用户成为商户的关注用户后，商户可以通过本接口查询关注者的绑定账户，以便补全异常情况下的单边账户数据。
####8.3.2  请求样例
注意：https请求实际方式为POST。
```
https://openapi.alipay.com/gateway.do?charset=GBK&biz_content=“biz_content示例”
sign=dsu74et9OXghnarL8VfnJmt/XsgKPwktZ7SolBN2iQZTpBKivS+KYEf66c3up9YA2F9epJ2TO0EEGZQFPfrkpdjT3PrWdcHtPgEb8LUYwXYExA6YSQpygAs8x9BEsYbm5jEQ4tMvrT3kRkNtfAbk+ttbpOw2kiKASHo8yGXnB/Y=&sign_type=RSA&app_id=2013091300001633&method=alipay.mobile.public.account.query&timestamp=2013-10-10 10:10:10
```
biz_content示例（实际赋值时，需去除换行与空格）：
```
{
"userId":"aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 "
```
####8.3.3  请求参数
表8-7 请求参数说明


| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| 协议参数 |
| method | 接口名称 | String | 本接口名称：alipay.mobile.public.account.query | 不可空 | alipay.mobile.public.account.query |

表8-8 服务窗账号查询绑定商户会员号biz_content参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| userId | 支付宝用户号 | String | 要查询的关注用户的支付宝用户号，以英文加字母组合的字符串。 | 不可空 | aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 | 

####8.3.4  同步返回参数

表8-9 查询关注者的绑定账户返回参数说明


| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| alipay_mobile_public_account_query_response |
| code | 结果码 | int | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1业务返回码”。 | 不可空 | 200 | 
| msg | 结果信息 | String | 支付宝返回的处理结果说明处理成功：成功；处理失败请参考“13.1业务返回码”。| 不可空 | 成功 | 
| public_bind_accounts | 绑定账户列表 | String | 绑定账户列表，参见“表8-4服务窗账号查询关注用户的绑定账户public_bind_accounts参数说明”。用户可能存在多个绑定账户，本参数可能包含一个或多个账户数据。 | 可空 | 参见“ 8.5同步返回样例 ”的“正常输出” | 
| sign | 签名结果 | String | 支付宝返回的签名结果。目前仅支持RSA方式。 | 不可空 | jrYdAvS1QaMwyy0ChD/Glvm1Ehw4yCmGPsKy8KHbTTghutk0IYXP4hKncjLFPJZkes+KCqkN+6pO/RA2evnwQPjq/WZ15AsdE2hw95c/OAtU6cfJHdl5caaz0m/ScaajN9IzzdDRO0FGXaaqcXnG2Q7+KnEUANeaQTUUpnZvfCE= | 


表8-10 服务窗账号查询关注用户的绑定账户public_bind_accounts参数说明

| 参数 | 参数名称 | 类型（长度范围） | 参数说明 | 是否可为空 | 样例 |
| ------------ | -------------|
| from_user_id | 支付宝用户号 | String | 要查询的关注用户的支付宝用户号，以英文加字母组合的字符串。 | 不可空 | aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01 | 
| app_id | 服务窗账号ID | String | 服务窗账号ID，服务窗账号唯一标识。商户的支付宝应用号，与支付宝签约后自动生成。 | 不可空 | 2013091300001633 | 
| agreement_id | 协议号 | String | 协议号是商户会员在支付宝服务窗账号中的唯一标识。 | 不可空 | 20131017000001476688 | 
| bind_account_no | 绑定账号 | String | 绑定的商户会员号。建议在商户的系统中保持唯一性。 | 不可空 | 6226250032060088 |
| realName | 真实姓名 | String | 绑定的商户会员的真实姓名。最长10个汉字。 | 可空 | 王小毛 |
| display_name | 显示信息 | String | 服务窗账号期望支付宝用户在服务窗账号首页看到的关于该用户的显示信息。最长10个汉字。 | 不可空 | 尾号0088 |

####8.3.5  同步返回样例
*	正常输出：
```
{
    "alipay_mobile_public_account_query_response": {
        "code": 200,
        "msg": "成功",
        "public_bind_accounts": {
            "public_bind_account": [
                {
                    "agreement_id": "20131017000001476688",
                    "app_id": "2013091300001633",
                    "bind_account_no": "6226250032060088",
                    "display_name": "尾号0088",
                    "from_user_id": " aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01  ",
                    "real_name": "王小毛"
                },
                {
                    "agreement_id": "201310170000014760680",
                    "app_id": "2013091300001633",
                    "bind_account_no": "6226250032060129",
                    "display_name": "尾号0129",
                    "from_user_id": " aYMvrMC8+qdi3Mj1lqxRZJPUsrychFTewHXFVXq5ySDxWgIluiZN3K2r70Eebm4r01  ",
                    "real_name": "王小毛"
                }
            ]
        }
    },
    "sign": "jrYdAvS1QaMwyy0ChD/Glvm1Ehw4yCmGPsKy8KHbTTghutk0IYXP4hKncjLFPJZkes+KCqkN+6pO/RA2evnwQPjq/WZ15AsdE2hw95c/OAtU6cfJHdl5caaz0m/ScaajN9IzzdDRO0FGXaaqcXnG2Q7+KnEUANeaQTUUpnZvfCE="
}
```
*	发生错误时输出：
```
{
    "alipay_mobile_public_account_query_response": {
        "code":10021,
         "msg":"禁止查询非关注用户的绑定账户列表"
    },
    "sign": "sux0vWT63IQk0V+SXE8PmR3q4iF9ScHpcddjvHIiBd9x8uB4ulgJtnE59DDIvx+qlW1fyV2TOgv7YdbxWmQ1IYCwx4gP1uDjMsisS9iasYayKc1fFUbQf+GDfJwWqStonjAb1JM3BB8aMBexf1Ppde8++UOgV0oHHgXZEJRAAIw="
}
```

##9  签名机制
###9.1  请求签名
####9.1.1  生成请求签名字符串
 1. 参与签名的参数
在商户向支付宝发起请求的接口的请求参数列表中，除去sign参数外，其他需要使用到的参数皆是要签名的参数，包含参数sign_type。
 2. 生成待签名字符串
对于如下的参数数组：
```
string[] parameters={
    "method=alipay.mobile.public.platform",
    "app_id=2013080800008888",
    "charset=GBK",
    "biz_content=XXXXX",
    "sign_type=RSA"
};
```
对数组里的每一个值从a到z的顺序排序，若遇到相同首字母，则看第二个字母，以此类推。
排序完成之后，再把所有数组值以“&”字符连接起来，如：
```
appid=2013080800008888&biz_content=XXXXX&charset=gbk&method=alipay.mobile.public.platform&sign_type=RSA
```
这串字符串便是待签名字符串。

#### 注意：
*	没有值的参数无需传递，也无需包含到待签名数据中；
*	签名时将字符转化成字节流时指定的字符集与charset保持一致；
*	如果传递了charset参数，这个参数也该包含在待签名数据中；
*	根据HTTP协议要求，传递参数的值中如果存在特殊字符（如：&、@等），那么该值需要做URL Encoding，这样请求接收方才能接收到正确的参数值。这种情况下，待签名数据应该是原始值而不是encoding之后的值。例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@msn.com，而不是email=test%40msn.com。

####9.1.2  签名
用待签名字符串和商户的RSA私钥生成签名串（sign）。
###9.2  同步返回验签
####9.2.1  生成同步返回验签字符串
1. XML格式
在XML返回参数列表中，如果节点中存在sign，则此次的返回数据支持做验签，不存在则不支持验签。
在XML返回参数列表中，在根节点下面除去sign节点（含节点名、节点值）外，其他所有数据以字符串形式作为要参与验签的字符串。
如下为同步返回的结果数据：
```
<?xml version="1.0" encoding="UTF-8" ?><alipay_mobile_public_menu_add_response><code>11013</code><msg>菜单已经创建过</msg><sign>qMElgrHEhqwnjIIuz/awQcnNZbPmuSjPKXuFhe3C55gedUzRBAJPuhjB49Qu7QoqnQNCgvYTD/Tw5p0XGhHRzPVl3rxhv9is+ndSKgIW16uhibK8pbjn4aNFogpPIA/KNsTanQGJkl30PkOLKxTwspaC8HlDiiaeNsFeVGVyFio=</sign></alipay_mobile_public_menu_add_response>
```
那么要验签的字符串是：
```
<code>11013</code><msg>菜单已经创建过</msg>
```
以上的各个节点需事先按照字母a到z的顺序排序。
2. JSON格式
在JSON返回参数列表中，如果节点中存在sign，则此次的返回数据支持做验签，不存在则不支持验签。
在JSON返回参数列表中，在根节点下面除去sign节点（含节点名、节点值）外，其他所有数据以字符串形式作为要参与验签的字符串。
如下为同步返回的结果数据：
```
{"alipay_mobile_public_menu_add_response":{"code":11013,"msg":"菜单已经创建过"},"sign":"SFIJp0ZUTrjymCGTfLnfsGBh8objZgCEF1HsDvofpCjCZmTAnuuz/x8rRKiEEtnfipp0XHGpGRykMEzCvaJ6jt+FkAFiU0WCQAhXQFMX62tDCAqWu2RsKJVYeoJf1ApZESbIxAz0GE6WOwDFXQSHlCastLt30Lt4s9+vhiF7cHk="}
```
那么要验签的字符串是：
```
{"code":11013,"msg":"菜单已经创建过"}
```
包含符号，如双引号（"）、大括号（{、}）、逗号（,）、分号（:）。
以上的各个节点需事先按照字母a到z的顺序排序。
####9.2.2  验签
用待签名字符串和支付宝RSA公钥对签名串（sign）进行验证。通过则进行后续业务处理。
###9.3  商户获得用户发送消息的验签
支付宝调用“4  用户发送消息到商户”接口，把数据请求给商户时，商户需先做验签，再做业务逻辑处理。
####9.3.1  生成验签字符串
1. 参与验签的参数
在用户发送消息到商户的参数列表中，除去sign参数外，凡是通知返回回来的参数皆是要签名的参数，包含参数sign_type。
2. 生成待验签字符串
对于如下的参数数组：
```
https://商户服务端网关地址/gateway.do?sign=SKlbQBMz7ImtuU0dvTvYybMI+jRu2hvM9RXHcs4/OoDEQmYzr6vX7X8RH70YV4bcd8aHLF132GGZYteYGAdD+ntBajD4UdjaHXDJOOtz2Pt7vO6SST37NIyrlqDEzMdsY6yBH5SCTwg7bA3oj1kpAxYIs0iLqPk8h98PLssbpAs=&biz_content=XXXXXXX&sign_type=RSA&method=alipay.mobile.public.message.notify&charset=GBK
```
对数组里的每一个值从a到z的顺序排序，若遇到相同首字母，则看第二个字母，以此类推。
排序完成之后，再把所有数组值以“&”字符连接起来，如：
```
biz_content=XXXXXXX&charset=GBK&method=alipay.mobile.public.message.notify&sign_type=RSA
```
这串字符串便是待签名字符串。
####   注意：
*	没有值的参数无需传递，也无需包含到待签名数据中；
*	签名时将字符转化成字节流时指定的字符集与charset保持一致；
*	如果传递了charset参数，这个参数也该包含在待签名数据中；
*	根据HTTP协议要求，传递参数的值中如果存在特殊字符（如：&、@等），那么该值需要做URL Encoding，这样请求接收方才能接收到正确的参数值。这种情况下，待签名数据应该是原始值而不是encoding之后的值。例如：调用某接口需要对请求参数email进行数字签名，那么待签名数据应该是email=test@msn.com，而不是email=test%40msn.com。

####9.3.2  验签
用待签名字符串和支付宝RSA公钥对签名串（sign）进行验证。通过则进行后续业务处理。
##10  附录
###10.1  业务返回码
表10-1 业务返回码

| 返回码 | 含义 |
| ------------ | -------------| 
| 200 | 成功 | 
| 503 | 系统错误 |
| 1001 | 无效的业务参数 |
| 1002 | 无效的业务行为 |
| 1003 | 解析XML/JSON出错 |
| 2001 | 服务窗账号信息不存在 |
| 2002 | 服务窗账号暂不能提供服务 |
| 11001 | 菜单解析格式错误 |
| 11002 | 菜单没有内容 |
| 11003 | 一级菜单标题超出长度 |
| 11004 | 二级菜单标题超出长度 |
| 11005 | 一级菜单超出个数 |
| 11006 | 二级菜单超出个数 |
| 11007 | 菜单标题为空 |
| 11008 | 菜单超出2级 |
| 11009 | 菜单标题为空 |
| 11010 | 菜单type不在支持范围内 |
| 11011 | 无效的关注关系 |
| 11012 | 推送消息失败 |
| 11013 | 菜单已经创建过 |
| 11014 | 菜单actionParam不能为空 |
| 12001 | 服务窗账号与消息体内不一致 |
| 10001 | 绑定商户会员号解析格式错误 |
| 10002 | 关注者fromUserId不能为空 |
| 10004 | 绑定商户会员号不能为空 |
| 10005 | 展示名displayName为空 |
| 10006 | 展示名displayName超出长度 |
| 10007 | realName超出长度 |
| 10011 | 添加商户会员号业务中的服务窗账号与消息头服务窗账号不一致 |
| 10013 | 您添加的账户已达上限 |
| 10014 | 添加绑定商户会员号失败 |
| 10015 | 移除绑定商户会员号失败 |
| 10016 | 禁止移除其它服务窗号的绑定商户会员号 |
| 10017 | 禁止移除其它支付宝用户的绑定商户会员号 |
| 10019 | 移除外部户时参数信息不够：agreementId为空时，bindAccountNo和fromUserId均不能为空 |
| 10020 | 根据bindAccountNo、fromUserId和appId查不到对应的外部账号 |
| 10021 | 禁止查询非关注用户的绑定账户列表 |
| 13001 | 查询用户地理位置信息失败 |
| 13002 | 服务窗号没有查询用户地理位置信息的权限 |
| 13003 | 禁止查询非关注用户的地理位置信息 |
| 13004 | 用户地理位置信息不存在 |


###10.2  安全机制错误码
表10-2 安全机制错误码


| Code(错误代码）| (msg)错误代码描述 |	sub_code（明细错误码） | sub_msg（明细错误码描述） |
| ------------ | -------------| 
| 40001	| Missing Required Arguments | isv.missing-method | 缺少方法名参数 |
| 40002 | Invalid Arguments	| isv.invalid-method | 不存在的方法名 |
| 40002	| Invalid Arguments	| isv.invalid-format | 无效数据格式 |
| 40001	| Missing Required Arguments | isv.missing-signature | 缺少签名参数 |
| 40001	| Missing Required Arguments |	isv.missing-signature-type | 缺少签名类型参数 |
| 40001	| Missing Required Arguments |	isv.missing-signature-key | 缺少签名配置（未提供公钥） |
| 40002	| Invalid Arguments |	isv.invalid-signature |无效签名 |
| 40002	| Invalid Arguments	| isv.invalid-signature-type | 无效签名类型 |
| 40001	| Missing Required Arguments |	isv.missing-app-id | 缺少AppID参数 |
| 40002	| Invalid Arguments |	isv.invalid-app-id | 无效的AppID参数 |
| 40001	| Missing Required Arguments |	isv.missing-timestamp | 缺少时间戳参数 |
| 40002	| Invalid Arguments |	isv.invalid-timestamp | 非法的时间戳参数 |
| 40002	| Invalid Arguments |	Isv.invalid-charset | 字符集错误 |
| 40003	| invalid-app-state	| Isv.invalid-app-state | 应用状态不满足条件 |
| 20001	| Insufficient Token Permissions |	invalid-auth-token | 无效的访问令牌 |
| 20001	| Insufficient Token Permissions |	aop.auth-token-time-out | 访问令牌已过期 |
| 20000	| Service Currently Unavailable |	aop.unknow-error | 系统繁忙 |
| 20000	| Service Currently Unavailable	| isp.unknow-error | 系统繁忙 |

###10.3  安全机制异常同步返回参数
当商户通过接口请求支付宝，支付宝同步返回参数时，如果支付宝在安全机制环节校验不通过，则返回安全机制异常参数信息，而不会返回本文档中其他章节的同步返回参数。
####10.3.1  安全机制异常同步返回参数列表

表10-3 安全机制异常同步返回参数列表

| 参数 | 参数名称 |	类型（长度范围） |	参数说明 |	是否可为空 | 样例 |
| ------------ | -------------| 
| error_response | 
| code | 返回码 | String | 支付宝返回的处理结果代码。处理成功：200；处理失败：请参考“13.1 业务返回码”。 | 不可空 | 200 |
| msg | 含义 | String | 支付宝返回的处理结果说明。处理成功：success；处理失败：请参考“13.1  业务返回码”。 | 不可空 | success |
| sub_code | 明细错误码 | String | 支付宝返回的详细错误码，请参考“13.2  安全机制错误码”。 | 不可空 |	isv.invalid-app-id |
| sub_msg |	明细错误描述 | String | 支付宝返回的详细错误描述信息，请参考“13.2  安全机制错误码”。 | 不可空 |	无效的AppID参数 |

####10.3.2  同步返回参数样例
```
{"error_response":{"code":"40002","msg":"Invalid Arguments","sub_code":"isv.invalid-app-id","sub_msg":"无效的AppID参数"}}
```
###10.4  服务窗账号信息设置规格
1. 服务窗账号LOGO大小
640px*640px，200k以下，png格式。
2. 背景图片
800px*400px，300k以下，png格式。
3. 服务窗名称
最长20个汉字，一个汉字2个英文字母。
4. 背景分割线颜色
须是RGB16进制格式，例如：FFFFFF。
5. 欢迎语
关注之后自动发送给用户的欢迎词，例如欢迎关注XXX服务窗账号。50个字上限。
6. 服务窗账号服务简介
服务窗账号品牌及服务介绍，100字以内。
7. 菜单
	一级菜单上限4个。该菜单总数是预设菜单、接口创建菜单、服务窗账号平台创建菜单的总数。
	一级菜单最多4个汉字，一个汉字2个英文字母。
	二级菜单最多12个汉字，一个汉字2个英文字母。
8. 图文消息
	字数限制：55个汉字以内，一个汉字2个英文字母。
	图片格式：540px*270px，200k以内，支持jpeg、jpg、png。
	


































 
 







