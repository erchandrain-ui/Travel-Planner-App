import React from "react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenu }) {

  const { user, logout } = useAuth();

  return (

    <header className="navbar">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >

        <button
          className="menu-btn"
          onClick={onMenu}
        >
          ☰
        </button>

        <div className="brand">
          Wander<span>ly</span>
        </div>

      </div>

      <div className="nav-user">

        <div className="avatar">
          {user?.name?.[0]?.toUpperCase()}
        </div>

        <span className="muted">
          {user?.name}
        </span>

        <button
          className="btn btn-light"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}