import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // تسجيل الدخول ناجح
        setSuccessMessage("Login successful!");
        console.log("User logged in:", result);

        // تخزين الرمز المميز (JWT) في localStorage (اختياري)
        localStorage.setItem("jwt", result.jwt);

        // توجيه المستخدم إلى صفحة home
        navigate("/home");
      } else {
        // تسجيل الدخول فشل
        setErrorMessage(result.message || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-600 dark:border-blue-800"
    >
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-white">
          تسجيل الدخول
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}

        <div className="mt-10">
          {/* حقل البريد الإلكتروني */}
          <div className="relative mb-6">
            <label
              className="block mb-3 text-sm font-medium text-white"
              htmlFor="email"
            >
              البريد الإلكتروني
            </label>
            <input
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:ring-4 focus:ring-blue-400"
              id="email"
              type="email"
              {...register("email", {
                required: "البريد الإلكتروني مطلوب",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "عنوان البريد الإلكتروني غير صالح",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div className="relative mb-6">
            <label
              className="block mb-3 text-sm font-medium text-white"
              htmlFor="password"
            >
              كلمة المرور
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:ring-4 focus:ring-blue-400"
              id="password"
              type="password"
              {...register("password", {
                required: "كلمة المرور مطلوبة",
                minLength: {
                  value: 8,
                  message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* زر الدخول */}
          <div className="mt-6">
            <button
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
              type="submit"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
        <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
          ليس لديك حساب؟
          <Link to="/" className="font-medium underline">
            سجل الآن
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;