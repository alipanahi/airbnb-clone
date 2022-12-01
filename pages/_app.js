import '../styles/globals.css'

// _app.jsx is where we define global properties
import { SessionProvider } from "next-auth/react"
export default function App({
 Component,
 pageProps: { session, ...pageProps },
}) {
 return (
   <SessionProvider session={session}>
     <Component {...pageProps} />
   </SessionProvider>
 )
}

