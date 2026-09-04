import React from "react";

import { NavLink } from "react-router-dom";

export default function Sidebar({
  open,
  onClose
}) {

  return (

    <aside
      className={
        "sidebar " +
        (open ? "open" : "")
      }
    >

      <NavLink
        onClick={onClose}
        className="side-link"
        to="/dashboard"
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        onClick={onClose}
        className="side-link"
        to="/trips/new"
      >
        ➕ Plan a Trip
      </NavLink>

      <NavLink
        onClick={onClose}
        className="side-link"
        to="/places"
      >
        📍 Explore Places
      </NavLink>

      <NavLink
        onClick={onClose}
        className="side-link"
        to="/expenses"
      >
        💰 Expenses
      </NavLink>

    </aside>
  );
}