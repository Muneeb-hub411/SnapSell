import React from 'react';
import Header from '../Header' ;
import Footer from '../Footer';
 

function layout({children}) {
  return (
   <div>
    <Header/>
    <main style={{minHeight:"80vh"}}>
        {children}
    </main>
    <Footer/>
   </div>
  )
}

export default layout
