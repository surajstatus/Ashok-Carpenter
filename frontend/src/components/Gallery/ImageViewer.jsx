// src/components/Gallery/ImageViewer.jsx
import React from "react";

const ImageViewer = ({ image, onPrev, onNext }) => {
  if (!image) return <div style={{padding:20}}>No images</div>;
  return (
    <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
      <button onClick={onPrev} style={{marginRight:12}}>◀</button>
      <div style={{textAlign:"center"}}>
        <img src={image.imageUrl} alt="" style={{maxHeight:"72vh", maxWidth:"72vw", borderRadius:8}} />
      </div>
      <button onClick={onNext} style={{marginLeft:12}}>▶</button>
    </div>
  );
};

export default ImageViewer;
