import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [LogInInfo, setLoginInfo]=useState({
        
        email:"",
        password:""
    })
    const navigate= useNavigate() 
    ;
const handlechange=(e)=>{
     const {name,value}=e.target;
     console.log(name,value);
     const copyLoginInfo ={...LogInInfo};
     copyLoginInfo[name]=value;
     setLoginInfo(copyLoginInfo);
}
const handleLogIn=async (e)=>{
    e.preventDefault();
    const {email,password} = LogInInfo;
    if( !email || !password){
        return handleError('email and pass are require');

    }
    try{
        const url="https://auth-mern-three.vercel.app/auth/Login";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(LogInInfo)
        });
        const result = await response.json();
        console.log(result);
        const {success, message,error,jwtToken,name}=result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{
              navigate('/Home')
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
console.log("detail",{LogInInfo})
  return (
    <div className='container'>
        <h1>Sign-In</h1>
        <form onSubmit={handleLogIn}> 
            
            <div>
                <label For='email'>Email</label>
                <input 
                id='email'
                onChange={handlechange}
                   type="email"
                   name="email"
                    value={LogInInfo.email}
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
                    value={LogInInfo.password}
                   autoFocus
                   placeholder="Enter password"/>
            </div>
            <button type='submit'>Sign in</button>
            <spam>Don't Have An Account?
                <Link to='/Signup'>Sign up</Link>
            </spam>
        </form>
        <ToastContainer/>

    </div>
    
  )
}

export default Login
