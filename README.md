## nextjs 自定义 document

-   作用

    -   只有在服务端渲染的时候才会被调用
    -   用来修改服务端渲染的文档内容
    -   一般用来配合第三方 css in js 使用

-   写法

```js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    // 如果要覆盖document的getInitalProps方法，需要至少执行以下代码

    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return { ...initialProps };
    // }

    render() {
        return (
            <Html>
                <Head>
                    <style>{`.test { color: red }`}</style>
                </Head>
                <body className="test">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
export default MyDocument;
```
