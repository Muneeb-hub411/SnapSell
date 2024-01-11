import React from "react";
import Header from "../Header";
import Footer from "../Footer";
// import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
  return (
    <div>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet> */}
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster/>
        {children}
      </main>
      <Footer /> 
    </div>
  );
};

// Layout.defaultProps = {
//   title: "SnapSell - Click. Sell. Repeat.",
//   description: "FYP Project",
//   keywords: "mern,react,node,mongodb",
//   author: "Jamal, Muneeb, Ihtisham",
// };

export default Layout;
