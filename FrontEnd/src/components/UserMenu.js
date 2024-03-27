import React from "react";
import { Link } from "react-router-dom";
import "./Usermenu.css";
import { useAuth } from "../context/auth";

const UserMenu = () => {
  const [auth] = useAuth();
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Update Profile</h4>

          <div class="wrapper">
            <nav class="sidebar">
              <div class="profile">
                {/* <img src="profile_picture.jpg" alt="Profile Picture"/> */}
                <h3>Hello {auth?.user?.name}!</h3>
              </div>
              <ul>
                <li>
                  <a href="/dashboard/user/profile">My Account</a>
                  <ul class="sub-menu">
                    <li>
                      <a href="#">Manage My Account</a>
                    </li>
                    <li>
                      <a href="#">My Profile</a>
                    </li>
                    <li>
                      <a href="#">Shipping Address</a>
                    </li>
                    <li>
                      <a href="#">My Payment Options</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="/dashboard/user/orders">My Orders</a>
                  <ul class="sub-menu">
                    <li>
                      <a href="#">My Returns</a>
                    </li>
                    <li>
                      <a href="#">My Cancellations</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">My WishList</a>
                </li>
                <li>
                  <Link to="/forgot-password">Change Password</Link>
                </li>
              </ul>
            </nav>
            <div class="content"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
