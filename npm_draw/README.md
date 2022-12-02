# 九宫格抽奖

## 使用：

##### 安装

<pre>
    <code>
        npm install foxit_lucky_draw -s
    </code>
</pre>

##### 导入

<pre>
    <code>
        import Foxit_lucky_draw from "foxit_lucky_draw"
    </code>
</pre>

##### 用法

```
<gridRoll
    :luckDraw="fun"
    :prizeId="prizeId"
    :usableNum="usableNum"
    :getPrizeList="prizeList"
    @getResult="getResult"
    @getResultErr="getResultErr"
/>
```


# 配置参数

参数  | 类型 | 说明
------------- | ------------- |-------------
luckDraw  | Function() | 执行抽奖动作的方法
prizeId  | Number or String | 中奖礼品的key
usableNum  | Number | 用户抽奖次数
getPrizeList  | Function() | 获取奖品列表的方法
getResult  | Function() | 抽奖完成后的回调
getResultErr  | Function() | 抽奖失败的回调


# 例子

<pre>
    <code>
        静态数据例子

        Function(){
            return {}//返回一个对象
        }

        ...

        eg：
        奖品列表
        function getPrizeList(){
            return {
                id: 1//奖品id
                imgUrl: "xxx.png"//奖品图片地址
                name: "xxx"//奖品名称
            }
        }
        ...
    </code>
</pre>