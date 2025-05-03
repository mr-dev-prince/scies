import React, { useState } from "react";
import { Logo } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { notifyError, notifyInfo, notifySuccess } from "../toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      notifySuccess("Registered successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      navigate("/");
    },
    onError: (error) => {
      notifyError("Registration failed", error?.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.role === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.name === ""
    ) {
      notifyInfo("Please fill all the fields");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="pt-[10vh]  h-screen flex justify-center items-center">
      <form
        action="POST"
        className="w-[25%] flex flex-col gap-4 p-3 border-2 rounded-xl "
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <img src={Logo.logo} alt="" className="h-24" />
          <p className="text-2xl font-semibold text-center w-full uppercase text-gray-600">
            Register
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-600">
            Role
          </label>
          <select
            onChange={handleChange}
            name="role"
            id=""
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="Select Role" defaultValue={"Select Role"}>
              Select Role
            </option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="ceo">C.E.O</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-gray-600">
            Name
          </label>
          <input
            onChange={handleChange}
            name="name"
            required
            placeholder="Enter your name"
            type="text"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-600">
            Email
          </label>
          <input
            onChange={handleChange}
            name="email"
            required
            placeholder="Enter your email"
            type="email"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-gray-600">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            required
            placeholder="Enter Password"
            type="password"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700  outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full py-1 bg-blue-700 rounded-md text-white h-10 flex justify-center items-center"
        >
          {isPending ? <Loader /> : "Register"}
        </button>
        <Link
          to={"/login"}
          className="w-full text-center font-semibold text-gray-600"
        >
          Don't have an account ? <span className="text-blue-700">Login</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;
