import blackLogo from "/src/assets/mLogoB.png";
import styles from "/src/styles/Navbar.module.css";
export default function Navbar() {
    return (
<nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbarFix}`}>
            <div className="container">
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

                    <button className={styles.button}>اتصل بنا</button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">الرئيسية</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">خدماتنا</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">من نحن</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">أخبار</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">اعمالنا</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">انضم إلينا</a>
                        </li>

                       
                    </ul>
                <a className="navbar-brand" href="#"><img src={blackLogo} alt="" className={styles.logo}/></a>

                </div>
            </div>
        </nav>
    );
}
