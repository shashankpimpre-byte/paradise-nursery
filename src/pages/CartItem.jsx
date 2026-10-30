
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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>
                      Subtotal: ₹{item.price * item.quantity}
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total: ₹{totalAmount}</h2>

              <button onClick={() => alert("Coming Soon!")}>
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
