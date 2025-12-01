// frontend/src/components/ImageViewer.js
import React from "react";

const ImageViewer = ({ image, onPrev, onNext }) => {
  if (!image) return <div style={{ padding: 20 }}>No images</div>;
  return (
    <div style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <button onClick={onPrev} style={{ marginRight: 12 }}>◀</button>
      <div style={{ textAlign: "center" }}>
        <img src={image.imageUrl} alt={image.title} style={{ maxHeight: "70vh", maxWidth: "70vw", borderRadius: 8 }} />
        <div style={{ marginTop: 8 }}>
          <strong>{image.title || "Untitled"}</strong><br/>
          <small>{image.description}</small>
        </div>
      </div>
      <button onClick={onNext} style={{ marginLeft: 12 }}>▶</button>
    </div>
  );
};

export default ImageViewer;
