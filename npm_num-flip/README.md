# num-flip-animation-ie10

基于number-flip-animation更新，兼容IE10+

## 安装

```bash
npm install num-flip-animation-ie10
```

## 基本使用
### vue
```javascript
import { NumberFlip } from 'num-flip-animation-ie10';
import 'num-flip-animation-ie10/dist/number-flip.css'

const numberFlip = new NumberFlip({
    rootElement: document.getElementById('number-flip');//需要滚动的容器
    initialNumber：123 //初始滚动数字
});

numberFlip.setNumber(newNumber);
```
### js
```javascript
const numberFlip = new NumberFlip({
    rootElement: document.getElementById('number-flip');//需要滚动的容器
    initialNumber：123 //初始滚动数字
});

numberFlip.setNumber(newNumber);

```

## Options

The constructor of the `NumberFlip` class accepts an object with the following properties.  

| Option                                | Description                                                                                                                                                                                                               | Default                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **`rootElement`** (required)          | An HTMLElement in which the number will be rendered in.                                                                                                                                                                   | `null`                             |
| **`durationSlide`** (optional)        | The duration in milliseconds for the sliding animation from one number to the next.                                                                                                                                       | `1000`                             |
| **`durationFade`** (optional)         | The duration in milliseconds for the fade out animation when a digit is removed from the number. Digits are removed in the case when the new number being changed to has fewer digits than the number being changed from. | `200`                              |
| **`initialNumber`** (optional)        | The number which will be displayed when the NumberFlip instance is created.                                                                                                                                               | `null`                             |
| **`animateInitialNumber`** (optional) | Whether the initial number should be animated or not.                                                                                                                                                                     | `true`                             |
| **`decimalSeparator`** (optional)     | The decimal separator which should be used when decimal numbers are being displayed.                                                                                                                                      | `.`                                |
| **`wrapperClassname`** (optional)     | The css classname for the wrapper element which contains all the digits. If this is being changed from the default, the classes in the css file need to be changed accordingly.                                           | `numberflip-digit-container`       |
| **`digitClassname`** (optional)       | The css classname for the elements of each individual digit. If this is being changed from the default, the classes in the css file need to be changed accordingly.                                                       | `numberflip-digit-container-value` |