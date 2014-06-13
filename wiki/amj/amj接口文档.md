# AMJ接口文档
- pubdate: 2014-03-06
- tags: 关于
- author: 仈爪

---
## 基础类
---
### ~~touch~~
### ~~support~~


## 工具类 utils
---
### getCharLength
m.utils.getCharLength (*string str)

_获取字符串的字数长度， **中文算两个字**_


| 参数 | 描述 |
| -------- | -------- |
| str   | 必须。需要计算的字符串。|

**返回值:** int类型，指定字符串的长度

**Example:**

```
m.utils.getCharLength("getCharLength,测试获取文字长度")

// 返回值：30
```


### subChar
m.utils.subChar (*string str, *int len, [*boolean hasDot])

_从字符串头部开始截取指定字数长度的字符串， **中文算两个**，可选：自动追加省略号。_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| str | string | 必须。被截取的字符串。|
| len | int | 必须。指定需要截取的字符串长度。|
| hasDot | boolean | 可选。成功截取后是否需要自动追加省略号。|

**返回值:** string类型，一个新的字符串

**Example:**

```
m.utils.subChar("subChar,测试截取文字长度",14,true)

// 返回值："subChar,测试截..."
```


### dateFormatter
m.utils.dateFormatter (*Date date, *string formatter)

_将Date类型格式化为指定格式的字符串_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| date | Date | 必须。需要格式化的Date变量。|
| formatter | string | 必须。格式化规则。|


**返回值:** string类型，一个指定格式的时间字符串

**Example:**

```
m.utils.dateFormatter(new Date(),"yyyy-MM-dd hh:mm:ss")

// 返回值："2014-03-07 10:27:00"
```

### getQueryString
m.utils.getQueryString (*string key)

_获取当前网址内包含的指定参数值_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| key | string | 必须。需要获取的参数名称。|



**返回值:** string类型，指定Url参数的值

**Example:**

```
// 页面URL：http://www.alipay.com/?id=1&token=JFI31FD

m.utils.getQueryString ("id")
// 返回值：'1'

m.utils.getQueryString ("token")
// 返回值：'JFI31FD'

```

### moneyFormat
m.utils.moneyFormat (*Number money)

_将一个Number类型的金额，格式化为每隔3位插入一个逗号的格式_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| money | Number | 必须。需要格式化的金额|

**返回值:** string类型，一个指定格式的时间字符串

**Example:**

```
m.utils.moneyFormat(58339191.8357)

// 返回值："58,339,191.8357"
```

### calculate.add
m.utils.calculate.add (*float arg1, *float arg2)

_修复原生浮点数相加计算不精确的bug_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| arg1 | float | 必须。需要相加的第一个浮点数。|
| arg2 | float | 必须。需要相加的第二个浮点数。|


**返回值:** Number类型，相加计算后的数值

**Example:**

```
m.utils.calculate.add (*float arg1, *float arg2)
```

### calculate.sub
m.utils.calculate.sub (*float arg1, *float arg2)

_修复原生浮点数相减计算不精确的bug_

| 参数 | 类型 |描述 |
| --- | --- | --- |
| arg1 | float | 必须。需要相加的第一个浮点数。|
| arg2 | float | 必须。需要相加的第二个浮点数。|


**返回值:** Number类型，相减计算后的数值

**Example:**

```
m.utils.calculate.sub (*float arg1, *float arg2)
```



## 功能类
---
### storage
### ajaxCache
### ~~lazyImg~~


## 模拟控件类
---
### overlay
### sheet
### ~~dialog~~
### ~~toast~~
### ~~loading~~
### ~~keyboard~~
