import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "./Topbar.css";

const Topbar = ({
  search, setSearch,
  filterProvinsi, setFilterProvinsi,
  filterKab, setFilterKab,
  filterTahun, setFilterTahun,
  onAddNew,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  // Helper untuk handle change dengan aman (mencegah error jika prop tidak dikirim)
  const safeSet = (setter, value) => {
    if (setter) setter(value);
  };

  return (
    <div className="topbar-container">
      {/* BAGIAN KIRI: Input Group (Search + Filters) */}
      <div className="input">

        {/* 1. Search Bar */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="uniform-input search-with-icon"
            placeholder="Cari"
            value={search || ""}
            onChange={(e) => safeSet(setSearch, e.target.value)}
          />
        </div>

        {/* 2. Provinsi - Dipaksa Muncul */}
        <input
          className="uniform-input"
          placeholder="Provinsi"
          list="list-provinsi"
          value={filterProvinsi || ""}
          onChange={(e) => safeSet(setFilterProvinsi, e.target.value)}
        />

        {/* 3. Kabupaten - Dipaksa Muncul */}
        <input
          className="uniform-input"
          placeholder="Kab"
          value={filterKab || ""}
          onChange={(e) => safeSet(setFilterKab, e.target.value)}
        />

        {/* 4. Tahun - Dipaksa Muncul */}
        <input
          type="number"
          className="uniform-input input-tahun"
          placeholder="Tahun"
          value={filterTahun || ""}
          onChange={(e) => safeSet(setFilterTahun, e.target.value)}
        />
      </div>

      {/* BAGIAN KANAN: Tombol Aksi */}
      <div className="topbar-right">
        <button className="btn-action btn-export">📤 Ekspor</button>

        <div className="dropdown">
          <button className="btn-action btn-import" onClick={() => setShowDropdown(!showDropdown)}>
            📥 Impor ▼
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button>📄 Unduh Template</button>
              <button onClick={() => fileInputRef.current.click()}>📂 Pilih File</button>
            </div>
          )}
        </div>

        <button className="btn-action btn-new" onClick={onAddNew}>+ Baru</button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default Topbar;