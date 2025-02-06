import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">لوحة التحكم</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">الرئيسية</Link>
          </li>
          <li>
            <Link to="/issues" className="text-gray-300 hover:text-white">قائمة المشاكل</Link>
          </li>
          <li>
            <Link to="/add-issue" className="text-gray-300 hover:text-white">إضافة مشكلة</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = "http://localhost:1337/api/issues";

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("فشل في جلب المشاكل");
      const data = await response.json();
      setIssues(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteIssue = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("فشل في حذف المشكلة");
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateIssueStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { issueStatus: newStatus } }),
      });
      if (!response.ok) throw new Error("فشل في تحديث المشكلة");
      fetchIssues();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center text-white">جارٍ التحميل...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl rounded-xl border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">قائمة المشاكل</h2>
      {issues.length === 0 ? (
        <p className="text-center text-white">لا توجد مشاكل مسجلة</p>
      ) : (
        <ul className="space-y-4">
          {issues.map((issue) => {
            if (!issue || !issue.attributes) return null;
            const { title, issueStatus, createdAt } = issue.attributes;
            return (
              <li key={issue.id} className="p-4 bg-gray-700 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-gray-300">
                  <strong>توقيت الإنشاء:</strong> {new Date(createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full ${
                    issueStatus === "Open"
                      ? "bg-green-600"
                      : issueStatus === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {issueStatus === "Open"
                    ? "مفتوحة"
                    : issueStatus === "In Progress"
                    ? "قيد التنفيذ"
                    : "مغلقة"}
                </span>

                <div className="mt-3 space-x-2">
                  <button 
                    onClick={() => updateIssueStatus(issue.id, "Closed")}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    إغلاق
                  </button>
                  <button
                    onClick={() => deleteIssue(issue.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md"
                  >
                    حذف
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};


export default IssuesList;
