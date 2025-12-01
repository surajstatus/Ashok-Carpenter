// src/pages/FolderPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE, authHeader } from "../services/api";
import ThumbnailList from "../components/Gallery/ThumbnailList";
import ImageViewer from "../components/Gallery/ImageViewer";
import UploadImageBox from "../components/Gallery/UploadImageBox";

const FolderPage = ({ isAdmin = false }) => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadImages = async () => {
    try {
      const res = await fetch(`http://${window.location.hostname}:5000/api/gallery/images/${id}`, {
        headers: authHeader()
      });
      const data = await res.json();
      setImages(data);
      setSelected(data[0] || null); // auto-select first
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) loadImages();
    // eslint-disable-next-line
  }, [id]);

  const handleDelete = async (imageId) => {
    if (!window.confirm("Delete image?")) return;
    try {
      const res = await fetch(`${BASE}/image/${imageId}`, {
        method: "DELETE",
        headers: authHeader()
      });
      if (!res.ok) throw new Error("Delete failed");
      setImages(prev => prev.filter(i => i._id !== imageId));
      if (selected && selected._id === imageId) setSelected(images[0] || null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUploaded = (data) => {
    // server returns the created image
    // push to front and select
    const newImage = data; // adjust if your backend wraps image
    setImages(prev => [newImage, ...prev]);
    setSelected(newImage);
  };

  const idx = images.findIndex(i => selected && i._id === selected._id);
  const prevImage = () => {
    if (images.length === 0) return;
    const i = idx <= 0 ? images.length - 1 : idx - 1;
    setSelected(images[i]);
  };
  const nextImage = () => {
    if (images.length === 0) return;
    const i = idx === images.length - 1 ? 0 : idx + 1;
    setSelected(images[i]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {isAdmin && <UploadImageBox folderId={id} onUploaded={handleUploaded} />}
      {console.log(isAdmin + " from folderpage")}
      <div style={{ display: "flex", flex: 1 }}>

        <ThumbnailList images={images} selectedId={selected?._id} onSelect={setSelected} isAdmin={isAdmin} onDelete={handleDelete} />
        <ImageViewer image={selected} onPrev={prevImage} onNext={nextImage} />
      </div>
    </div>
  );
};

export default FolderPage;
