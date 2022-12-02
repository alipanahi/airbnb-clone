import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";
import "bootstrap/dist/css/bootstrap.css";

const CreatePage = (props) => {
  return (
    <div className="container py-3">
      <MainHeader />
      <header>
        <div className="pricing-header p-3 pb-md-4 mx-auto">
          <h1 className="display-4 fw-normal">Airbnb</h1>
        </div>
      </header>
      <main>
        {/* my for to submit the datas */}
        <form
          className="needs-validation"
          action="/api/flats/new"
          method="POST"
        >
          <div className="row g-3">
            <div class="col-sm-6">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="please enter the name"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label for="address" class="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="please enter the address"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label for="address" class="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="please enter the price"
                min="0"
                step="0.25"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label for="booked" class="form-label">
                Booked
              </label>
              <select class="form-select" id="booked" name="booked" required="">
                <option value="false">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label for="category" class="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="please enter the category"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-sm-6">
              <label for="rooms" class="form-label">
                Rooms
              </label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="rooms"
                name="rooms"
                placeholder="please enter the rooms"
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

export default CreatePage;
