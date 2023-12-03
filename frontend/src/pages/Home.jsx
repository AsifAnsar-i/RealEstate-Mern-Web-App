import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const {user} = useSelector((state)=>state.auth)
  return (
    <div className="text-2xl text-center mt-28">
      <h1 className="">Hi, {user && user.name}</h1>
      <p className=" ">email:{user.email}</p>
      <p className=" ">password:{user.password}</p>
      <p className=" ">role:{user.role}</p>
    </div>
  );
};

export default Home;
