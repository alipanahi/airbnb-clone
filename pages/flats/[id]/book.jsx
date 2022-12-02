import React, { Component } from "react";
import MainHeader from "../../../components/layout.js/main-header";
import flatController from "../../../controllers/flatController";
import "bootstrap/dist/css/bootstrap.css";
import { getSession } from "next-auth/react"
import userController from "../../../controllers/userController";

const Home = ({ flat, currentUser }) => {
    return (
        <div className="container py-3">
            <MainHeader currentUser={currentUser} />
            <header>
                <div className="pricing-header p-3 pb-md-4 mx-auto">
                    <h1 className="display-4 fw-normal">Airbnb</h1>
                </div>
            </header>
            <main>
                {/* my for to submit the datas */}
                <form
                    className="needs-validation"
                    action="/api/flats/booking"
                    method="POST"
                >
                    <div className="row g-3">
                        <div class="col-sm-6">
                            <label htmlFor="from_date" class="form-label">
                                Date From
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="from_date"
                                name="from_date"
                            />
                            <input type="hidden" name="id" value={flat.id} />
                            <input type="hidden" name="user_id" value={currentUser.id} />
                        </div>

                        <div class="col-sm-6">
                            <label htmlFor="to_date" class="form-label">
                                Date To
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="to_date"
                                name="to_date"
                            />
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

export default Home;

export async function getServerSideProps(req, res) {
    const { id } = req.query;
    const flat = await flatController.show(id);
    const session = await getSession(req)
    let currentUser = null
    if (session) {

        currentUser = await userController.findByEmail(session.user)
    }

    return {
        props: {
            flat, currentUser
        },
    };
}
