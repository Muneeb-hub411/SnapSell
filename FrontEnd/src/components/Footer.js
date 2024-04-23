import "./ComponentStyles/styles.css";
import { GrFacebookOption } from "react-icons/gr";

import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import qr_image from "../pages/images/qr_image.png";
import image from "../pages/images/image_3.png";

function Footer() {
  return (
    <div className="container-fluid footer mt-5" >
      <div className="">
        <div className="row" style={{ color: "white" }}>
          <div className="col-6 col-sm-3 col-md-3 d-flex justify-content-center">
            <div className="grid-item">
              <h4>SnapSell</h4>
              <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
                Subscribe
              </h5>
              <p>Get 10% off your order</p>
              <button className="btn btn-primary">
                <Link to="/about">About</Link>
              </button>
            </div>
          </div>
          <div className="col-6 col-sm-2 col-md-2 d-flex justify-content-center">
            <div className="grid-item">
              <h5>Support</h5>
              <p>
                Block B, Sector # B17 <br />
                Islamabad, Pakistan.
              </p>
              <p>snapsell@gmail.com</p>
              <p>+92 345 43252344</p>
            </div>
          </div>
          <div className="col-6 col-sm-2 col-md-2 d-flex justify-content-center">
            {/* Center content horizontally */}
            <div className="grid-item">
              <h5>Account</h5>
              <Link to='/myAccount'>My Account</Link>
              <Link to='/login'>Login / Register</Link>
              <Link to='/cart'>Cart</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <Link to='/shop'>Shop</Link>
            </div>
          </div>
          <div className="col-6 col-sm-2 col-md-2 d-flex justify-content-center">
            {/* Center content horizontally */}
            <div className="grid-item">
              <h5>Quick Link</h5>
              <Link to="/policy">Privacy Policy</Link>
              <Link to='/terms'>Terms of Use</Link>
              <Link to='/faqs'>FAQs</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="col-6 col-sm-3 col-md-3 d-flex justify-content-center">
            {/* Center content horizontally */}
            <div className="grid-item">
              <h5>Download App</h5>
              <p>Save $3 with App New User Only</p>
             
              <div className="d-flex">
                <div className="col-6">
                  <img
                    src={qr_image}
                    alt="QR Code"
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                    width="80"
                    height="80"
                  />
                </div>
                <div className="col-6">
                  <img
                    src={image}
                    alt="Dummy Image"
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                    width="80"
                    height="100"
                  />
                </div>
              </div>
              <br/>
              <div style={{display: "flex", flexDirection:"row", justifyContent:"center"}}>
                <div className="col">
                  <GrFacebookOption />
                </div>
                <div className="col">
                  <LuTwitter />
                </div> 
                <div className="col">
                  <FaInstagram />
                </div> 
                <div className="col">
                <FaLinkedinIn />
                </div>            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
