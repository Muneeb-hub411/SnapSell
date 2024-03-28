import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                    className="btn btn-secondary btn-sm ms-1"
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
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
