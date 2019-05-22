# Jshop小程序uniapp前台简约模板

#### 介绍

当前版本已支持可视化操作首页

uni-app简约前台H5+小程序模板，全新UI设计，更多交互细节，我们倾尽全力为您提供更加流畅舒爽的体验。

增加对支付宝小程序、APP的支持，实现一个后台，管理5个前端。

同时又实现了一套前端代码，发布多个平台，为您的业务可以提供更加强有力的支撑！



#### Jshop小程序商城介绍
Jshop小程序商城，是一款开源的电商系统，包含微信小程序和H5端，为大中小企业提供移动电子商务优秀的解决方案。

后台采用Thinkphp5.1框架开发，执行效率、扩展性、稳定性值得信赖。并且Jshop小程序商城上手难度低，可大量节省定制化开发周期。

前台H5使用Vue开发，在页面的打开和渲染效率上更快，下单流程流畅自然，可大大增加用户体验，提升订单量。

强大的促销引擎，多种促销方式自由搭配，满足各种场景的促销方式需求，做活动更灵活简单，并且在促销的扩展上也非常方便。



#### 关于开源

这不是一款免费的系统，商用记得授权哦。

之所以不彻底免费，一方面是可以让我们有持续维护下去的动力和资源，另外一方面也是不想让您有后顾之忧，避免后期尴尬。

我们的团队水平有限，也是在探索中学习，在改进。之所以开源，就是为了方便大家，也是为了提升下该项目的质量，我们相信有您的参与，可以使我们的系统更加完善和健壮。



#### 功能介绍

 + 商品管理，单规格、多规格商品管理，品牌、分类管理、商品评价
 + 订单管理，订单支付、发货、取消、售后等
 + 会员管理，会员列表，消息管理等
 + 运营管理，广告管理、文章管理
 + 微信管理，小程序管理、微信公众号管理、模板列表、公众号菜单管理
 + 促销管理，商品促销、订单促销、优惠券、团购秒杀
 + 财务管理，支付单、退款单管理、提现管理、账户资金管理
 + 控制面板，计划任务、插件、图片、地区、消息、店铺配置、支付方式、配送方式、物流公司管理。信任登录插件、阿里云OSS插件、阿里云短信插件、微信消息模板插件、分销功能
 + 门店管理，门店列表。门店核销、店员管理、提货单管理。
 + 智能表单，表单列表、表单统计、表单提交管理、表单小程序码等
 + 统计报表，商品销量统计、财务收款统计、订单销量统计
 + 页面管理，布局管理，页面可视化操作

#### 项目演示
- H5体验地址：https://demo.jihainet.com/wap/
- 后台项目地址：https://gitee.com/hnjihai/jshop_mall
- QQ交流群：823732583（开发手册、接口文档、操作手册请进群查看哦~）
- 交流社区：[https://bbs.jihainet.com/](https://bbs.jihainet.com/)
- H5体验二维码

![输入图片说明](https://gitee.com/uploads/images/2019/0426/090608_1a1f0073_8503.png "H5.png")

- APP体验二维码

![输入图片说明](https://gitee.com/uploads/images/2019/0426/090622_d1d4b372_8503.png "app.png")

- 微信小程序体验码

![输入图片说明](https://gitee.com/uploads/images/2019/0426/082533_e2f315f9_8503.jpeg "gh_f9fafa5a7066_344.jpg")


#### 项目截图
![输入图片说明](https://gitee.com/uploads/images/2019/0404/180847_9615f414_8503.png "未标题-1.png")

#### 目录结构


初始的目录结构如下：
~~~
wap  WEB部署目录（或者子目录）
├─components            uniapp组件目录
├─pages			应用页面
│  ├─article            文章相关页面
│  ├─cart               购物车相关页面
│  ├─classify           分类以及商品列表页面
│  ├─goods		商品详情页等相关页面
│  ├─index              首页以及搜索页
│  ├─login		登录相关页面
│  ├─member             会员中心相关页面
│
├─config                配置文件目录
├─static                静态文件目录
├─unpackage             编译后目录
├─index.html            入口文件模板
~~~
#### 更新说明
2019-04-25 v1.0.3
1. 修复海报生成
2. 修复支付宝支付问题
3. 微信授权登录修复
4. 修复app登录返回问题
5. 修复支付宝绑定账户时短信验证码ip问题


#### 安装教程

1. 小程序发布教程
具体配置稍后提供
开发相关介绍：https://uniapp.dcloud.io/

2. H5发布教程
具体配置稍后提供
开发相关开发介绍：https://uniapp.dcloud.io/

## 配置
### 服务器地址
config/config.js中
```
export const baseUrl = 'http://www.b2c.com/';//注意最后斜杠,填写你的域名地址
export const entId = '';//客服ID	在https://www.jihainet.com中找客服开通

```

### 海报H5中保存图片跨域
nginx中添加以下配置
```
    location ~ .*\.(gif|jpg|jpeg|png)$ {
      add_header Access-Control-Allow-Origin *;
      add_header Access-Control-Allow-Headers X-Requested-With;
      add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
    }
```


#### 安全&缺陷
如果你发现了一个安全漏洞或缺陷，请发送邮件到 jima@jihainet.com。所有的安全漏洞都将及时得到解决。


#### License

Jshop小程序商城遵循JPPL（吉海科技Jshop系列付费产品许可）协议。

本项目包含的第三方源码和二进制文件之版权信息另行标注。

版权所有Copyright © 2019 by 吉海科技 (https://www.jihainet.com)

All rights reserved。

吉海科技Jshop系列付费产品许可协议详情请参阅 [LICENSE.txt](LICENSE.txt)