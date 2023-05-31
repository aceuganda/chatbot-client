import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../App";
import Axios from "axios";
import { useNavigate } from "react-router";
import AppChat from "./AppChat"

function LoggedIn() {
  const [auth, setAuth]=useState(null);
  const nav=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('JWT')==null){
      return nav("/login")
    }
    else{
      Axios.get(`${BACKEND_URL}/home`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('JWT')}`
        }
      })
        .then((res) => {
          console.log(res)
          setAuth(res.data)
        })
        .catch((err) => console.log(err));
      }
  },[])

  const handleLogout=()=>{
    localStorage.removeItem('JWT')
    return nav("/login")
  }
  return (
    <div>
      
      <AppChat auth={auth}/>
      
    </div>
    
    
  );
}

export default LoggedIn;
