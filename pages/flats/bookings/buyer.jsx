import { getSession } from "next-auth/react"
import MainHeader from "../../../components/layout.js/main-header"
import userController from "../../../controllers/userController"
import flatController from '../../../controllers/flatController'
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Link from "next/link";
import Flat from "../../../components/flat";

export default function Home({ flats, currentUser }) {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser} />
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Airbnb - Buyer Bookings</h1>
          <p class="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
        </div>

        <main>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {flats.map(flat =>
              <Flat key={flat.id} flat={flat} />
            )}
          </div>

          <Link href={`/flats`}>
            <h2 class="display-6 text-center mb-4">More...</h2>
          </Link>
        </main>
      </header>
    </div>
  )


}
export async function getServerSideProps(req, res) {
  
  let currentUser = null
  const session = await getSession(req)
  if (session) {
    currentUser = await userController.findByEmail(session.user)
    const flats = await flatController.buyerBookings(currentUser.id)
    return {
      props: { flats, currentUser },
    }

  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/home`
      }
    }
  }

}


