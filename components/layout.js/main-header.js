import Link from 'next/link';
import classes from './main-header.module.css';

function MainHeader() {
    return (
        <header className={classes.navbar}>
            <div className={classes.logo}>
                <Link href="/">Airbnb  </Link>
            </div>
            <div className={classes.logo}>
                <Link href="/profile">Profile  </Link>
            </div>

            <div className={classes.logo}>
                <Link href="/Sellers">Sellers  </Link>
            </div>

            <div className={classes.logo}>
                <Link href="/api/flats">Flats  </Link>
            </div>


            <div className={classes.logo}>
                <Link href="/">Search  </Link>
            </div>

            <div className={classes.logo}>
                <Link href="/login">Login  </Link>
            </div>


            <div>
                <nav className={classes.navbar}>









                </nav>

            </div>

        </header>
    )
}
export default MainHeader;
