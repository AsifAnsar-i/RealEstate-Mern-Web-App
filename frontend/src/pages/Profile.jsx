import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const Profile = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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

  // firebase Storage
  //  allow read;
  //  allow write: if
  //  request.resource.size<2*1024*1024 &&
  //   request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar ||  user && user.photo}
          alt="/"
          className="rounded-full h-24 w-24 object-cover
            cursor-pointer self-center mt-2
            "
        />
        <p className="text-sm self-center">
          {
            fileUploadError ? (
              <span className="text-red-700">Error Image upload</span>
            ):filePerc>0 && filePerc<100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ):filePerc===100? (
              <span className="text-green-700">Image successfully uploaded!</span>
            ):(
              ''
            )
          }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={logoutHandle} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
