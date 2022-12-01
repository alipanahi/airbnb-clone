import React, { Component } from "react";
import MainHeader from "../../components/layout.js/main-header";

const CreatePage = (props) => {
  return (
    <>
      <MainHeader />

      <div className="container">
        <h1>This is flats create file</h1>
        <div className="row">
          <form action="/api/flats/new" method="POST">
            <div className="form-group">
              <label for="title">Flat name:</label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label for="address">Address</label>
              <input
                className="form-control"
                type="text"
                id="address"
                name="address"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
