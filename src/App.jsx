import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Listings from "./Pages/Listings/Listings";
import AboutPage from "./Pages/AboutUs/AboutUs";
import ListingDetail from "./Components/ListingDetail/ListingDetail";
import OpenHouseForm from "./Components/OpenHouseForm/OpenHouseForm";
import Realtors from "./Pages/Realtors/Realtors";
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/admin/AdminDashboard";
import AdminUsers from "./Components/admin/AdminUsers";
import AdminOrders from "./Components/admin/AdminOrders";
import ChatBot from "./Components/ChatBot/ChatBot";

function App() {
  return (
    <Router basename="/">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/teams" element={<Realtors />} />
          <Route path="/open-house" element={<OpenHouseForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          {/* Add more routes as needed */}
          {/* <Route path="/services" element={<Services />} />
          <Route path="/investment"={<Investment />} /> */}
        </Routes>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
