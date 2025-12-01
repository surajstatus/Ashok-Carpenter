// src/components/Gallery/FolderGrid.jsx
import React, { useEffect, useState } from "react";
import { BASE, authHeader } from "../../services/api";
import { Link } from "react-router-dom";

const FolderGrid = ({ isAdmin = false }) => {
  const [folders, setFolders] = useState([]);

  const loadFolders = async () => {
    try {
      const res = await fetch(`${BASE}/folders`, { headers: authHeader() });
      const data = await res.json();
      setFolders(data);
    } catch (err) {
      console.error("Load folders error", err);
    }
  };

  useEffect(() => { loadFolders(); }, []);

  const createFolder = async () => {
    const name = prompt("Folder name:");
    if (!name) return;
    try {
      const res = await fetch(`${BASE}/folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error("Create failed");
      await loadFolders();
    } catch (err) { alert(err.message); }
  };

  const deleteFolder = async (id) => {
    if (!window.confirm("Delete folder and all its images?")) return;
    try {
      const res = await fetch(`${BASE}/folder/${id}`, {
        method: "DELETE",
        headers: authHeader()
      });
      if (!res.ok) throw new Error("Delete failed");
      await loadFolders();
    } catch (err) { alert(err.message); }
  };


  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h1>Albums</h1>
        {isAdmin && 
        <button
          onClick={handleLogout}
          style={{ padding: "8px 15px", marginBottom: "20px",borderRadius:"4px", cursor: "pointer", top: 20, right: 20, backgroundColor:"#ff4d4f", color:"white", border:"1px solid red", fontWeight:"bold" }}
        >
          Logout
        </button>}

      </div>

      <div
        style={{ boxSizing: "border-box", marginBottom: 12 }}
      >
        {isAdmin && <button onClick={createFolder} style={{ padding: "8px 12px", marginBottom:10, borderRadius:"0 10px 0 10px", cursor:"pointer" }}>+ New Folder</button>}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: 18
      }}>
        {folders.map(folder => (
          <div key={folder._id} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <Link to={`/folder/${folder._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ height: 160, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={folder.coverImage || "/no-image.jpg"} alt={folder.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: 0 }}>{folder.name}</h3>
                <p style={{ margin: "6px 0 0", color: "#666" }}>{folder.imageCount || 0} Photos</p>
              </div>
            </Link>

            {isAdmin && (
              <div style={{ display: "flex", gap: 8, padding: 10 }}>
                <button onClick={() => deleteFolder(folder._id)} style={{ flex: 1, background: "#ff4d4f", color: "#fff", border: "none", padding: 8, borderRadius: 6 }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderGrid;
