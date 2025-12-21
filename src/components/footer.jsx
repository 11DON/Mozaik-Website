import whiteLogo from "/src/assets/mLogoB.png";

// export default function Footer() {
//     return (
//         <footer className="container py-5 border-top">
//             <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">



//                 <div class="col mb-3"></div>

//                 <div class="col mb-3">

//                     <ul className="nav flex-column">
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">mozaik-sa.com</a></li>
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">+966564350290</a></li>
//                     </ul>
//                 </div>

//                 <div class="col mb-3">
//                     <h5>روابط هامة
//                     </h5>
//                     <ul className="nav flex-column">
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">من نحن</a></li>
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">خدماتنا</a></li>
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">اعمالنا</a></li>
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">المدونة</a></li>
//                         <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">اتصل بنا</a></li>
//                     </ul>
//                 </div>


//                 <div className="col mb-3">
//                     <a href="/" className="d-flex align-items-center mb-3 text-decoration-none" aria-label="Mosaic Logo">
//                         <img src={whiteLogo} alt="Mosaic Logo" width="120" />
//                     </a>
//                     <p className="text-body-secondary">
//                         موزييك من الشركات الوطنية المميزة التي اتبعت سياسات مدروسة منذ انطلاق الشركة وارتكزت تلك السياسات علي اسس علمية وحلول واقعية مدروسة.
//                     </p>
//                 </div>


//             </div>
//         </footer>
//     );
// }




export default function Footer2() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted">


                {/* Links section */}
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            {/* Company */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <a href="/" className="d-flex align-items-center mb-3 text-decoration-none" aria-label="Mosaic Logo">
                                    <img src={whiteLogo} alt="Mosaic Logo" width="120" />
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