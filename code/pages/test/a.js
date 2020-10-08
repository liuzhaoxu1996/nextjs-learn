import Comp from '../../components/comp'
import {withRouter} from 'next/router'

const A = ({router}) => (
    <>
        <Comp>Page: A</Comp>
        <Comp>{router.query.id}</Comp>
    </>
)

export default withRouter(A)