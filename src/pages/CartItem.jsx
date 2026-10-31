
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total amount of all cart items
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate the subtotal for an individual plant
  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  // Increase the quantity of a plant
  const handleIncrement = (item) => {
    dispatch(increaseQuantity(item.id));
  };

  // Decrease quantity, or remove the plant when quantity is 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  // Remove a plant from the cart
  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
  };

  // Checkout message
  const handleCheckout = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-container">
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <p>Discover some beautiful plants for your home.</p>

            <Link to="/plants" className="continue-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-card" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-details">
                    <h3 className="cart-item-name">
                      {item.name}
                    </h3>

                    <p className="cart-item-cost">
                      Unit Price: ₹{item.price}
                    </p>

                    <p>
                      Subtotal: ₹{calculateTotalCost(item)}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>
                Total Cart Amount: ₹{calculateTotalAmount()}
              </h2>

              <button onClick={handleCheckout}>
                Checkout
              </button>

              <Link to="/plants" className="continue-button">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;

