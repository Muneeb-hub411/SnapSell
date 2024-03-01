import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Total Price
  const totalPrice = () =>{
    try {
      let total = 0;
      cart?.map((item) =>{
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: 'currency',
        currency: 'USD',
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Remove Item from Cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h6 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout"
                  } `
                : "Your cart is empty"}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/products/product-image/${p._id}`}
                    className="card-img-top"
                    height={"100px"}
                    width={"100px"}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <h6>{p.name}</h6>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <div
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
