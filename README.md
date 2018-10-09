## datepicker

之前版本，可查看`tag` v1.0.0

```shell
$ git clone https://github.com/Rynxiao/datepicker.git
$ git tag
$ git checkout v1.0.0
```
## 重构之后版本 

`tag` v2.0.0（目前在master上开发，待基本功能完善推到此TAG）

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
// datepicker

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




