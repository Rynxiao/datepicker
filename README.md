## datepicker

之前版本，可查看`tag` v1.0.0

```shell
$ git clone https://github.com/Rynxiao/datepicker.git
$ git tag
$ git checkout v1.0.0
```
## 重构之后版本 

样式没有采用预处理器，而是使用`CSS Modules`，部分布局采用的是`CSS Grid`布局，因此在兼容性上请使用比较新的浏览器

关于`CSS Modules`以及`CSS Grid`可以查看我之前的两篇文章：

- [CSS Modules入门教程](https://www.cnblogs.com/rynxiao/p/9538058.html)
- [CSS Grid 读书笔记](https://www.cnblogs.com/rynxiao/p/9674944.html)

### UI

参照 `Ant Design`，功能有所缩减

### 效果图

![datepicker](./docs/datepicker.gif)

### 支持功能

- [x] line模式
- [x] 禁止选择模式
- [x] 设置禁用起始日期以及结束日期
- [x] 基本选择日期功能
- [x] 年模式
- [x] 月模式

### 基本用法

```javascript
// install package
npm install rt-datepicker@lastest
yarn add rt-datepicker@lastest

// datepicker
import DatePicker from 'rt-datepicker'

<DatePicker onSelectDate={day => console.log(day)} />

// inline
<DatePicker
  inline
  onSelectDate={day => console.log(day)}
/>

// default
<DatePicker
  defaultDate="2018-01-31"
  onSelectDate={day => console.log(day)}
/>

// placeholder
<DatePicker
  placeholder="please choose date"
  onSelectDate={day => console.log(day)}
/>

// disable
<DatePicker
  disable
  onSelectDate={day => console.log(day)}
/>

// disabale date
const disabledDate = current => (
  // start & end
  ['2018-01-02', current]

  // end
  // [current]
)

<DatePicker
  disabledDate={current => disabledDate(current)}
  onSelectDate={day => console.log(day)}
/>

// monthpicker
import DatePicker from 'rt-datepicker'
const { MonthPicker } = DatePicker

<MonthPicker
  disable
  inline
  placeholder="Select month"
  year="2018"
  month="01"
  onSelectMonth={month => console.log(month)}
/>
```

### 属性列表

`DatePicker`

属性 | 类型 | 释义
---|---|---
inline | string | 是否行展示
disable | bool | 禁止选择
disabledDate | func | 禁止选择日期的区间(返回一个数组)
defaultDate | string | 默认日期
placeholder | string | placeholder
onSelectDate | func | 选择日期后的回调

`MonthPicker`

属性 | 类型 | 释义
---|---|---
inline | string | 是否行展示
disable | bool | 禁止选择
year | string | 默认年份
month | string | 默认月份
placeholder | string | placeholder
onSelectMonth | func | 选择月份后的回调

### node及npm版本

```shell
$ node -v 
v8.11.3

$ npm -v
v5.6.0

$ yarn -v
1.7.0
```

### react版本

```shell
react v16.5.2
```

### 开发模式

```shell
yarn install
yarn start:dev
```

### 生产模式

```shell
yarn build
```




