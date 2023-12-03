import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="text-2xl text-center mt-28">
      <h1 className="">Hi, {user && user.username}</h1>
      <p className=" ">email:{user &&user.email}</p>
      <p className=" ">password:{user &&user.password}</p>
      <p className=" ">role:{user &&user.role}</p>
      <p className=" ">role:{user &&user.photo}</p>
      <img src={user &&user.photo} alt="/"/>
    </div>
  );
};

export default Home;
