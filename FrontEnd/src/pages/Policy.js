import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Policy.css"

const Policy = () => {
  return (
    <Layout>
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p>Welcome to SnapSell! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.</p>

        <h2>1. Introduction</h2>
        <p>SnapSell revolutionizes e-commerce with its interactive interface and AI-driven features, ensuring seamless transactions and fraud reduction. Sellers benefit from hassle-free payments and sales tracking, while customers enjoy personalized assistance and informed choices. Through user-friendly design and advanced technology, SnapSell aims to redefine the e-commerce experience, prioritizing convenience, security, and satisfaction.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect information to provide better services to all our users. This includes:</p>
        <ul>
          <li>Personal information such as name, email address, and contact details.</li>
          <li>Transaction information to process and track your orders.</li>
          <li>Usage data to improve our services and user experience.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>Your information is used to:</p>
        <ul>
          <li>Ensure seamless and hassle-free customer experience.</li>
          <li>Reduce fake products and ensure customer satisfaction.</li>
          <li>Facilitate hassle-free payments and help sellers keep records of their sales.</li>
          <li>Engage customers in interactive conversations and help them make informed choices.</li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>We integrate secure technologies to protect your data, including:</p>
        <ul>
          <li>AI-based image and price filtering to reduce fraud.</li>
          <li>Secure transactions and sales analysis through Braintree.</li>
          <li>AI-based recommendation systems and chatbots for effective communication.</li>
        </ul>

        <h2>5. Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as necessary to provide our services or as required by law.</p>

        <h2>6. Your Choices</h2>
        <p>You can choose not to provide certain information, but this may limit your ability to use some features of SnapSell. You can also request access to your personal data and ask for it to be corrected or deleted.</p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at support@snapsell.com.</p>
      </div>
    </Layout>
  );
};

export default Policy;
