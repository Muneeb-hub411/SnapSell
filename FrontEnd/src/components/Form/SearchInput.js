import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#cacfcb",
            width: "100%",
            borderRadius: "5px",
            marginLeft: "40px",
          }}
        >
          <input
            placeholder="What are you looking for?"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            style={{
              border: "none",
              borderRadius: "5px 0 0 5px",
              backgroundColor: "#cacfcb",
              outline: "none", // Remove outline
              padding: "10px",
              width: "calc(100% - 20px)", // Adjust input width
              fontSize: "10px"
              
            }}
          />
          <button
            type="submit"
            style={{
              border: "none",
              borderRadius: "0 5px 5px 0",
              backgroundColor: "#cacfcb",
              color: "black",
              cursor: "pointer",
              padding: "10px",
              fontWeight: "100",
            }}
          >
            <CiSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
