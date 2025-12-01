// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div style={{maxWidth:420, margin:"60px auto", padding:20, border:"1px solid #eee", borderRadius:8}}>
      <h2>Admin Login</h2>
      {err && <p style={{color:"red"}}>{err}</p>}
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required style={{width:"100%", padding:8, marginBottom:8}} />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required style={{width:"100%", padding:8, marginBottom:8}} />
        <button type="submit" style={{padding:"8px 12px"}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
