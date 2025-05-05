import React, { useState } from "react";
import { Logo } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent, loginUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../toast";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    enrollmentNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return formData.role === "student"
        ? await loginStudent(data)
        : await loginUser(data);
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      notifySuccess("Login successful.");
      setFormData({
        email: "",
        enrollmentNumber: "",
        password: "",
        role: "",
      });
      navigate("/", { state: { from: "register" } });
    },
    onError: (error) => {
      notifyError(error?.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "enrollmentNumber") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { role, email, password, enrollmentNumber } = formData;
    if (!role) return notifyError("Please select a role");
    if (password.trim() === "")
      return notifyError("Password field cannot be empty");
    if (role === "student") {
      if (enrollmentNumber.trim() === "")
        return notifyError("Enrollment number is required");
      mutation.mutate({ role, enrollmentNumber, password });
    } else {
      if (email.trim() === "") return notifyError("Email is required");
      mutation.mutate({ role, email, password });
    }
  };

  return (
    <div className="pt-[10vh] h-screen flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[25%] flex flex-col gap-4 p-4 border-2 border-black/50 rounded-md shadow-xl bg-white"
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <img src={Logo.logo} alt="Logo" className="h-24" />
          <p className="text-2xl font-semibold text-center uppercase text-gray-600">
            Login
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="font-semibold text-gray-600">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-blue-700 outline-none"
          >
            <option value="">Select Role</option>
            <option value="council">Council Member</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>
        {formData.role === "student" ? (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="enrollmentNumber"
              className="font-semibold text-gray-600"
            >
              Enrollment Number
            </label>
            <input
              type="text"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              placeholder="Enter enrollment number"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none input-uppercase"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-blue-700 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 bg-blue-700 rounded-md text-white h-10 flex justify-center items-center"
        >
          {mutation.isPending ? <Loader /> : "Login"}
        </button>

        <Link
          to="/register"
          className="w-full text-center font-semibold text-gray-600"
        >
          Don't have an account? <span className="text-blue-700">Register</span>
        </Link>
      </motion.form>
    </div>
  );
};

export default Login;
