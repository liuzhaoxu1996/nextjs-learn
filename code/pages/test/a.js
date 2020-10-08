import Comp from '../../components/comp'
import {withRouter} from 'next/router'

const A = ({router, name}) => (
    <>
        <Comp>Page: {name}</Comp>
        <Comp>{router.query.id}</Comp>
    </>
)

A.getInitialProps = async() => {
    return { 
        name: 'A'
    }
}
export default withRouter(A)