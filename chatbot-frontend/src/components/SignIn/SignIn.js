import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";

function SignIn(props) {

  const nav=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('JWT')!== null){
      return nav("/home")
    }
  },[])
  return (
    
   <div className="container">

      <div className="content">
        <p> Welcome to the COVID-19 AI chatbot</p>
        <p> Log in with your Google account to continue</p>
        <div className="login-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="logo"/> 
        <button onClick={(e)=>props.login(e)} className="loginx"> Login with Google</button>
      </div>
      </div>
     
      
 
     
   </div>
  );
}

export default SignIn;
