import { withRouter } from 'next/router'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const Comp = dynamic(import('../../components/comp'))

const Title = styled.h1`
    color: red;
    font-size: 40px;
`
const A = ({ router, name, time }) => (
    <>
        <Title>This is title {time}</Title>
        <Comp>Page: {name}</Comp>
        <Comp>query: {router.query.id}</Comp>
    </>
)

A.getInitialProps = async (ctx) => {
    const moment = await import('moment')
    return {
        name: 'A',
        time: moment.default(Date.now() - 60 * 1000).fromNow()
    }
}

export default withRouter(A)