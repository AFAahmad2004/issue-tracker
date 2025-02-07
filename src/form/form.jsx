import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه

  const onSubmit = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // تسجيل الحساب ناجح
        setSuccessMessage("Registration completed successfully!");
        console.log("User registered:", result);

        // تخزين الرمز المميز (JWT) في localStorage (اختياري)
        if (result.jwt) {
          localStorage.setItem("jwt", result.jwt);
        }

        // توجيه المستخدم إلى صفحة home
        navigate("/home");
      } else {
        // تسجيل الحساب فشل
        setErrorMessage(result.message || "An error occurred during registration");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700"
    >
      <div className="px-6 py-8 md:px-8">
        <h2 className="text-3xl font-bold text-center text-zinc-800 dark:text-white mb-6">
          Register
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4 text-sm">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4 text-sm">{successMessage}</p>
        )}
        <div className="space-y-5">
          {/* حقل البريد الإلكتروني */}
          <div>
            <label
              className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* حقل الاسم */}
          <div>
            <label
              className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              placeholder="Your name"
              className="w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label
              className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: "Password must contain at least one letter and one number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* زر التسجيل */}
          <div className="mt-6">
            <button
              className="w-full px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors duration-200"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
        <div className="text-sm text-zinc-600 dark:text-zinc-300 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;