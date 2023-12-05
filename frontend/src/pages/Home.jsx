import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="text-2xl text-center mt-28">
      <h1 className="">Hi, {user && user.username}</h1>
    </div>
  );
};

export default Home;
