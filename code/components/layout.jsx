import { useState, useCallback } from 'react';
import { Button, Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';
import Container from './container'
import getConfig from 'next/config'
import axios from 'axios';
import { logout } from '../store/store';
import { withRouter } from 'next/router'
const { publicRuntimeConfig } = getConfig()

const { Header, Content, Footer } = Layout

const githubIconStyle = {
    color: 'white',
    display: 'block',
    fontSize: '40px',
    paddingTop: 10,
    marginRight: 20
}


const LayoutComp = ({ children, user, logout, router }) => {
    const urlQuery = router.query && router.query.query || ''

    const [search, setSearch] = useState(urlQuery)

    const handleSearchChange = useCallback((event) => {
        setSearch(event.target.value)
    }, [setSearch])

    const handleOnSearch = useCallback(() => {
        router.push(`/search?query=${search}`)
    }, [search])

    const handleLogout = useCallback((e) => {
        e.preventDefault()
        logout()
    }, [logout])

    const handleGotoOAuth = useCallback((e) => {
        e.preventDefault()
        axios.get(`/prepare-auth?url=${router.asPath}`).then((resp) => {
            if (resp.status === 200) {
                location.href = publicRuntimeConfig.OAUTH_URL
            } else {
                console.log('prepare auth failed', resp);
            }
        }).catch(err => {
            console.log('prepare auth failed', err);
        })
    }, [])

    const userDropdown = (
        <Menu>
            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    登 出
                </a>
            </Menu.Item>
        </Menu>
    ) 
    
    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
                    <div className="header-left">
                        <div className="logo">
                            <Link href="/">
                                <GithubFilled style={githubIconStyle} />
                            </Link>
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
                                        <Avatar size={40} src={user.avatar_url}></Avatar>
                                    </Dropdown>
                                ) : (
                                    <Tooltip title="点击进行登录">
                                        <a href={`/prepare-auth?url=${router.asPath}`}>
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
                    min-height: 100%;
                }
                .ant-layout-header{
                    padding-left: 0;
                    padding-right: 0;
                }
                .ant-layout-content{
                    background: #fff;
                }
            `}</style>
        </Layout>
    )
}
export default withRouter(connect(function mapState(state) {
    return {
        user: state.user
    }
}, function mapReducer(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
})(LayoutComp))