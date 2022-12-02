import { getSession } from "next-auth/react"
import MainHeader from "../components/layout.js/main-header"
import userController from "../controllers/userController"


export default function Home(props) {
  return (
    <>
      <MainHeader currentUser={props.currentUser}/>
      <div>
        Home page form seller
      </div>
    </>
  )


}
export async function getServerSideProps(req, res) {
    const session = await getSession(req)
    if(session){
      let currentUser = await userController.findByEmail(session.user)
      return {
        props: { currentUser: currentUser },
      }
      
    }else{
      return {
          redirect: {
          permanent: false,
          destination: `/home`
          }
      }
    }
    
  }
  
