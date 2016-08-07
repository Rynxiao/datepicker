# datepicker
日历组件

---------------------
**个人娱乐所写,分为普通js方式以及react组件形式**

支持功能：

1. 初始化日期
2. 高亮'今天'以及选择日期
3. 历史记录选择日期
4. 支持tag标识
5. 支持选择日期回调
6. 屏幕适应

---------------------

## react 调用方式

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';

const App = React.createClass({
    render() {
        return (
            <Calendar onSelectDate={this.selectDate} 
                year='2016' 
                month='8' 
                day='7' 
                tags={[5, 22]} />
        );
    }
});

export default App;
```

## 效果

手机效果

![mobile](./1.png)

其他效果

![other](./2.png)
