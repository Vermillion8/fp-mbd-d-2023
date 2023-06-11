import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Cart from "./pages/Cart/Cart";
import Staff from "./pages/staff/Staff";

function App() {
  return (
    <div>
      <Router>
      <Navbar />

      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/catalog" element={<Catalog />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/staff" element={<Staff />} />

      {/* <Home />
      <Services />
      <Portfolio />
      <Contact /> */}

      </Routes>

      {/* <Footer /> */}

      </Router>
    </div>
  );
}

export default App;
