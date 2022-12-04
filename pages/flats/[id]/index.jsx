import React, { Component } from "react";
import MainHeader from "../../../components/layout.js/main-header";
import flatController from "../../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import userController from "../../../controllers/userController";

export default function ShowPage({ flat, images, currentUser }) {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser} />
      <header>
        <div class="col mt-2">
          <div class="card flex-md-row mb-4 shadow-sm">
            <div class="card-body d-flex flex-column align-items-start">
              <h2 class="mb-2">
                <a class="text-dark" href="#">
                  {flat.name}
                </a>
              </h2>
              <div class="mb-1 text-muted">{flat.createdAt}</div>
              <p class="card-text mb-auto">
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{flat.address}</td>
                    </tr>
                    <tr>
                      <th scope="row">Rooms</th>
                      <td>{flat.rooms}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>{flat.price}</td>
                    </tr>
                    <tr>
                      <th scope="row">Category</th>
                      <td>{flat.category}</td>
                    </tr>
                  </tbody>
                </table>
              </p>
              {currentUser ? (
                currentUser.type === "owner" ? (
                  <>
                    <form action={`/flats/${flat.id}/edit`} method="POST">
                      <input type="hidden" name="id" value={flat.id} />
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm mb-2"
                      >
                        Edit
                      </button>
                    </form>
                    <form action={`/api/flats/delete`} method="POST">
                      <input type="hidden" name="id" value={flat.id} />
                      <button
                        type="submit"
                        className="btn btn-block btn-sm btn-danger"
                      >
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
                )
              ) : (
                <></>
              )}
            </div>
            <Image
              //src="https://res.cloudinary.com/dc24zff14/image/upload/v1669991395/v8zz13i2ovoo8yk77zpg.jpg"
              src={
                images[0]?.path ||
                "https://res.cloudinary.com/dc24zff14/image/upload/v1670164426/xstrgjeyl5jf73zxtgpo.jpg"
              }
              class="img-fluid"
              alt="flat image"
              width={500}
              height={500}
              className="card-img-top"
            />
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
  let currentUser = null;
  const session = await getSession(req);
  if (session) {
    currentUser = await userController.findByEmail(session.user);
  }

  return {
    props: {
      flat,
      images,
      currentUser,
    },
  };
}
