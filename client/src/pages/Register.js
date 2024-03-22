import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../axios/axios";
import Done from "../components/Done";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    establishment: "",
    logo: null,
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    console.log(e.target.files[0]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      logo: e.target.files[0], // Update logo with selected file
    }));

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("establishment", formData.establishment);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("logo", formData.logo);

    console.log(formDataToSend); // Check the FormData object
    const res = await register(formDataToSend);

    if (res?.data?.success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      // Reset the form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        establishment: "",
        logo: null,
        password: "",
        confirmPassword: "",
        address: "",
      });
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      {!isSuccess ? (
        <form
          className="bg-white p-8 rounded shadow-md w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone no.
            </label>
            <input
              type="phone"
              maxLength={10}
              id="phone"
              name="phone"
              pattern="\d{10}"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="establishment"
              className="block text-sm font-medium text-gray-600"
            >
              Establishment Name
            </label>
            <input
              type="text"
              id="establishment"
              name="establishment"
              value={formData.establishment}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-600"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleLogoChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
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
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 w-full rounded-md font-bold"
          >
            Register
          </button>
          <p className=" text-end">
            Already registered?{" "}
            <Link className=" underline text-blue-600" to={"/login"}>
              {" "}
              Login
            </Link>{" "}
          </p>
        </form>
      ) : (
        <Done title="Registered Successfully!" />
      )}
    </div>
  );
}
