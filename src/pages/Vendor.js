import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "./Vendor.css";

const Vendor = () => {
  // === 1. DATA DUMMY ===
  const [vendors, setVendors] = useState([
    {
      id: "V_001",
      name: "FOKUS INDO LIGHTING, PT",
      contact: "-",
      phone: "-",
      email: "-",
      provinsi: "Jakarta",
      kabupaten: "Jakarta Selatan",
      tahun: "2024",
    },
    {
      id: "V_002",
      name: "PT Cahaya Nusantara",
      contact: "Andi",
      phone: "08123456789",
      email: "info@cahaya.co.id",
      provinsi: "Jawa Barat",
      kabupaten: "Bandung",
      tahun: "2023",
    },
    {
      id: "V_003",
      name: "PT Surya Abadi",
      contact: "Budi",
      phone: "08129876543",
      email: "budi@suryaabadi.com",
      provinsi: "Jawa Barat",
      kabupaten: "Bogor",
      tahun: "2025",
    },
  ]);

  // === 2. STATE ===

  // State untuk Modal Input (Satu untuk Tambah & Edit)
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "", name: "", contact: "", phone: "", email: "", provinsi: "", kabupaten: "", tahun: ""
  });

  // State untuk Detail View
  const [showDetail, setShowDetail] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Filter States
  const [search, setSearch] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState("");
  const [filterKab, setFilterKab] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  // Dropdown & Ref
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);

  // === 3. LOGIC FILTER ===
  const filteredVendors = vendors.filter((v) => {
    const name = v.name?.toLowerCase() || "";
    const id = v.id?.toLowerCase() || "";
    const provinsi = v.provinsi?.toLowerCase() || "";
    // Safety check agar tidak error jika field kosong
    const kab = v.kabupaten?.toLowerCase() || "";
    const tahun = v.tahun?.toLowerCase() || "";

    const matchesSearch = name.includes(search.toLowerCase()) || id.includes(search.toLowerCase());
    const matchesProvinsi = filterProvinsi ? provinsi.includes(filterProvinsi.toLowerCase()) : true;
    const matchesKab = filterKab ? kab.includes(filterKab.toLowerCase()) : true;
    const matchesTahun = filterTahun ? tahun.includes(filterTahun.toLowerCase()) : true;

    return matchesSearch && matchesProvinsi && matchesKab && matchesTahun;
  });

  // === 4. HANDLERS (LOGIC UTAMA) ===

  // A. Buka Modal untuk TAMBAH BARU
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData({ // Reset form kosong
      id: "", name: "", contact: "", phone: "", email: "", provinsi: "", kabupaten: "", tahun: ""
    });
    setShowModal(true);
  };

  // B. Buka Modal untuk EDIT
  const handleOpenEdit = (vendor) => {
    setIsEditMode(true);
    setFormData(vendor); // Isi form dengan data yang dipilih
    setShowModal(true);
  };

  // C. Logic SIMPAN (Menangani Tambah & Edit sekaligus)
  const handleSave = () => {
    if (isEditMode) {
      // --- LOGIC EDIT ---
      setVendors(vendors.map((v) => (v.id === formData.id ? formData : v)));
      alert(`Data vendor ${formData.id} berhasil diperbarui!`);
    } else {
      // --- LOGIC TAMBAH BARU (AUTO ID) ---
      let newId;
      if (vendors.length === 0) {
        newId = "V_001";
      } else {
        const lastVendor = vendors[vendors.length - 1];
        const lastIdString = lastVendor.id || "V_000";
        const idPart = lastIdString.split('_')[1];
        const nextNumber = parseInt(idPart) + 1;
        newId = `V_${String(nextNumber).padStart(3, '0')}`;
      }

      const vendorToAdd = {
        ...formData,
        id: newId,
        tahun: formData.tahun || new Date().getFullYear().toString()
      };

      setVendors([...vendors, vendorToAdd]);
      alert(`Vendor berhasil ditambahkan dengan ID: ${newId}`);
    }

    // Reset & Tutup
    setShowModal(false);
    setFormData({ id: "", name: "", contact: "", phone: "", email: "", provinsi: "", kabupaten: "", tahun: "" });
  };

  // D. Logic View Detail
  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetail(true);
  };

  // E. Logic Hapus
  const handleDelete = (id) => {
    if (window.confirm("Hapus vendor ini?")) {
      setVendors(vendors.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="vendor-container">
      <Sidebar />

      <div className="vendor-main">

        {/* === TOPBAR === */}
        <div className="topbar-container">
          <div className="topbar-left">
            <div className="input-wrapper">
              <span className="icon-search">🔍</span>
              <input
                type="text"
                placeholder="Cari"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <input placeholder="Provinsi" value={filterProvinsi} onChange={(e) => setFilterProvinsi(e.target.value)} />
            <input placeholder="Kab" value={filterKab} onChange={(e) => setFilterKab(e.target.value)} />
            <input placeholder="Tahun" value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} className="input-tahun" />
          </div>

          <div className="topbar-right">
            <button className="btn-action btn-export">📤 Ekspor</button>

            <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
              <button className="btn-action btn-import" onClick={() => setShowDropdown(!showDropdown)}>
                📥 Impor ▼
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={() => alert("Unduh Template Logic")}>📄 Unduh Template</button>
                  <button onClick={() => fileInputRef.current.click()}>📂 Pilih File</button>
                </div>
              )}
            </div>

            {/* TOMBOL + BARU (Memicu handleOpenAdd) */}
            <button className="btn-action btn-new" onClick={handleOpenAdd}>
              + Baru
            </button>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => { console.log(e.target.files[0]); setShowDropdown(false); }}
            />
          </div>
        </div>

        {/* === TABEL === */}
        <div className="vendor-content">
          <div className="table-responsive">
            <table className="vendor-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vendor Name</th>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Provinsi</th>
                  <th>Kab</th>
                  <th>Tahun</th>
                  <th className="sticky-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((v) => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td className="col-name">{v.name}</td>
                      <td>{v.contact}</td>
                      <td>{v.phone}</td>
                      <td>{v.email}</td>
                      <td>{v.provinsi}</td>
                      <td>{v.kabupaten}</td>
                      <td>{v.tahun}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-view" onClick={() => handleView(v)} title="Lihat">👁️</button>
                          {/* TOMBOL EDIT (Memicu handleOpenEdit) */}
                          <button className="btn-edit" onClick={() => handleOpenEdit(v)} title="Edit">✏️</button>
                          <button className="btn-delete" onClick={() => handleDelete(v.id)} title="Hapus">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* === SATU MODAL UNTUK TAMBAH & EDIT === */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal" style={{ position: 'relative' }}>

              {/* Judul Dinamis */}
              <h3>{isEditMode ? "Edit Data Vendor" : "Tambah Data Vendor"}</h3>

              <div className="modal-body">

                {/* ID hanya muncul saat Edit (Read Only), saat Tambah disembunyikan (Auto) */}
                {isEditMode && (
                  <>
                    <label>ID Vendor</label>
                    <input value={formData.id} disabled style={{ backgroundColor: '#eee' }} />
                  </>
                )}

                <label>Nama Vendor</label>
                <input
                  placeholder="Nama Perusahaan/Vendor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <label>Kontak Person</label>
                <input
                  placeholder="Nama PIC"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />

                <label>Telepon</label>
                <input
                  placeholder="Nomor Telepon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <label>Email</label>
                <input
                  placeholder="Alamat Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <label>Provinsi</label>
                <input
                  placeholder="Provinsi"
                  value={formData.provinsi}
                  onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                />

                <label>Kab</label>
                <input
                  placeholder="Kabupaten/Kota"
                  value={formData.kabupaten}
                  onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                />

                <label>Tahun</label>
                <input
                  type="number"
                  placeholder="Tahun Terdaftar"
                  value={formData.tahun}
                  onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                />
              </div>

              <div className="modal-buttons">
                {/* Tombol Simpan memicu logic yang sama, tapi bercabang di dalamnya */}
                <button className="btn-save" onClick={handleSave}>
                  {isEditMode ? "Simpan Perubahan" : "Simpan Data"}
                </button>
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
              </div>

            </div>
          </div>
        )}

        {/* === MODAL DETAIL VIEW (READ ONLY) === */}
        {showDetail && selectedVendor && (
          <div className="modal-overlay">
            <div className="modal" style={{ position: 'relative' }}>
              <h3>Detail Vendor</h3>
              <div className="detail-content">
                <p><strong>ID:</strong> {selectedVendor.id}</p>
                <p><strong>Name:</strong> {selectedVendor.name}</p>
                <p><strong>Contact:</strong> {selectedVendor.contact}</p>
                <p><strong>Phone:</strong> {selectedVendor.phone}</p>
                <p><strong>Email:</strong> {selectedVendor.email}</p>
                <p><strong>Provinsi:</strong> {selectedVendor.provinsi}</p>
                <p><strong>Kabupaten:</strong> {selectedVendor.kabupaten}</p>
                <p><strong>Tahun:</strong> {selectedVendor.tahun}</p>
              </div>
              <div className="modal-buttons">
                    <button className="btn-cancel" onClick={() => setShowDetail(false)}>Tutup</button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendor;