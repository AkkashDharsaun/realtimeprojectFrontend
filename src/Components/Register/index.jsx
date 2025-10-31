import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Full Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^A-Za-z0-9]/, "Must contain a special character"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .required("Phone number is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(18, "You must be at least 18 years old")
    .required("Age is required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms & conditions"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
 const onSubmit = async (data) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/login/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await res.json();
    if (res.ok) {
      alert("🎉 Registration Successful!");
      console.log(result);
      reset();
    } else {
      alert(`❌ ${result.error}`);
    }
  } catch (err) {
    alert("Server Error: " + err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Enter phone number"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              {...register("age")}
              placeholder="Enter your age"
              className="w-full border rounded p-2 focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.age?.message}</p>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("terms")} />
            <label className="text-sm">I accept the terms & conditions</label>
          </div>
          <p className="text-red-500 text-sm">{errors.terms?.message}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
