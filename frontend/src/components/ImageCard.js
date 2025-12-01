// frontend/src/components/ImageCard.js
import React from "react";
import "../components/ImageCard.css";

const ImageCard = ({ image, adminControls }) => {
  // adminControls is optional JSX (e.g., delete/edit buttons)
  return (
    <div className="gallery-item" style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden", width: "100%"}}>
      <img src={image.imageUrl} alt={image.title} />
      <div style={{ padding: 10 }}>
        <h3 style={{ margin: "6px 0" }}>{image.title}</h3>
        <p style={{ margin: 0, color: "#555" }}>{image.description}</p>
        {adminControls}
      </div>
    </div>
  );  
};

export default ImageCard;
