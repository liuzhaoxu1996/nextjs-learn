import { Button } from 'antd';
import store from '../store/store';
import { connect } from 'react-redux';
const index = ({ count, add }) => (
    <>
        <span>{count}</span>
        <button onClick={() => add(3)}>add</button>
    </>
)
export default connect(function mapStateToProps(state) {
    return {
        count: state.count
    }
}, function mapActionsToProps(dispatch) {
    return {
        add: (num) => dispatch({ type: "ADD", num: num })
    }
})(index)