import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
const Profile = () => {
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
          <img src={user && user.photo} alt="/" 
            className="rounded-full h-24 w-24 object-cover
            cursor-pointer self-center mt-2
            " />
            <input type="text" placeholder="username" id="username"
            className="border p-3 rounded-lg focus:outline-none"
             />
            <input type="email" placeholder="email" id="email"
            className="border p-3 rounded-lg focus:outline-none"
             />
            <input type="password" placeholder="password" id="password"
            className="border p-3 rounded-lg focus:outline-none"
             />
             <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={logoutHandle} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
