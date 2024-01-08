import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Toaster } from 'react-hot-toast';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster/>
        {children}
      </main>
      <Footer /> 
    </div>
  );
}

export default Layout;
