import React, { useState } from "react";
import {Link} from "react-router-dom"
const SignUp = () => {
  const [username,setUsername] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")

  const onSubmit=(e)=>{
    e.preventDefault();
    console.warn({username,email,password})
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="username" className="border p-3 rounded-lg focus:outline-none" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg focus:outline-none" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg focus:outline-none" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
