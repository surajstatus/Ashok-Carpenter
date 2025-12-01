// src/pages/FolderGallery.js
import React from "react";
import FolderGrid from "../components/Gallery/FolderGrid";

const FolderGallery = ({ isAdmin=false }) => {
  return (
    <div>
      <FolderGrid isAdmin={isAdmin} />
    </div>
  );
};

export default FolderGallery;
