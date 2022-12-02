import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
function Searchbar(props) {
  const [search,setSearch] = useState('')
  const handleChange = event =>{
    event.preventDefault()
    setSearch(event.target.value)
  }
  return (
    <div className="container">
          <br />
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <form className="card card-sm">
                <div className="card-body row no-gutters align-items-center">
                  <div className="col-auto">
                    <i className="fas fa-search h4 text-body"></i>
                  </div>

                  <div className="col">
                    <input className="form-control form-control-lg form-control-borderless" onChange={handleChange}  type="search" placeholder="Search destinations" />
                  </div>

                  <div className="col-auto">
                    <button className="btn btn-outline-primary" type="button" onClick={()=>props.onClickHandler(search)}>Search</button>
                  </div>

                </div>
              </form>
            </div>

          </div>
        </div>
  );
}
export default Searchbar;
