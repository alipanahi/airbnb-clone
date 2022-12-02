import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import flatController from "../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";

export default function ShowPage({ flat }) {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>
        <div class="pricing-header p-3 pb-md-4 mx-auto">
          <h2 class="display-4 fw-normal">Name: {flat.name}</h2>
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
