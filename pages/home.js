import { getSession } from "next-auth/react"
import MainHeader from "../components/layout.js/main-header"
import userController from "../controllers/userController"
import flatController from '../controllers/flatController'
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Flat from "../components/flat";
import Map from "../components/map";
import Searchbar from "../components/searchbar";
import { useState,useEffect } from "react";

export default function Home({ flats }) {
  const [search,setSearch] = useState('')
  const [allFlats,setAllFlats] = useState(flats)
  const [isLoading, setLoading] = useState(false)
  const handleClick = search=>{
      setSearch(search)
  }

  useEffect(() => {
    setLoading(true)
    fetch('/api/flats/search',{
      method: "POST",
      body: search

    })
      .then((res) => res.json())
      .then((data) => {
        setAllFlats(data.data)
        setLoading(false)
      })
  }, [search])

  

  return (
    <div className="container py-3">
      <MainHeader />
      <header>
        <Searchbar onClickHandler={handleClick}/>

        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 class="display-4 fw-normal">Welcome to Airbnb</h1>
          <p class="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
        </div>

        <main>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {isLoading ? (<p>Loading...</p>) : (
            allFlats.map(flat => 
              <Flat key={flat.id} flat={flat}/>
            )
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
