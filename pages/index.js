import { getSession } from "next-auth/react"
import userController from "../controllers/userController"
export default function Home(props) {
  return (
    <>
    </>
  )


}

export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  if(session){
    let currentUser = await userController.findByEmail(session.user)
    if(currentUser.type=='owner'){
        return {
            redirect: {
            permanent: false,
            destination: `/seller-home`
            }
        }
    }else{
        return {
            redirect: {
            permanent: false,
            destination: `/buyer-home`
            }
        }
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
