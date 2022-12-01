import Link from 'next/link';
import classes from './main-header.module.css';
import 'bootstrap/dist/css/bootstrap.css'

import { signIn, signOut } from "next-auth/react"

function MainHeader(props) {
    return (
        <navbar className={classes.navbar}>

            <div className={classes.airbnbLogo}>
                <Link href="/">Airbnb </Link>
            </div>
            <div className={classes.navbtn}>
                <Link href="/profile">Profile  </Link>
            </div>

            <div className={classes.navbtn}>
                <Link href={ `/sellers` }>Sellers  </Link>
            </div>

            <div className={classes.navbtn}>
                <Link href={ `/flats` }>Flats  </Link>
            </div>


            <div className={classes.navbtn}>
                <Link href="/">Search  </Link>
            </div>

            <div className={classes.navbtn}>
                {props.currentUser ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign in</button>}
                
            </div>


            <div>
                <nav className={classes.navbar}>
                </nav>
            </div>

        </navbar>
    )
}
export default MainHeader;
