import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const logoutHandle = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success("Logout Successfully");
  };
  useEffect(() => {
    if (isSuccess || !user) {
      navigate("/sign-in");
    }
  }, [user, isSuccess, dispatch]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <div>
            <Link to="/profile">
              {user ? (
                <img src={user && user.photo} alt="/" className="rounded-full h-10 w-10 object-cover ml-2" />
              ) : (
                <li className="sm:inline text-slate-700 hover:underline">
                  Sign in
                </li>
              )}
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
