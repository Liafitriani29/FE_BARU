import React from "react";
import { Link, useLocation } from "react-router-dom"; // 🔹 gunakan Link agar bisa navigasi tanpa reload
import "./Sidebar.css";
import LogoImg from "../assets/logo.png"; // gambar logo

const Sidebar = () => {
  const location = useLocation(); // untuk tahu halaman yang sedang aktif

  return (
    <div className="sidebar">
      <div>
        {/* 🔹 Logo */}
        <div className="logo">
          <img src={LogoImg} alt="Logo TTMT" />
          <span>TRI TUNGGAL</span>
        </div>

        {/* 🔹 Menu Navigasi */}
        <ul>
          {/* --- TAMBAHAN BARU --- */}
          <li>
            <Link
              to="/dashboard"
              className={
                location.pathname.startsWith("/dashboard") ? "active" : ""
              }
            >
              DASHBOARD
            </Link>
          </li>
          {/* --- SELESAI TAMBAHAN --- */}

          <li>
            <Link
              to="/item"
              className={location.pathname.startsWith("/item") ? "active" : ""}
            >
              ITEM
            </Link>
          </li>
          <li>
            <Link
              to="/vendor"
              className={location.pathname.startsWith("/vendor") ? "active" : ""}
            >
              VENDOR
            </Link>
          </li>
          <li>
            <Link
              to="/ahs"
              className={location.pathname.startsWith("/ahs") ? "active" : ""}
            >
              AHS
            </Link>
          </li>
        </ul>
      </div>

      {/* 🔹 Tombol Logout */}
      <div className="logout">Logout</div>
    </div>
  );
};

export default Sidebar;