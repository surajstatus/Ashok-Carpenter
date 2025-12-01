import React from 'react'
import { Link } from 'react-router-dom';
import "../components/ImageCard.css";

const Navbar = () => {
    return (
        <div>
            <nav
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    backgroundColor: "#333",
                    color: "#fff",
                }}
            >
                {/* Left side: Logo */}
                <Link
                    to="/"
                    style={{
                        color: "#fff",
                        fontSize: "30px",
                        fontWeight: "bold",
                        textDecoration: "none",
                    }}
                >
                    MyPortfolio
                </Link>

                {/* Right side: Admin Login Button */}
                <Link
                    to="/login"
                    style={{
                        backgroundColor: "#555",
                        color: "#fff",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    Admin Login
                </Link>
            </nav>

            <nav className="subnavbar" style={{ padding: 10, borderBottom: "1px solid #eee", marginTop: 30, display: "flex", justifyContent: "center", backgroundColor: "#fff" }}>

                <Link className='snav' to="/about" style={{ marginRight: 10 }}>About</Link>
                <Link className='snav' to="/services" style={{ marginRight: 10 }}>Services</Link>
                <Link className='snav' to="/reviews" style={{ marginRight: 10 }}>Reviews</Link>
                <Link className='snav' to="/" style={{ marginRight: 10 }}>Gallery</Link>
                <Link className='snav' to="/contact">Contact</Link>
            </nav>
        </div>
    )
}

export default Navbar
