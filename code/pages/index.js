import Link from 'next/link'
import api from '../lib/api'

import { Button, Tabs } from 'antd'
import { MailOutlined } from '@ant-design/icons';

import getConfig from 'next/config'
import { connect } from 'react-redux';
import Repo from '../components/Repo'
import { withRouter, useRouter } from 'next/router'

const { TabPane } = Tabs;
const { publicRuntimeConfig } = getConfig()
const isServer = typeof window === 'undefined'

const Index = ({ userRepos, userStaredRepos, isLogin, user, router }) => {
    const tabKey = router.query.key || '1';

    const nextRouter = useRouter()

    const handleTabChange = (activeKey) => {
        nextRouter.push(`/?key=${activeKey}`)
    }

    if (!(user && user.id)) {
        return (
            <div className="root">
                <p>亲，你还没有登录呦~</p>
                <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>点击登录</Button>
                <style jsx>{`
                    .root {
                        height: 400px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>

        )
    }
    return (
        <div className="root">
            <div className="user-info">
                <img src={user.avatar_url} alt="avatar url" className="avatar" />
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="email">
                    <MailOutlined style={{ marginRight: '20px' }} />
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
            <div className="user-repos">
                <Tabs defaultActiveKey={tabKey} onChange={handleTabChange}>
                    <TabPane tab="你的仓库" key="1">
                        {userRepos.map((repo) => (
                            <Repo repo={repo} key={repo.id} />
                        ))}
                    </TabPane>
                    <TabPane tab="你关注的仓库" key="2">
                        {userStaredRepos.map((repo, index) => (
                            <Repo repo={repo} key={repo.id} />
                        ))}
                    </TabPane>
                </Tabs>

            </div>
            <style jsx>{`
                .root {
                    display: flex;
                    align-items: flex-start;
                    padding: 20px 0;
                }

                .user-info {
                    width: 200px;
                    margin-right: 40px;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                }

                .login {
                    font-weight: 800;
                    font-size: 20px;
                    margin-top: 20px;
                }

                .name {
                    font-size: 16px;
                    color: #777;
                }

                .bio {
                    margin-top: 20px;
                    color: #333;
                }
                
                .avatar {
                    width: 100%;
                    border-radius: 5px;
                }

                .user-repos{
                    flex-grow: 1;
                }
            `}</style>
        </div>
    )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
    const user = reduxStore.getState().user

    if (!(user && user.id)) {
        return {
            isLogin: false
        }
    }

    console.log(ctx.req, ctx.res)
    const userRepos = await api.request({
        url: '/user/repos',
    }, ctx.req, ctx.res)

    const userStaredRepos = await api.request({
        url: '/user/starred',
    }, ctx.req, ctx.res)

    return {
        isLogin: true,
        userRepos: userRepos.data || [],
        userStaredRepos: userStaredRepos.data || []
    }
}

export default withRouter(connect(function mapState(state) {
    return {
        user: state.user
    }
})(Index))