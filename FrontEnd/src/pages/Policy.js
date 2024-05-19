import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  const [userPrice, setUserPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePriceChange = (e) => {
    setUserPrice(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const checkPrice = async () => {
    const options = {
      method: "GET",
      url: "https://pricejson-amazon.p.rapidapi.com/pricejson/search",
      params: {
        q: productName,
        category: "electronics",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "pricejson-amazon.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const products = response.data.products; // Array of products

      // Calculate average price of all products
      const totalPrices = products.reduce((sum, product) => {
        const price = parseFloat(product.price.replace("$", ""));
        return sum + price;
      }, 0);
      const averagePrice = totalPrices / products.length;

      // Calculate 10% of the average price
      const tenPercent = 0.1 * averagePrice;

      // Calculate ten_plus_Avg and ten_minus_Avg
      const ten_plus_Avg = averagePrice + tenPercent;
      const ten_minus_Avg = averagePrice - tenPercent;

      // Display product price using window.alert
      window.alert(`Average Product Price: $${averagePrice.toFixed(2)}`); // Display with 2 decimal places

      // Log full product details to the console
      console.log("Product Details:", response.data);
      console.log("Single Product Price:", response.data.products[0].price); // Single product price
      console.log("Average Product Price:", averagePrice);
      console.log("10 Per:", tenPercent);

      if (
        parseFloat(userPrice) >= ten_minus_Avg &&
        parseFloat(userPrice) <= ten_plus_Avg
      ) {
        // Proceed with form submission
        console.log("Form submitted");
        alert("Form submitted successfully");
        return true;
      } else {
        alert("Price is less than what it should be. Fake product!");
        return false;
      }
    } catch (error) {
      console.error("Error fetching the price:", error);
      setError("Failed to fetch the price. Please try again later.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const isValid = await checkPrice();
    if (isValid) {
      // Proceed with form submission
      console.log("Form submitted");
      alert("Form submitted successfully");
    }
  };

  return (
    <Layout>
      <h1>Policy</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div>
          <label>Your Price:</label>
          <input
            type="number"
            value={userPrice}
            onChange={handlePriceChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>
    </Layout>
  );
};

export default Policy;
