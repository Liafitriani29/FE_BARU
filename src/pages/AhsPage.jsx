import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar"; // Pastikan path ini benar
import AhsList from "../components/AhsList";
import "./AhsPage.css";
import { useNavigate } from "react-router-dom";

const AhsPage = ({ dataAhsFromApp }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  // --- State untuk Filter ---
  const [search, setSearch] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState("");
  const [filterKabupaten, setFilterKabupaten] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  const [localAhsData, setLocalAhsData] = useState([]);

  // 1. Load data localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ahsData")) || [];
    setLocalAhsData(savedData);
  }, []);

  // 2. Gabung Data
  const dataAhsWithTotals = useMemo(() => {
    const combinedData = [
      ...(dataAhsFromApp || []),
      ...(localAhsData || []),
    ];

    return combinedData.map((ahs) => {
      if (ahs.total !== undefined) return ahs;
      const total = (ahs.items || []).reduce(
        (sum, item) => sum + (item.volume || 0) * (item.hpp || 0),
        0
      );
      return { ...ahs, total };
    });
  }, [dataAhsFromApp, localAhsData]);

  // 3. Logika Filtering
  const filteredData = dataAhsWithTotals.filter((data) => {
    const matchName = (data.namaAHS || "").toLowerCase().includes(search.toLowerCase());
    
    // Cek Provinsi
    const matchProvinsi = filterProvinsi
      ? (data.provinsi || "").toLowerCase().includes(filterProvinsi.toLowerCase())
      : true;

    // Cek Kabupaten
    const matchKabupaten = filterKabupaten
      ? (data.kabupaten || "").toLowerCase().includes(filterKabupaten.toLowerCase())
      : true;

    // Cek Tahun (Convert ke string dulu)
    const matchTahun = filterTahun
      ? String(data.tahun || "").includes(filterTahun)
      : true;

    return matchName && matchProvinsi && matchKabupaten && matchTahun;
  });

  // Fungsi Aksi
  const handleEdit = (id) => navigate(`/ahs/edit/${id}`);
  
  const handleDelete = (id) => {
    if (window.confirm("Hapus data ini?")) {
      const newData = localAhsData.filter((item) => item.id !== id);
      localStorage.setItem("ahsData", JSON.stringify(newData));
      setLocalAhsData(newData);
    }
  };

  return (
    <div className="ahs-page">
      <Sidebar />
      <div className="ahs-main">
        
        {/* PENTING: Props ini yang memicu input muncul di Topbar */}
        <Topbar
          // 1. Search
          search={search}
          setSearch={setSearch}
          
          // 2. Filter Provinsi (Agar input provinsi muncul)
          filterProvinsi={filterProvinsi}
          setFilterProvinsi={setFilterProvinsi}
          
          // 3. Filter Kabupaten (Agar input kabupaten muncul)
          filterKabupaten={filterKabupaten}
          setFilterKabupaten={setFilterKabupaten}
          
          // 4. Filter Tahun (Agar input tahun muncul)
          filterTahun={filterTahun}
          setFilterTahun={setFilterTahun}
          
          // 5. Tombol & Konfigurasi
          onAddNew={() => navigate("/ahs/add")}
          templateType="ahs"
        />

        <div className="ahs-content">
          <AhsList
            data={filteredData}
            onSelect={setSelectedId}
            selectedId={selectedId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AhsPage;