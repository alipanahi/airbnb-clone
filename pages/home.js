import { getSession } from "next-auth/react"
import MainHeader from "../components/layout.js/main-header"
import userController from "../controllers/userController"
import flatController from '../controllers/flatController'
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Flat from "../components/flat";
import Map from "../components/map";

export default function Home({ flats }) {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>

        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Welcome to Airbnb</h1>
          <p class="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
        </div>

        <main>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
<<<<<<< HEAD
            {flats.map(flat =>
              <div key={flat.id} class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                  <div class="card-header py-3">
                    <h4 class="my-0 fw-normal">{flat.name}</h4>
                  </div>
                  <div class="card-body">
                    <h1 class="card-title pricing-card-title">${flat.price}<small class="text-muted fw-light">/night</small></h1>
                    <ul class="list-unstyled mt-3 mb-4">
                      <li>{flat.address}</li>
                      <li>{flat.booked}</li>
                      <li>{flat.category}</li>
                      <li>{flat.rooms}</li>
                    </ul>
                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
                  </div>
                </div>
              </div>
=======
            { flats.map(flat => 
              <Flat key={flat.id} flat={flat}/>
>>>>>>> 9dace434d7279cdb14e6553e862cb313b34c2044
            )}
          </div>

          <Map />
        </main>
      </header>
    </div>
  )


}
export async function getServerSideProps(req, res) {
  const session = await getSession(req)
  if (session) {
    let currentUser = await userController.findByEmail(session.user)
    if (currentUser.type === 'owner') {
      return {
        redirect: {
          permanent: false,
          destination: `/seller-home`
        }
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/buyer-home`
        }
      }
    }

  }

  // get all flats from flatController
  const flats = await flatController.all()

  return {
    props: { flats }
  }

}
