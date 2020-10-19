## 8-2.展示用户数据以及用户登出时的内容

### 问题：

因为当用户登出时，会修改全局 store 里的数据，不会触发 getInitialProps 方法，所以不能从 getInitialProps 返回的数据。

### 解决方案：

需要通过 connect 来连接 store，直接通过 store 中值的变化来重新渲染组件。

### 代码：

```jsx
// 详细看index.js
```
