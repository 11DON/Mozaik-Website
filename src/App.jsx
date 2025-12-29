import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/navbar";
import HomePage from "./pages/homePage.jsx";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer.jsx";
import WhoWeArePage from "./pages/whoWeArePage.jsx";
import Services from "./pages/services.jsx";
import OurWork from "./pages/ourWork.jsx";
import Carrers from "./pages/carrers.jsx";
import Contact from "./pages/contactPage.jsx";
import HRAdmin from "./pages/hr.jsx";
import JobApplication from "./pages/jobApplication.jsx";
function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop /> 
      <Routes>
        <Route path="/carrers/:id" element={<JobApplication />} />
        <Route path="/HR-Admin" element={<HRAdmin/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/WhoWeArePage" element={<WhoWeArePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ourWork" element={<OurWork />} />
        <Route path="/carrers" element={<Carrers />} />
        ,<Route path="/contact" element={<Contact />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
