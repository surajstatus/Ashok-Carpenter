// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import FolderGallery from "./pages/FolderGallery";
import FolderPage from "./pages/FolderPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FolderGallery isAdmin={false} />} />
        <Route path="/folder/:id" element={<FolderPage isAdmin={false} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin" element={<ProtectedRoute><FolderGallery isAdmin={true} /></ProtectedRoute>} />
        <Route path="/admin/folder/:id" element={<ProtectedRoute><FolderPage isAdmin={true} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
