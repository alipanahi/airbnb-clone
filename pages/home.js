import { getSession } from "next-auth/react"
import Profile from "./profile/index"

export default function Home(props) {
  return (<Profile currentUser={props.currentUser}/>)

}

export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  console.log('session ', session)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F/`
      }
    }
  }

  return {
    props: { currentUser: session?.user || null },
  }
}
