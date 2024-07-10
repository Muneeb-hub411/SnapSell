import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const checkPrice = async () => {
    const options = {
      method: "GET",
      url: "https://amazon-merchant-data.p.rapidapi.com/search-products",
      params: {
        term: name,
        country: 'de',
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "amazon-merchant-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const products = response.data.content.offers; // Array of products
      // console.log("Price:"+products)

      // Calculate average price of all products
      const totalPrices = products.reduce((sum, product) => {
        const fetchedPrice = parseFloat(product.price);
        return sum + fetchedPrice;
      }, 0);
      
      const averagePrice = totalPrices / products.length;

      // Calculate 10% of the average price
      const tenPercent = 0.1 * averagePrice;

      // Calculate ten_plus_Avg and ten_minus_Avg
      const ten_plus_Avg = averagePrice + tenPercent;
      const ten_minus_Avg = averagePrice - tenPercent;

      // Display product price using window.alert
      // window.alert(`Average Product Price: ${response.data.products[0].price}`); // Display with 2 decimal places
      window.alert(`Average Product Price: $${averagePrice.toFixed(2)}`); // Display with 2 decimal places

      // Log full product details to the console
      // console.log("Product Details:", response.data);
      // console.log("Single Product Price:", response.data.products[0].price); // Single product price
      // console.log("Average Product Price:", averagePrice);
      // console.log("10 Percent of Avg:", tenPercent);

      if (
        parseFloat(price) >= ten_minus_Avg &&
        parseFloat(price) <= ten_plus_Avg
      ) {
        // Proceed with form submission
        // console.log("Form submitted");
        // alert("Form submitted successfully");
        return true;
      } else {
        // alert("Price is less than what it should be. Fake product!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching the price:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if price meets conditions
    const isValidPrice = await checkPrice();
  
    if (!isValidPrice) {
      toast.error("Price does not meet conditions. Kindly contact customer support!");
      setLoading(false);
      return;
    }
  
    try {
      // FormData is a browser property
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);
  
      const { data } = await axios.post(
        "/api/v1/products/create-product",
        productData
      );
  
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Something went wrong in creating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <form>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>Create Product</h2>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {image ? image.name : "Upload Photo"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product_image"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter Product Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter Product Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Do you want it Shipped?"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "CREATE PRODUCT"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;