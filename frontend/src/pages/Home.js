import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { handleError } from '../utils';

export default function Home() {
    const [loggedInUser, setLoggedInUser]= useState('');
    const navigate=useNavigate();

    useEffect(()=>{
          setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])
    const handleLogout=(e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }

    const fetchProducts= async ()=>{
        try{
         
        }catch(err){
           handleError(err)
        }
    } 
    useEffect(()=>{
      fetchProducts()
    },[])
     return (
    <div>
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
