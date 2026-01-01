import whiteLogo from "/src/assets/LogoB.png";
import styles from '../styles/footer.module.css';

export default function Footer2() {
    return (
        <div>
            <footer className={`text-center text-lg-start bg-body-tertiary text-muted ${styles.footer}`} dir="rtl">


                {/* Links section */}
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            {/* Company */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <a href="/" className={`d-flex align-items-center mb-3 text-decoration-none ${styles.logo}`} aria-label="Mosaic Logo">
                                        <img src={whiteLogo} alt="Mosaic Logo" className={styles.logoImg} />
                                    </a>
                                <p>
                                    موزييك من الشركات الوطنية المميزة التي اتبعت سياسات مدروسة منذ انطلاق الشركة وارتكزت تلك السياسات علي اسس علمية وحلول واقعية مدروسة.
                                </p>
                            </div>

                            {/* Products */}
                            <div className="col-md-2 col-lg-2 col-xl-2  mb-4">
                                <h5>روابط هامة</h5>
                                <p><a href="#!" className="text-reset">خدماتنا</a></p>
                                <p><a href="#!" className="text-reset">اعمالنا</a></p>
                                <p><a href="#!" className="text-reset">المدونة</a></p>
                                <p><a href="#" className="text-reset">اتصل بنا</a></p>
                            </div>

                            {/* Useful links */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mb-4">
                                <h5>تواصل معنا</h5>
                                <p><a href="#!" className="text-reset">mozaik-sa.com</a></p>
                                <p><a href="#!" className="text-reset">+966564350290</a></p>
         
                            </div>


                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
}