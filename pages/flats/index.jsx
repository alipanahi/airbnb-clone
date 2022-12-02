import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import flatController from "../../controllers/flatController";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getSession } from "next-auth/react"
import userController from "../../controllers/userController";

export default function IndexPage({ flats,currentUser }) {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser}/>
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Flats</h1>
          <p class="fs-5 text-muted">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est sequi
          </p>
        </div>

        <Link href={`/flats/create`}>
          <button className="btn btn-success btn-sm mb-2">
            create new flat
          </button>
        </Link>
      </header>
      <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {flats.map((flat) => (
            <div key={flat.id}>
              <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                  <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">{flat.name}</h4>
                  </div>
                  <div class="card-body">
                    <h1 class="card-title pricing-card-title">
                      ${flat.price}
                      <small class="text-muted fw-light">/night</small>
                    </h1>
                    <ul class="list-unstyled mt-3 mb-4">
                      <li>address: {flat.address}</li>
                      <li>booked: {flat.booked}</li>
                      <li>category: {flat.category}</li>
                      <li>rooms: {flat.rooms}</li>
                    </ul>
                    <Link href={`/flats/${flat.id}`}>
                      <button
                        type="button"
                        class="w-100 btn btn-lg btn-outline-primary"
                      >
                        Show
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(req, res) {
  
  const session = await getSession(req)
  let currentUser = null
  let flats = null
  if(session){
    
    currentUser = await userController.findByEmail(session.user)
    flats = await flatController.all(currentUser.id);
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
    props: { flats,currentUser },
  };

  
}
