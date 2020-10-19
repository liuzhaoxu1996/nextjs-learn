import 'antd/dist/antd.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import PageLoading from '../components/PageLoading'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import testHoc from '../lib/with-redux'
import Link from 'next/link'
import axios from 'axios'
function MyApp({ Component, pageProps, reduxStore }) {
    const router = useRouter()

    const [context, setContext] = useState(false);
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    useEffect(() => {
        router.events.on('routeChangeStart', startLoading);
        router.events.on('routeChangeComplete', stopLoading);
        router.events.on('routeChangeError', stopLoading);


        return () => {
            router.events.off('routeChangeStart', startLoading);
            router.events.off('routeChangeComplete', stopLoading);
            router.events.off('routeChangeError', stopLoading);
        }
    }, [])

    return (
        <Provider store={reduxStore}>
            {loading ? <PageLoading /> : null}
            <Layout>
                <Component {...pageProps} />
            </Layout >
        </Provider>
    )
}

MyApp.getInitialProps = async (ctx) => {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    return {
        pageProps
    }
}
export default testHoc(MyApp)
