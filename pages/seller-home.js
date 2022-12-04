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


export default function Home({ flats, currentUser }) {
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
      <MainHeader currentUser={currentUser} />
      <header>
      <Searchbar onClickHandler={handleClick}/>
        <main>
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {isLoading ? (<p>Loading...</p>) : (
            allFlats.map(flat => 
              <Flat key={flat.id} flat={flat}/>
            )
            )}
          </div>

          <Map/>
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
    const flats = await flatController.all()

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

