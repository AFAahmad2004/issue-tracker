import { Link } from "react-router-dom";
import React from "react";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">نظام إدارة المشاكل</h1>

      <nav className="space-x-4">
        <Link to="/add" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          إضافة مشكلة
        </Link>
        <Link to="/edit" className="px-6 py-3 bg-yellow-600 text-white rounded-lg">
          تعديل مشكلة
        </Link>
        <Link to="/issues" className="px-6 py-3 bg-green-600 text-white rounded-lg">
          عرض جميع المشاكل
        </Link>
      </nav>
    </div>
  );
};

export default Home;