import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios/axios";
import { useDispatch } from "react-redux";
import { setCurrentUser, setToken } from "../store/authSlice";
import Loader from "../components/Loader";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(formData);
    if (res?.data?.success) {
      dispatch(setCurrentUser(res?.data?.user));
      dispatch(setToken(res?.data?.token));
      sessionStorage.setItem("token", res?.data?.token);
      sessionStorage.setItem("user", JSON.stringify(res?.data?.user));
      navigate("/");
      setIsLoading(false);
    } else {
      setMsg(res?.data?.message);
      setIsLoading(false);
    }
    // Reset the form after submission
    setFormData({
      phone: "",
      password: "",
    });
  };
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {isLoading && <Loader />}
      <form
        className="bg-white p-8 px-12 rounded shadow-md "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="phone"
            maxLength={10}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-3 w-full rounded-md font-bold"
        >
          Login
        </button>
        <p className=" text-end">
          New user?
          <Link className=" underline text-blue-600" to={"/register"}>
            Register
          </Link>{" "}
        </p>
      </form>
      <p className=" text-center text-red-600">{msg}</p>
    </div>
  );
}
