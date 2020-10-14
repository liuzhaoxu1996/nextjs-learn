import React from 'react'
import createStore from '../store/store'
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

/**
 * 服务端渲染就创建一个新的store
 * 客户端渲染使用window下缓存的store
 */
function getOrCreateStore(initialState) {
    if (isServer) {
        return createStore(initialState)
    }
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = createStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}


export default function withRedux(Comp) {
    class WithReduxApp extends React.Component {
        constructor(props) {
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
        render() {
            const { Component, pageProps, ...rest } = this.props
            if (pageProps) {
                pageProps.test = '123'
            }
            return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore}></Comp>
        }

    }

    WithReduxApp.getInitialProps = async (ctx) => {
        let reduxStore;

        if (isServer) {
            const { req } = ctx.ctx
            const session = req.session
            if (session && session.userInfo) {
                reduxStore = getOrCreateStore({
                    user: session.userInfo
                })
            } else {
                reduxStore = getOrCreateStore()
            }
        } else {
            reduxStore = getOrCreateStore()
        }

        ctx.reduxStore = reduxStore

        let appProps = {}

        if (typeof Comp.getInitialProps === 'function') {
            appProps = await Comp.getInitialProps(ctx)
        }

        return {
            ...appProps,
            // reduxStore是一个store对象，里面有很多方法，很难被序列化
            initialReduxState: reduxStore.getState()
        }
    }
    return WithReduxApp
}
