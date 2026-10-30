
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import Navbar from "../components/Navbar";
import plants from "../data/plants";
import "../App.css";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const isAdded = (id) =>
    cartItems.some((item) => item.id === id);

  return (
    <div className="products-page">
      <Navbar />

      <header className="products-heading">
        <h1>Our Plants</h1>
        <p>Find the perfect green companion for your space.</p>
      </header>

      {categories.map((category) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />

                  <div className="plant-info">
                    <h3>{plant.name}</h3>
                    <p>₹{plant.price}</p>

                    <button
                      onClick={() => dispatch(addToCart(plant))}
                      disabled={isAdded(plant.id)}
                    >
                      {isAdded(plant.id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
