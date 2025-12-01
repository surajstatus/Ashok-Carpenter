import React, { useEffect, useState } from "react";
import axios from "axios";

const FolderView = ({ folderId, isAdmin }) => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get(`/api/images/images/${folderId}`)
      .then(res => {
        setImages(res.data);
        if (res.data.length > 0) setSelected(res.data[0]); // Auto select first image
      });
  }, [folderId]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this image?")) return;

    axios.delete(`/api/images/image/${id}`)
      .then(() => setImages(images.filter(img => img._id !== id)));
  };

  return (
    <div className="flex gap-6 p-6">
      
      {/* LEFT SIDE - Thumbnails */}
      <div className="w-1/4 overflow-y-auto h-[80vh] space-y-4">
        {images.map(img => (
          <div
            key={img._id}
            onClick={() => setSelected(img)}
            className={`cursor-pointer border rounded-lg p-1 ${
              selected?._id === img._id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img src={img.url} className="w-full rounded" alt="thumb" />

            {isAdmin && (
              <button
                className="text-red-500 text-sm mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(img._id);
                }}
              >
                🗑 Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Main Image */}
      <div className="w-3/4 flex justify-center items-center">
        {selected ? (
          <img src={selected.url} className="max-h-[80vh] rounded-xl shadow" alt="main" />
        ) : (
          <p>No Image Selected</p>
        )}
      </div>

    </div>
  );
};

export default FolderView;
