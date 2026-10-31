
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CartItem from "./pages/CartItem";
import AboutUs from "./pages/AboutUs";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
      <h1>Welcome to Paradise Nursery</h1>
        <h2>Where Green Meets Serenity</h2>
        <p>
          Discover beautiful plants and bring a little piece
          of nature into your home.
        </p>

        <button onClick={() => navigate("/plants")}>
          Get Started
        </button>

        <p className="about-link">
          <button onClick={() => navigate("/about")}>
            About Us
          </button>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
