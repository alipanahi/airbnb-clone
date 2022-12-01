import { getSession } from "next-auth/react"
import MainHeader from "../components/layout.js/main-header"
export default function Home(props) {
  return (
    <>
      <MainHeader currentUser={props.currentUser}/>
    </>
  )


}

export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  console.log('sessions ', session)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/home`
      }
    }
  }

  return {
    props: { currentUser: session?.user || null },
  }
}
