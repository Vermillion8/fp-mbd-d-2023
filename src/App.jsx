import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Deliveries from "./pages/deliveries/Deliveries";
import Staff from "./pages/staff/Staff";
import Customers from "./pages/customers/Customers";
import Orders from "./pages/orders/Orders";

function App() {
  return (
    <div>
      <Router>
      <Navbar />

      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/catalog" element={<Catalog />} />
      <Route exact path="/deliveries" element={<Deliveries />} />
      <Route exact path="/staff" element={<Staff />} />
      <Route exact path="/customers" element={<Customers />} />
      <Route exact path="/orders" element={<Orders />} />

      </Routes>

      </Router>
    </div>
  );
}

export default App;
