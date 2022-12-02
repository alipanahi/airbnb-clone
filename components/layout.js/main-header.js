import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

function MainHeader(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className={`navbar-brand`} href={`/home`}>
          Airbnb
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={`/profile`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={`/sellers`}
              >
                Sellers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={`/flats`}
              >
                Flats
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={`/search`}
              >
                Search
              </Link>
            </li>
          </ul>
          <div>
            {props.currentUser ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default MainHeader;
