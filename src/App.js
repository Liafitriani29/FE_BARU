// src/App.js

import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ==== import halaman existing ====
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Item from "./pages/Item";
import Vendor from "./pages/Vendor";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

// ==== import halaman AHS ====
import AhsList from "./components/AhsList";
import AhsDetail from "./components/AhsDetail";
import AhsAdd from "./pages/AddAHS";

// ==== import data AHS ====
import { AHS_LIST } from "./data/ahsData";
import { ITEM_LIST } from "./data/itemData";

// ==== import Sidebar dan Topbar ====
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const [ahsData, setAhsData] = useState(AHS_LIST);

  // 🔹 Fungsi untuk MENAMBAH data (Kode Anda Aman)
  const handleAddAhs = (newAhsData) => {
    // ... (Logika Anda tidak diubah)
    const total = (newAhsData.items || []).reduce((sum, item) => {
      const itemTotal = (item.volume || 0) * (item.hpp || 0);
      return sum + itemTotal;
    }, 0);
    const dataWithTotal = { ...newAhsData, total: total };
    setAhsData((prevData) => [...prevData, dataWithTotal]);
  };

  // --- TAMBAHAN: Fungsi untuk MENGEDIT data (submit form) ---
  const handleEditAhs = (updatedAhsData) => {
    // Hitung ulang total jika item diubah
    const total = (updatedAhsData.items || []).reduce((sum, item) => {
      const itemTotal = (item.volume || 0) * (item.hpp || 0);
      return sum + itemTotal;
    }, 0);

    const dataWithTotal = { ...updatedAhsData, total: total };

    // Cari dan ganti data di state
    setAhsData((prevData) =>
      prevData.map((item) =>
        item.id === dataWithTotal.id ? dataWithTotal : item
      )
    );
  };

  // --- TAMBAHAN: Fungsi untuk MENGHAPUS data (dari list) ---
  const handleDeleteAhs = (idToDelete) => {
    // Fungsi ini akan dipanggil setelah konfirmasi di AhsPage
    setAhsData((prevData) =>
      prevData.filter((item) => item.id !== idToDelete)
    );
  };

  const [allItemData, setAllItemData] = useState(ITEM_LIST);

  return (
    <div className="app-container">
      {!isLoginPage && <Sidebar />}
      {!isLoginPage && !location.pathname.startsWith("/ahs") && <Navbar />}

      <div className={`main-content ${!isLoginPage ? "with-sidebar" : ""}`}>
        <Routes>
          {/* ==== Halaman tanpa sidebar/navbar ==== */}
          <Route path="/" element={<LoginPage />} />

          {/* ==== Halaman utama (KODE ANDA AMAN) ==== */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/item" element={<Item />} />
          <Route path="/vendor" element={<Vendor />} />

          {/* ==== Halaman AHS ==== */}

          {/* 🔹 MODIFIKASI: Kirim fungsi delete ke AhsPage */}
          <Route
            path="/ahs"
            element={
              <AhsPage
                dataAhsFromApp={ahsData}
                onDeleteAhs={handleDeleteAhs} // 🔹 Kirim fungsi Hapus
              />
            }
          />

          {/* 🔹 Rute /ahs/add (Kode Anda aman) */}
          <Route
            path="/ahs/add"
            element={
              <AhsAdd
                onAddSubmit={handleAddAhs}
                allItemList={allItemData}
              />
            }
          />

          {/* --- TAMBAHAN: Route baru untuk /ahs/edit/:id --- */}
          <Route
            path="/ahs/edit/:id"
            element={
              <AhsAdd // 🔹 Kita pakai ulang komponen 'AhsAdd'
                onEditSubmit={handleEditAhs} // 🔹 Kirim fungsi Edit
                allItemList={allItemData} // 🔹 Tetap kirim item list
                allAhsData={ahsData} // 🔹 Kirim SEMUA data AHS
              />
            }
          />

          {/* (Rute /ahs/:id Anda aman) */}
          <Route path="/ahs/:id" element={<AhsDetail />} />

          {/* ==== fallback route (Kode Anda aman) ==== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

// ==== Komponen gabungan untuk halaman AHS ====
// --- MODIFIKASI: AhsPage sekarang menerima onDeleteAhs ---
function AhsPage({ dataAhsFromApp, onDeleteAhs }) {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  // (useMemo Anda aman)
  const dataAhsWithTotals = useMemo(() => {
    return dataAhsFromApp.map((ahs) => {
      if (ahs.total !== undefined) return ahs;
      const total = (ahs.items || []).reduce((sum, item) => {
        const itemTotal = (item.volume || 0) * (item.hpp || 0);
        return sum + itemTotal;
      }, 0);
      return { ...ahs, total: total };
    });
  }, [dataAhsFromApp]);

  // State untuk filter di Topbar
  const [search, setSearch] = useState("");
  // ... (filter state lainnya) ...

  // (Logika filter Anda aman)
  const filteredData = dataAhsWithTotals.filter((data) =>
    (data.uraian || "").toLowerCase().includes(search.toLowerCase())
  );

  // --- TAMBAHAN: Fungsi handleEdit (untuk navigasi) ---
  const handleEdit = (id) => {
    navigate(`/ahs/edit/${id}`);
  };

  // --- TAMBAHAN: Fungsi handleDelete (meneruskan ke AppContent) ---
  const handleDelete = (id) => {
    // Konfirmasi ditaruh di sini
    if (window.confirm("Apakah Anda yakin ingin menghapus data AHS ini?")) {
      onDeleteAhs(id); // Panggil fungsi dari AppContent
      if (selectedId === id) {
        setSelectedId(null); // Tutup detail jika item dihapus
      }
    }
  };

  return (
    <div className="ahs-page">
      <Topbar
        search={search}
        setSearch={setSearch}
        // ... (props filter lainnya) ...
        onAddNew={() => navigate("/ahs/add")}
        templateType="AHS"
      />

      {/* --- MODIFIKASI: AhsList sekarang dikirim onEdit dan onDelete --- */}
      <AhsList
        data={filteredData}
        onSelect={setSelectedId}
        selectedId={selectedId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;