import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import flatController from "../../controllers/flatController";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getSession } from "next-auth/react";
import userController from "../../controllers/userController";
import Flat from "../../components/flat";

export default function IndexPage({ flats, currentUser }) {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser} />
      <header>
        <Link href={`/flats/create`}>
          <button className="btn btn-success btn-sm mb-2 mt-2">
            create new flat
          </button>
        </Link>
      </header>
      <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {flats.map((flat) => (
            <Flat key={flat.id} flat={flat} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  let currentUser = null;
  let flats = null;
  if (session) {
    currentUser = await userController.findByEmail(session.user);
    flats = await flatController.all(currentUser.id);
    if (currentUser.type !== "owner") {
      return {
        redirect: {
          permanent: false,
          destination: `/home`,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/home`,
      },
    };
  }
  return {
    props: { flats, currentUser },
  };
}
