import React, { Component } from "react";
import MainHeader from "../../../components/layout.js/main-header";
import flatController from "../../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react"
import userController from "../../../controllers/userController";

export default function ShowPage({ flat, images, currentUser }) {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser}/>
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto">
          <div class="card">
            <Image
              //src="https://res.cloudinary.com/dc24zff14/image/upload/v1669991395/v8zz13i2ovoo8yk77zpg.jpg"
              src={images[0]?.path || "https://res.cloudinary.com/dc24zff14/image/upload/v1669991395/v8zz13i2ovoo8yk77zpg.jpg"}
              class="img-fluid"
              alt="flat image"
              width={500}
              height={500}
              className="card-img-top"
            />
            <div class="card-body">
              <h2 class="card-title">Nasdfme: {flat.name}</h2>
              <h2 class="card-text">Address: {flat.address}</h2>
              <h2 class="card-text">Booked: {flat.booked}</h2>
              <h2 class="card-text">Price: {flat.price}</h2>
              <h2 class="card-text">Category: {flat.category}</h2>
              <h2 class="card-text">Rooms: {flat.rooms}</h2>
              {currentUser ? (
                currentUser.type==='owner' ? (
                  <>
                    <form action={`/flats/${flat.id}/edit`} method="POST">
                    <input type="hidden" name="id" value={flat.id} />
                    <button type="submit" className="btn btn-primary m-2">
                      Edit
                    </button>
                  </form>
                  <form action={`/api/flats/delete`} method="POST">
                    <input type="hidden" name="id" value={flat.id} />
                    <button type="submit" className="btn btn-danger m-2">
                      Delete
                    </button>
                  </form>
                  </>
                ) : (
                  <form action={`/flats/${flat.id}/book`} method="POST">
                  <input type="hidden" name="id" value={flat.id} />
                  <button type="submit" className="btn btn-primary m-2">
                    book
                  </button>
                </form>
                
                )) :(
                  <></>
                )
              }
              
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export async function getServerSideProps(req, res) {
  const id = req.params.id;
  const flat = await flatController.show(id);
  const images = await flatController.getFlatImages(id);
  let currentUser = null
  const session = await getSession(req)
  if (session) {
    currentUser = await userController.findByEmail(session.user)
  }

  return {
    props: {
      flat,
      images,
      currentUser
    },
  };
}
