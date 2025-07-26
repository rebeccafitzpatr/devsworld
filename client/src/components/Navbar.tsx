import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    
    return (
      <nav className="navbar">
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/learningpath">Learning Path</Link>
          </li>
            <Link to="/practice">Practice</Link>
                <Link to="/practice-progress">Progress</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <li>
                  <Link className="nav-link text-dark" to="/friends">Friends</Link>
                </li>
        </ul>
      </nav>
    );
};