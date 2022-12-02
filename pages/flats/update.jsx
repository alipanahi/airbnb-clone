import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import { getSession } from "next-auth/react"
import userController from "../../controllers/userController";

const UpdatePage = ({currentUser}) => {
  return (
    <>
      <MainHeader currentUser={currentUser}/>

      <div className="container">
        <h1>This is flats update file</h1>
        <div className="row"></div>
      </div>
    </>
  );
};

export default UpdatePage;

export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  let currentUser = null
  if(session){
    
    currentUser = await userController.findByEmail(session.user)
    if(currentUser.type!=='owner'){
      return {
          redirect: {
          permanent: false,
          destination: `/home`
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
  return {
    props: { currentUser },
  };

  
}

