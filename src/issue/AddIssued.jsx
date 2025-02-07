import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const AddIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (data) => {
    setServerMessage("");

    const formattedData = {
      data: {
        title: data.issueName,
        description: data.issueDescription,
        userId: "1",
        imageUrl: "string",
        counter: 0,
        issueStatus: "Open",
        username: "test",
        locale: "string",
      },
    };

    try {
      const response = await fetch("http://localhost:1337/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setServerMessage("تم إضافة المشكلة بنجاح!");
        reset(); // إعادة تعيين النموذج بعد الإضافة
      } else {
        const result = await response.json();
        setServerMessage(
          result.message ||
            `حدث خطأ أثناء إضافة المشكلة: ${
              result.error?.message || "غير محدد"
            }`
        );
        console.log(result); // طباعة التفاصيل في الكونسول
      }
    } catch (error) {
      setServerMessage(`فشل الاتصال بالخادم: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-800 to-blue-900 shadow-xl rounded-xl border border-gray-300"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
        إضافة مشكلة جديدة
      </h2>

      {/* حقل اسم المشكلة */}
      <div className="mb-6">
        <label
          htmlFor="issueName"
          className="block mb-2 text-lg font-medium text-white"
        >
          اسم المشكلة
        </label>
        <input
          type="text"
          id="issueName"
          placeholder="أدخل اسم المشكلة"
          className="w-full border-2 border-transparent bg-white rounded-lg p-4 text-lg text-gray-700 placeholder-gray-500 focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-300"
          {...register("issueName", { required: "اسم المشكلة مطلوب" })}
        />
        {errors.issueName && (
          <p className="text-red-500 text-sm mt-2">
            {errors.issueName.message}
          </p>
        )}
      </div>

      {/* حقل وصف المشكلة */}
      <div className="mb-6">
        <label
          htmlFor="issueDescription"
          className="block mb-2 text-lg font-medium text-white"
        >
          وصف المشكلة
        </label>
        <textarea
          id="issueDescription"
          placeholder="أدخل وصف المشكلة"
          className="w-full border-2 border-transparent bg-white rounded-lg p-4 text-lg text-gray-700 placeholder-gray-500 focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-300"
          {...register("issueDescription", { required: "وصف المشكلة مطلوب" })}
        ></textarea>
        {errors.issueDescription && (
          <p className="text-red-500 text-sm mt-2">
            {errors.issueDescription.message}
          </p>
        )}
      </div>

      {/* حقل حالة المشكلة */}
      <div className="mb-6">
        <label
          htmlFor="status"
          className="block mb-2 text-lg font-medium text-white"
        >
          حالة المشكلة
        </label>
        <select
          id="status"
          className="w-full border-2 border-transparent bg-white rounded-lg p-4 text-lg text-gray-700 placeholder-gray-500 focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-300"
          {...register("status", { required: "حالة المشكلة مطلوبة" })}
        >
          <option value="">اختر الحالة</option>
          <option value="open">مفتوحة</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="closed">مغلقة</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-2">{errors.status.message}</p>
        )}
      </div>

      {/* زر الإرسال */}
      <div className="text-center">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          إضافة المشكلة
        </button>
      </div>

      {/* رسالة من الخادم */}
      {serverMessage && (
        <p className="mt-4 text-center text-lg font-medium text-white">
          {serverMessage}
        </p>
      )}
    </form>
  );
};

export default AddIssue;
