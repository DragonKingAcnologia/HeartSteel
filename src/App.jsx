/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
/* Import necessary libraries and components */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./Home";
import NFTListing from "./NFTListing";
import History from "./History";
import Footer from "./components/Footer";
import Details from "./Details";
import Confirm from "./Confirm";
import Login from "./Login";
import Inventory from "./Inventory";
import "./css/App.css";

// Main hosting component for the React application
function App() {
  return (
    <div>
      {/* Router component for handling navigation */}
      <Router>
        <div>
          {/* Navigation component for displaying the navigation bar */}
          <Navigation />

          {/* Routes component for defining different routes of the application */}
          <Routes>
            {/* Route for the home page */}
            <Route path="/cos30049/" element={<Home />} />
            <Route path="/" exact element={<Home />} />

            {/* Route for the NFT listing page */}
            <Route path="/cos30049/nftlisting" element={<NFTListing />} />

            {/* Route for the details page */}
            <Route path="/cos30049/details" element={<Details />} />

            {/* Route for the history page */}
            <Route path="/cos30049/history" element={<History />} />

            {/* Route for the confirmation page */}
            <Route path="/cos30049/confirm" element={<Confirm />} />

            {/* Route for the login page */}
            <Route path="/cos30049/login" element={<Login />} />

            {/* Route for the inventory page */}
            <Route path="/cos30049/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </Router>

      {/* Footer component for displaying the footer */}
      <Footer />
    </div>
  );
}

export default App; // Export the App component
