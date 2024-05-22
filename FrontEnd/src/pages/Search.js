import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
              key={p.name}
              className="card m-2"
              style={{ width: "15rem" }}
              onClick={() => navigate(`/products/${p.slug}`)} // Add onClick to the card
            >
              <img
                src={`/api/v1/products/product-image/${p._id}`}
                className="card-img-top"
                height={"150px"}
                alt={p.name}
              />

              <div className="product-info">
                <h5 className="titleOfCard">
                  {p.name.substring(0, 20)}...
                </h5>
                <p className="product-price">
                  <span>${p.price - (p.price * 40) / 100}</span>{" "}
                  <del>${p.price}</del>
                </p>
                <div class="product-details1">
                  <div class="rating">
                    <span class="golden-star">&#9733;</span>
                    <span class="golden-star">&#9733;</span>
                    <span class="golden-star">&#9733;</span>
                    <span class="golden-star">&#9733;</span>
                    <span class="golden-star">&#9733;</span>
                  </div>
                  <span class="reviews"> (88 reviews) </span>
                </div>
                <button
                  className="btn btn-sm ms-1 mt-2"
                  style={{ fontSize: "12px" }}
                  onClick={(event) => {
                    // Modify onClick here
                    event.stopPropagation(); // Prevent card click from propagating up
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item added to cart!");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
