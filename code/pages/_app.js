import 'antd/dist/antd.css'
import '../styles/globals.css'
import Layout from '../components/layout'
import myContext from '../lib/my-context'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [context, useContext] = useState(0);
  return (
    <Layout>
      <myContext.Provider value={context}>
        <Component {...pageProps} />
        <button onClick={() => useContext(context + 1)}>
          Add context
        </button>
      </myContext.Provider>
    </Layout >
  )
}

export default MyApp
