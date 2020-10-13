import 'antd/dist/antd.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import myContext from '../lib/my-context'
import { useState } from 'react'
import { Provider } from 'react-redux'
import testHoc from '../lib/with-redux'

function MyApp({ Component, pageProps, reduxStore }) {
  const [context, useContext] = useState(0);
  return (
    <Layout>
      <Provider store={reduxStore}>
        <myContext.Provider value={context}>
          <Component {...pageProps} />
          <button onClick={() => useContext(context + 1)}>
            Add context
          </button>
        </myContext.Provider>
      </Provider>
    </Layout >
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
