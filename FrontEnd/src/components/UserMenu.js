import React from 'react'
import { NavLink } from 'react-router-dom'
import './Usermenu.css'; 

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
      <div className="list-group">
        <h4>Update Profile</h4>

<div class="wrapper">
  <nav class="sidebar">
    <div class="profile">
      <img src="profile_picture.jpg" alt="Profile Picture"/>
      <h3>Md Rimel</h3>
      <p>Welcome!</p>
    </div>
    <ul>
    
      <li><a href="/dashboard/user/profile">My Account</a>
        <ul class="sub-menu">
          <li><a href="#">Manage My Account</a></li>
          <li><a href="#">My Profile</a></li>
          <li><a href="#">Address Book</a></li>
          <li><a href="#">My Payment Options</a></li>
        </ul>
      </li>
      <li><a href="/dashboard/user/orders">My Orders</a>
        <ul class="sub-menu">
          <li><a href="#">My Returns</a></li>
          <li><a href="#">My Cancellations</a></li>
        </ul>
      </li>
      <li><a href="#">My WishList</a></li>
      <li><a href="#">Password Changes</a></li>
    </ul>
  </nav>
  <div class="content">
    </div>
</div>






        
      </div>
      </div>
    </>
  )
}

export default UserMenu
