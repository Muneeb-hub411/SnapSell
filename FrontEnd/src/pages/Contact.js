import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <>
      <Layout>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="../images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              For any query and info about prodduct feel free to call anytime we
              24X7 aialible
            </p>
            <p className="mt-3">📧 : muneebsaleem402@gmail.com</p>
            <p className="mt-3">☎️ : 0316-5312005</p>
            <p className="mt-3">👍 : 0000-0000-0000 (toll free)</p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
