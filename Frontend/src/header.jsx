import React from 'react';
import './header.css'; // Styling for the header
function Header() {
  return (
    <header className="header">
      <div className="logo-section">
        <img src="image/Budget-removebg-preview.png" alt="Website Logo" className="logo" />
      </div>


      <nav className="nav-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/expense">Tracking</a>
        <a href="/budgetsetting">Budget</a>
        <a href="/report">Reports</a>
        <a href="/settings">Settings</a>
      </nav>

      {/* User icon on the right */}
      <div className="user-icon">
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
}

export default Header;
