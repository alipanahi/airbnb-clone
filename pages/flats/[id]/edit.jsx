import React, { Component } from "react";
import MainHeader from "../../../components/layout.js/main-header";
import flatController from "../../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";
import { getSession } from "next-auth/react"
import userController from "../../../controllers/userController";

const EditPage = ({ flat,currentUser }) => {
  return (
    <div className="container py-3">
      <MainHeader currentUser={currentUser}/>
      <header>
        <div className="pricing-header p-3 pb-md-4 mx-auto">
          <h1 className="display-4 fw-normal">Airbnb</h1>
        </div>
      </header>
      <main>
        {/* my for to submit the datas */}
        <form
          className="needs-validation"
          action="/api/flats/edit"
          method="POST"
        >
          <div className="row g-3">
            <div class="col-sm-6">
              <label htmlFor="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="please enter the name"
                defaultValue={flat.name}
              />
              <input type="hidden" name="id" value={flat.id} />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label htmlFor="address" class="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="please enter the address"
                defaultValue={flat.address}
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label htmlFor="price" class="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="please enter the price"
                defaultValue={flat.price}
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label htmlFor="booked" class="form-label">
                Booked
              </label>
              <select class="form-select" id="booked" name="booked" required="">
                <option value={flat.bookd}>{flat.bookd}</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label htmlFor="category" class="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="please enter the category"
                defaultValue={flat.category}
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label htmlFor="rooms" class="form-label">
                Rooms
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="rooms"
                name="rooms"
                placeholder="please enter the rooms"
                defaultValue={flat.rooms}
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
          </div>
          <hr class="my-4" />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditPage;

export async function getServerSideProps(req, res) {
  const { id } = req.query;
  const flat = await flatController.show(id);
  const session = await getSession(req)
  let currentUser = null
  if(session){
    
    currentUser = await userController.findByEmail(session.user)
    if(currentUser.type!=='owner'){
      return {
          redirect: {
          permanent: false,
          destination: `/home`
          }
      }
    }
    
  }else{
    return {
        redirect: {
        permanent: false,
        destination: `/home`
        }
    }
  }

  return {
    props: {
      flat,currentUser
    },
  };
}
