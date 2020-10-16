import Link from 'next/link'
import api from '../lib/api'

const Index = ({ data }) => {
    console.log(data)
    return (
        <Link href="/detail">
            <a>goToDetail</a>
        </Link>
    )
}

Index.getInitialProps = async ({ ctx }) => {
    const result = await api.request({
        url: '/user/repos',
    }, ctx.req, ctx.res)
    return {
        data: result.data,
    }
}

export default Index