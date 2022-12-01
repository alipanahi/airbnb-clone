import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import flatController from "../../controllers/flatController";

export default function ShowPage({ flat }) {
  return (
    <>
      <MainHeader />

      <div className="container">
        <h1>This is flats show file</h1>
        <div className="row">
          <h1>
            {flat.name} {flat.address}
          </h1>
        </div>
      </div>
    </>
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
