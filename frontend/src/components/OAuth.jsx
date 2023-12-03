import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { google, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    const userData = {
      username: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };
    dispatch(google(userData));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      //toast.success("user created Successfully");
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
};

export default OAuth;
