import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import './ProductDetails.css'; 

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Initial Product Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-SingleProduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  
    <Layout>

      <div className="main_ContainerPadding135">

                        <div class="topBottom92Margin">
                            <nav class="breadcrumb-nav">
                                <a href="/">Home </a> / 
                                <a href="/ category/{product?.category?.name}"> {product?.category?.name}</a> / 
                                <span class="current-page"> {product.name}</span>
                          </nav>

                        </div>

                        <div class="product-container">

                                  <div class="doubleColumnimages">
                                              
                                          <div class="additional-images">
                                                  <img src={`/api/v1/products/product-image/${product._id}`} alt={product.name}/>
                                                  <img src={`/api/v1/products/product-image/${product._id}`} alt={product.name}/>
                                                  <img src={`/api/v1/products/product-image/${product._id}`} alt={product.name}/>
                                                  <img src={`/api/v1/products/product-image/${product._id}`} alt={product.name}/>

                                          </div>

                                          <div class="main-image img">
                                                  <img src={`/api/v1/products/product-image/${product._id}`} alt={product.name}/>
                                              </div>
                                  </div>


                              <div class="details">
                                  <h6 className="text-24pxregularInter">{product.name}</h6>
                                  <h6 className="16pxregularInter">${product.price}</h6>
                                  <h6 className="text-12pxregularInter">{product.description}</h6>
                                  <div class="line"></div>
                                  <h6 className="heading-20pxregular">Category : {product?.category?.name}</h6>
                                        <div class="product-details1">
                                                <div class="rating">
                                                    <span class="golden-star">&#9733;</span>
                                                    <span class="golden-star">&#9733;</span>
                                                    <span class="golden-star">&#9733;</span>
                                                    <span class="golden-star">&#9733;</span>
                                                    <span class="golden-star">&#9733;</span>
                                                </div>
                                            <span class="reviews"> (150 reviews) | </span>
                                            <span class="availability in-stock">In Stock</span>
                                        </div>
                                        
                                            <button
                                              class="buttonRed"
                                              onClick={() => {
                                                setCart([...cart, product]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                                toast.success("Item added to cart!");
                                              }}>
                                                Buy Now
                                            </button>
                                            <div className="color-selection">
                                                <span className="color-option selected" data-color="green" style={{backgroundColor: "green"}}></span>
                                                <span className="color-option" data-color="red" style={{backgroundColor: "red"}}></span>
                                                <span className="color-option" data-color="orange" style={{backgroundColor: "orange"}}></span>
                                                <span className="color-option" data-color="yellow" style={{backgroundColor: "yellow"}}></span>
                                            </div>

                                            <div className="size-selection">
                                              <span className="size-option">XS</span>
                                              <span className="size-option">S</span>
                                              <span className="size-option">M</span>
                                              <span className="size-option">L</span>
                                              <span className="size-option">XL</span>
                                            </div>

                                            <div className="quantity-control">
                                              <button className="quantity-action">-</button>
                                              <input type="number" className="quantity-value" value="1" min="1"/>
                                              <button className="quantity-action">+</button>
                                            </div>

                                            <i className="fas fa-heart favorite-btn"></i>

                                            <div className="delivery-info">
                                
                                                    <div className="delivery-option">
                                                      <h4>Free Delivery</h4>
                                                      <p>Enter your postal code for delivery availability.</p>
                                                    </div>

                                                    <div className="delivery-option">
                                                      <h4>Return Policy</h4>
                                                      <p><a href="#">30 Days Return & Details</a></p>
                                                    </div>
                                            </div>
                                            
                                             <script src="https://kit.fontawesome.com/your-fontawesome-kit-code.js" crossOrigin="anonymous"></script>
                                </div>

                        </div>

      </div>

                          <hr />

                                          <div className="row container">
                                                  <h6>Similar Products</h6>
                                                  {relatedProducts.length < 1 && (
                                                    <p className="text-center">No Similar Products found</p>
                                                  )}
                                                  <div className="d-flex flex-wrap">
                                                    {relatedProducts?.map((p) => (
                                                      <div className="card m-2" style={{ width: "16rem" }}>
                                                        <img
                                                          src={`/api/v1/products/product-image/${p?._id}`}
                                                          className="card-img-top"
                                                          alt={p.name}
                                                          height={"150px"}
                                                        />
                                                        <div className="card-body">
                                                          <h5 className="Cart-headName-display">{p.name}</h5>
                                                          <p className="card-text">{p.description.substring(0, 30)}...</p>
                                                          <p className="Redtext-display"> $ {p.price}</p>
                                                          <button
                                                            className="btn btn-primary ms-1"
                                                            onClick={() => navigate(`/products/${p.slug}`)}
                                                            style={{ fontSize: "12px" }}
                                                          >
                                                            More Details
                                                          </button>
                                                          <button
                                                            class="btn btn-secondary ms-1"
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
                                          </Layout>
               
   );
};

export default ProductDetails;