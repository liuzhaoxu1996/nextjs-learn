import { Button } from 'antd';
import { connect } from 'react-redux';
import { add } from '../store/store';
const Index = ({ count, add }) => (
    <>
        <span>{count}</span>
        <button onClick={() => add(3)}>add</button>
    </>
)

Index.getInitialProps = async ({ reduxStore }) => {
    reduxStore.dispatch(add(3))
    return {}
}

export default connect(function mapStateToProps(state) {
    return {
        count: state.count
    }
}, function mapActionsToProps(dispatch) {
    return {
        add: (num) => dispatch({ type: "ADD", num: num })
    }
})(Index)