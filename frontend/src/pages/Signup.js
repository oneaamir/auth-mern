import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

    const [signupInfo, setSignUpInfo]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigate= useNavigate() 
    ;
const handlechange=(e)=>{
     const {name,value}=e.target;
     console.log(name,value);
     const copySignupInfo ={...signupInfo};
     copySignupInfo[name]=value;
     setSignUpInfo(copySignupInfo);
}
const handleSignup=async (e)=>{
    e.preventDefault();
    const {name,email,password} = signupInfo;
    if(!name || !email || !password){
        return handleError('name,email and pass are require');

    }
    try{
        const url="http://localhost:8080/auth/signup";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(signupInfo)
        });
        const result = await response.json();
        console.log(result);
        const {success, message,error}=result;
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
              navigate('/login')
            },1000)
        }else if(error){
            const detail= error?.details[0].message;
            handleError(detail);
        }else if(!success){
            handleError(message);
        }

    }catch(err){
          handleError(err);
    }

}
console.log("detail",{signupInfo})
  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}> 
            <div>
                <label For='name'>Name</label>
                <input 
                id='name'
                onChange={handlechange}
                   type="text"
                   name="name"
                     value={signupInfo.name}
                   autoFocus
                   placeholder="Enter name"/>
                 
            </div>
            <div>
                <label For='email'>Email</label>
                <input 
                id='email'
                onChange={handlechange}
                   type="email"
                   name="email"
                    value={signupInfo.email}
                   autoFocus
                   placeholder="Enter email"/>
            </div>
            <div>
                <label For='password'>Password</label>
                <input 
                id='password'
                onChange={handlechange}
                   type="password"
                   name="password"
                    value={signupInfo.password}
                   autoFocus
                   placeholder="Enter password"/>
            </div>
            <button type='submit'>Signup</button>
            <spam>Already Have An Account?
                <Link to='/Login'>Login</Link>
            </spam>
        </form>
        <ToastContainer/>

    </div>
    
  )
}

export default Signup