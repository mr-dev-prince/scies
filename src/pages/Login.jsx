import React, { useState } from "react";
import { Logo } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../toast";
import Loader from "../components/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      notifySuccess("Logged in successfully");
      setFormData({
        email: "",
        password: "",
        role: "",
      });
      navigate("/");
    },
    onError: (error) => {
      notifyError("Failed to log in.");
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
      formData.password === ""
    ) {
      notifyError("Please fill all the fields");
      return;
    }
    mutate(formData);
  };

  return (
    <div className=" pt-[10vh] h-screen flex justify-center items-center">
      <form
        action="POST"
        className="w-[25%] flex flex-col gap-4 p-3 border-2 rounded-xl "
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <img src={Logo.logo} alt="" className="h-24" />
          <p className="text-2xl font-semibold text-center w-full uppercase text-gray-600">
            Login
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-600">
            Role
          </label>
          <select
            onChange={handleChange}
            defaultValue={""}
            name="role"
            id="role"
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="">Select Role</option>
            <option value="ceo">C.E.O</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
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
          {isPending ? <Loader /> : "Login"}
        </button>
        <Link
          to={"/register"}
          className="w-full text-center font-semibold text-gray-600"
        >
          Already have an account ?{" "}
          <span className="text-blue-700">Register</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
