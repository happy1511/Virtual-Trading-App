// NotFound.js
import React from 'react';
import I1 from '../Logo-white.png'
const NotFound = () => {
  return (
    <div style={{display:"flex",flexDirection:'column',height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <img src={I1} style={{width:'40%',minWidth:'130px',maxWidth:'300px'}}/>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
