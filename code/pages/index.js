import Link from 'next/link'
import api from '../lib/api'

const Index = ({ userRepos, userStaredRepos, isLogin }) => {
    console.log(userRepos, userStaredRepos, isLogin)
    return (
        <Link href="/detail">
            <a>goToDetail</a>
        </Link>
    )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
    const user = reduxStore.getState().user

    if (!(user && user.id)) {
        return {
            isLogin: false
        }
    }
    const userRepos = await api.request({
        url: '/user/repos',
    }, ctx.req, ctx.res)

    const userStaredRepos = await api.request({
        url: '/user/repos',
    }, ctx.req, ctx.res)

    return {
        isLogin: true,
        userRepos: userRepos.data,
        userStaredRepos: userStaredRepos.data
    }
}

export default Index