import Comp from '../../components/comp'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Title = styled.h1`
    color: red;
    font-size: 40px;
`
const A = ({ router, name }) => (
    <>
        <Title>This is title</Title>
        <Comp>Page: {name}</Comp>
        <Comp>query: {router.query.id}</Comp>
    </>
)

A.getInitialProps = async () => {
    return {
        name: 'A'
    }
}

export default withRouter(A)