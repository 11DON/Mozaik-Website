import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import HomePage from "./pages/homePage.jsx";
import Portfolio from "./components/portfolio";
import Footer from "./components/footer.jsx";
import WhoWeArePage from "./pages/whoWeArePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/WhoWeArePage" element={<WhoWeArePage />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
