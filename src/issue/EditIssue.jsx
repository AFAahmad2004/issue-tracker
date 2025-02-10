import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditIssue = () => {
  const { id } = useParams(); // الحصول على الـ ID من الـ URL
  const navigate = useNavigate();
  
  const [issue, setIssue] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("رقم المشكلة غير صالح!");
      return;
    }

    fetchIssueById(id);
  }, [id]);

  const fetchIssueById = async (issueId) => {
    try {
      const response = await fetch("http://localhost:5173/edit");
      const data = await response.json();
      
      console.log("Fetched Data:", data); // ✅ طباعة البيانات للتحقق
      
      if (!data || !data.data) {
        throw new Error("المشكلة غير موجودة!");
      }
  
      setIssue(data.data);
      setTitle(data.data.attributes.title);
      setDescription(data.data.attributes.description);
      setStatus(data.data.attributes.issueStatus);
    } catch (err) {
      setError("فشل في جلب تفاصيل المشكلة");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedIssue = {
      data: {
        title,
        description,
        issueStatus: status,
      },
    };

    try {
      const response = await fetch("http://localhost:5173/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIssue),
      });

      if (!response.ok) {
        throw new Error("فشل في تحديث المشكلة");
      }

      navigate("/issues"); // العودة إلى صفحة قائمة المشاكل بعد التحديث
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">تعديل المشكلة</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-xl mb-2">اسم المشكلة</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-xl mb-2">الوصف</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-xl mb-2">الحالة</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="Open">مفتوحة</option>
            <option value="In Progress">قيد التنفيذ</option>
            <option value="Closed">مغلقة</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditIssue;
