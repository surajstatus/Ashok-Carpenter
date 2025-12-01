import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../services/api";
import ImageCard from "../components/ImageCard";
import "../components/ImageCard.css";

const Admin = () => {
  const token = localStorage.getItem("token");
  const { data: images, error, mutate } = useSWR(
    "http://localhost:5000/api/gallery/",
    fetcher
  );

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", desc);

    try {
      const res = await fetch("http://localhost:5000/api/gallery/add", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      await res.json();
      mutate(); // refresh SWR cache
      setFile(null);
      setTitle("");
      setDesc("");
    } catch (err) {
      setUploadError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this image?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      await res.json();
      mutate(); // refresh SWR cache
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{ padding: "8px 15px", marginBottom: "20px", cursor: "pointer" }}
      >
        Logout
      </button>
      

      <form onSubmit={handleUpload} style={{ marginBottom: "30px" }}>
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        <div>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </div>
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <button type="submit">Upload Image</button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10
        }}>
        {images?.map((img) => (
          <div key={img._id}>
            <ImageCard className="adminImage" image={img} />
            <button onClick={() => handleDelete(img._id)} style={{ margin: "0 5px 10px 5px", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Admin;
