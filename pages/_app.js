import Layout from '../components/layout.js/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
<Layout /> 
  <Component {...pageProps} />
  </>
 
  )
 
}

export default MyApp
