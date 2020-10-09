import Comp from '../../components/comp'
import { withRouter } from 'next/router'

const B = ({ router, name }) => (
    <>
        <Comp>Page: {name}</Comp>
        <Comp>query: {router.query.id}</Comp>
    </>
)

B.getInitialProps = async () => {
    return {
        name: 'B'
    }
}
export default withRouter(B)