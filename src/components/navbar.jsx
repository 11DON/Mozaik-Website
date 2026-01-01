import blackLogo from "/src/assets/LogoB.png";
import styles from "/src/styles/Navbar.module.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbarFix}`}
    >
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

        <Link to="/contact">
          {" "}
          <button className={styles.button}>اتصل بنا</button>
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                الرئيسية
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/services">
                خدماتنا
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/WhoWeArePage">
                من نحن
              </Link>
            </li>
            <li className="nav-item">
<Link
className="nav-link active"
to="/news"
>
اخبار
</Link>                        </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/ourWork">
                اعمالنا
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/careers">
                انضم إلينا
              </Link>
            </li>
          </ul>
          <Link className="nav-link active" to="/">
            {" "}
              <img src={blackLogo} alt="" className={styles.logo} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
