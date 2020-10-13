## 页面整体布局 layout 组件的开发

```jsx
import { useState, useCallback } from "react";
import { Button, Layout, Icon, Input, Avatar } from "antd";
import { GithubFilled } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const githubIconStyle = {
    color: "white",
    display: "block",
    fontSize: "40px",
    paddingTop: 10,
    marginRight: 20,
};
const LayoutComp = ({ children }) => {
    const [search, setSearch] = useState("");
    const handleSearchChange = useCallback(
        (event) => {
            setSearch(event.target.value);
        },
        [setSearch]
    );

    const handleOnSearch = useCallback(() => {}, []);

    return (
        <Layout>
            <Header>
                <div className="header-inner">
                    <div className="header-left">
                        <div className="logo">
                            <GithubFilled style={githubIconStyle} />
                        </div>
                        <div>
                            <Input.Search
                                placeholder="搜索仓库"
                                value={search}
                                onChange={handleSearchChange}
                                onSearch={handleOnSearch}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            <Avatar size={40}>USER</Avatar>
                        </div>
                    </div>
                </div>
            </Header>
            <Content>{children}</Content>
            <Footer style={{ textAlign: "center" }}>imooc lesson</Footer>
            <style jsx>{`
                .header-inner {
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: flex-start;
                }
            `}</style>
            <style jsx global>{`
                #__next {
                    height: 100%;
                }
                .ant-layout {
                    height: 100%;
                }
            `}</style>
        </Layout>
    );
};
export default LayoutComp;
```

-   安装 vscode-styled-jsx 高亮 style jsx 代码
