import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import flatController from "../../controllers/flatController";
import Link from "next/link";

export default function IndexPage({ flats }) {
  console.log(flats);
  return (
    <>
      <MainHeader />

      <div className="container">
        <h1>This is flats index file</h1>
        <div className="row">
          <Link href={`/flats/create`}>create new flat</Link>
          {flats.map((flat) => (
            <h1 key={flat.id}>
              <Link href={`/flats/${flat.id}`}>
                {flat.name} {flat.address}
              </Link>
            </h1>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(req, res) {
  const flats = await flatController.all();

  return {
    props: { flats },
  };
}
