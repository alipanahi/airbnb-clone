import React, { Component } from "react";
import MainHeader from "../../../components/layout.js/main-header";
import flatController from "../../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

export default function ShowPage({ flat }) {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto">
          <form action={`/flats/${flat.id}/edit`} method="POST">
            <input type="hidden" name="id" value={flat.id} />
            <button type="submit" className="btn btn-sm btn-secondary m-2">
              Edit
            </button>
          </form>
          <form action={`/api/flats/delete`} method="POST">
            <input type="hidden" name="id" value={flat.id} />
            <button type="submit" className="btn btn-sm btn-danger m-2">
              Delete
            </button>
          </form>
          <h2 class="display-4 fw-normal">Nasdfme: {flat.name}</h2>
          <h2 class="display-4 fw-normal">Address: {flat.address}</h2>
          <h2 class="display-4 fw-normal">Booked: {flat.booked}</h2>
          <h2 class="display-4 fw-normal">Price: {flat.price}</h2>
          <h2 class="display-4 fw-normal">Category: {flat.category}</h2>
          <h2 class="display-4 fw-normal">Rooms: {flat.rooms}</h2>
        </div>
      </header>
    </div>
  );
}

export async function getServerSideProps(req, res) {
  const id = req.params.id;
  const flat = await flatController.show(id);
  console.log(id, flat);

  return {
    props: {
      flat,
    },
  };
}