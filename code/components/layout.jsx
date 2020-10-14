import { useState, useCallback } from 'react';
import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';
import Container from './container'

import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const {Header, Content, Footer} = Layout

const githubIconStyle = {
    color: 'white',
    display: 'block',
    fontSize: '40px',
    paddingTop: 10,
    marginRight: 20
}

const userDropdown = (
    <Menu>
        <Menu.Item>
            <a href="#" onClick={(e) => { e.preventDefault() }}>
                登 出
            </a>
        </Menu.Item>
    </Menu>
) 

const LayoutComp = ({ children, user }) => {
    const [search, setSearch] = useState('')
    const handleSearchChange = useCallback((event) => {
        setSearch(event.target.value)
    }, [setSearch])

    const handleOnSearch = useCallback(() => {}, [])

    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
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
                            {
                                user && user.id ? 
                                (
                                    <Dropdown overlay={userDropdown}>
                                        <a href='/'>
                                            <Avatar size={40} src={user.avatar_url}></Avatar>
                                        </a>
                                    </Dropdown>
                                    
                                ) : (
                                    <Tooltip title="点击进行登录">
                                        <a href={publicRuntimeConfig.OAUTH_URL}>
                                            <Avatar size={40}>USER</Avatar>
                                        </a>
                                    </Tooltip>
                                   
                                )
                            }
                        </div>
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>
                    {children}
                </Container>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                imooc lesson
            </Footer>
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
                .ant-layout-header{
                    padding-left: 0;
                    padding-right: 0;
                }
            `}</style>
        </Layout>
    )
}
export default connect(function mapState(state) {
    return {
        user: state.user
    }
})(LayoutComp)