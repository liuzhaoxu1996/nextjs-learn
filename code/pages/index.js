import Link from 'next/link'
import axios from 'axios'
import api from '../lib/api'

const Index = () => {
    return (
        <Link href="/detail">
            <a>goToDetail</a>
        </Link>
    )
}

Index.getInitialProps = async ({ ctx }) => {
    const result = await api.request({
        url: '/search/repositories?q=react',
    }, ctx.req, ctx.res)
    return {
        data: result.data,
    }
}

export default Index