import { Button } from 'antd';
import { connect } from 'react-redux';
import { add } from '../store/store';
import getConfig from 'next/config';
import { useEffect } from 'react';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig()
const Index = ({ count, add }) => {
    useEffect(() => {
        axios.get('/api/user/info').then(resp => console.log(resp))
    }, [])

    return (<>
        <span>{count}</span>
        <button onClick={() => add(3)}>add</button>
        <a href={publicRuntimeConfig.OAUTH_URL}>
            去登录
        </a>
    </>)
}

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