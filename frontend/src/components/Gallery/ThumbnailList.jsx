// src/components/Gallery/ThumbnailList.jsx
import React from "react";

const ThumbnailList = ({ images = [], selectedId, onSelect, isAdmin, onDelete }) => {
  
  return (
    <div style={{ width:140, padding:12, overflowY:"auto", borderRight:"1px solid #eee", background:"#fafafa" }}>
      {images.map(img => (
        <div key={img._id} style={{ marginBottom:12 }}>
          <img
            src={img.imageUrl}
            alt=""
            onClick={() => onSelect(img)}
            style={{
              width:"100%",
              height:88,
              objectFit:"cover",
              borderRadius:8,
              border: img._id === selectedId ? "3px solid #2b7cff" : "2px solid #ddd",
              cursor:"pointer"
            }}
          />
          {isAdmin && (
            <button onClick={() => onDelete(img._id)} style={{ marginTop:6, width:"100%", padding:6, borderRadius:6, border:"none", background:"#ff4d4f", color:"#fff" }}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThumbnailList;
