## nextjs集成antd


- yarn add antd

- yarn add babel-plugin-import 

```js
babel-plugin-import 这个插件的作用是按需加载

例如： 
import {Button} from 'antd';

==>
import Button from 'antd/lib/button';

```

- 配置.babelrc

```js
{
    'presets': ['next/babel'],
    'plugins': [
        [
            "import",
            {
                "libraryName": "antd"
            }
        ]
    ]
}
```

- 这时候只加载了dom结构，并没有引入antd的css

- 全局加载antd的css

```js

// 这里为什么把所有css都引入了，是因为webpack打包时会出现bug
// https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250

import 'antd/dist/antd.css'
```
