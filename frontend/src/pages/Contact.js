// src/pages/Contact.js
import React, { useState } from "react";

const Contact = () => {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [message,setMessage]=useState(""); const [status,setStatus]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setStatus("Message sent");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div style={{maxWidth:720, margin:"40px auto", padding:20}}>
      <h2>Contact</h2>
      {status && <p>{status}</p>}
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required style={{width:"100%", padding:8, marginBottom:8}} />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required style={{width:"100%", padding:8, marginBottom:8}} />
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" required style={{width:"100%", padding:8, marginBottom:8}} />
        <button type="submit" style={{padding:8}}>Send</button>
      </form>
    </div>
  );
};

export default Contact;
