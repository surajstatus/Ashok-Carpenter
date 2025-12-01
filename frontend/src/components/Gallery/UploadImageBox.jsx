// src/components/Gallery/UploadImageBox.jsx
import React, { useState } from "react";
import { BASE, authHeaderFile } from "../../services/api";

const UploadImageBox = ({ folderId, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return alert("Choose an image");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folderId", folderId);

      const res = await fetch(`http://${window.location.hostname}:5000/api/gallery/image`, {
        method: "POST",
        headers: authHeaderFile(), // FIXED
        body: fd
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Upload failed" }));
        throw new Error(err.message || "Upload failed");
      }

      const data = await res.json();
      setFile(null);
      onUploaded && onUploaded(data);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 8, alignItems: "center" }}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} disabled={loading} style={{ padding: "8px 10px" }}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadImageBox;
