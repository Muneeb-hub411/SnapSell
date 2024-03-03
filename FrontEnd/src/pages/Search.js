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
              <div key={p.name} className="card m-2" style={{ width: "14rem" }}>
                <img
                  src={`/api/v1/products/product-image/${p._id}`}
                  className="card-img-top"
                  height={"150px"}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary btn-sm ms-1"
                    style={{ fontSize: "12px" }}
                    onClick={() => navigate(`/products/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary btn-sm ms-1"
                    style={{ fontSize: "12px" }}
                      onClick={() => {
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
