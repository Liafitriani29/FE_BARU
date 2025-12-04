import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "./Item.css";
const Item = () => {
  // === 1. DATA DUMMY ===
  const [items, setItems] = useState([
    {
      id: "M_001",
      ahs: "Material",
      deskripsi: "Luminer Tipe Arteri LED 150 W",
      merek: "-",
      satuan: "Bh",
      hpp: "Rp 981.000",
      vendor: "-",
      provinsi: "Jawa Tengah",
      kabupaten: "Semarang",
      tahun: "2024",
      fotoProduk: "https://via.placeholder.com/100?text=Lampu",
      deskripsiProduk: "Lampu LED hemat energi untuk penerangan jalan arteri.",
      fileSpesifikasi: "Lihat Dokumen",
      teksSpesifikasi: "• Daya: 150W\n• Tegangan: 220V",
    },
    {
      id: "M_002",
      ahs: "Jasa",
      deskripsi: "Pekerjaan Pemasangan Lampu Jalan",
      merek: "-",
      satuan: "Paket",
      hpp: "Rp 1.500.000",
      vendor: "PT Cahaya Nusantara",
      provinsi: "Jawa Barat",
      kabupaten: "Bandung",
      tahun: "2023",
      fotoProduk: "https://via.placeholder.com/100?text=Jasa",
      deskripsiProduk: "Jasa pemasangan lampu penerangan jalan.",
      fileSpesifikasi: "Lihat Dokumen",
      teksSpesifikasi: "• Tim ahli\n• Garansi 1 tahun",
    },
    {
        id: "M_003",
        ahs: "Material",
        deskripsi: "Tiang Oktagonal 9 Meter Hot Dip Galvanized",
        merek: "Krakatau Steel",
        satuan: "Btg",
        hpp: "Rp 2.150.000",
        vendor: "PT Baja Utama",
        provinsi: "Jawa Timur",
        kabupaten: "Surabaya",
        tahun: "2024",
        fotoProduk: "https://via.placeholder.com/100?text=Tiang",
        deskripsiProduk: "Tiang PJU tahan karat standar SNI.",
        fileSpesifikasi: "Lihat Dokumen",
        teksSpesifikasi: "• Tinggi: 9M\n• Tebal: 3.2mm",
      },
      {
        id: "M_004",
        ahs: "Material",
        deskripsi: "Kabel NYY 4x16mm",
        merek: "Supreme",
        satuan: "Meter",
        hpp: "Rp 45.000",
        vendor: "-",
        provinsi: "DKI Jakarta",
        kabupaten: "Jakarta Pusat",
        tahun: "2024",
        fotoProduk: "https://via.placeholder.com/100?text=Kabel",
        deskripsiProduk: "Kabel tembaga murni untuk instalasi bawah tanah.",
        fileSpesifikasi: "Lihat Dokumen",
        teksSpesifikasi: "• Tembaga Murni\n• Isolasi PVC",
      },
  ]);

  // === 2. STATE ===
  const [search, setSearch] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState("");
  const [filterKab, setFilterKab] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  // --- STATE MODAL UTAMA (SATU UNTUK SEMUA) ---
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Penanda Mode

  // State Form Data
  const [formData, setFormData] = useState({
    id: "", // ID akan diisi jika Edit, kosong jika Baru (nanti auto)
    ahs: "", deskripsi: "", merek: "", satuan: "", hpp: "",
    vendor: "", provinsi: "", kabupaten: "", tahun: "",
    fotoProduk: "", deskripsiProduk: "", fileSpesifikasi: "", teksSpesifikasi: "",
    // State tambahan untuk file upload
    fotoFile: null, docSpecFile: null
  });

  // State Detail View
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // State Dropdown & Ref
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef(null);


  // === 3. HANDLERS UTAMA ===

  // A. Buka Modal untuk TAMBAH BARU
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData({ // Reset form kosong
        id: "", ahs: "", deskripsi: "", merek: "", satuan: "", hpp: "",
        vendor: "", provinsi: "", kabupaten: "", tahun: "",
        fotoProduk: "", deskripsiProduk: "", fileSpesifikasi: "", teksSpesifikasi: "",
        fotoFile: null, docSpecFile: null
    });
    setShowModal(true);
  };

  // B. Buka Modal untuk EDIT
  const handleOpenEdit = (item) => {
    setIsEditMode(true);
    // Isi form dengan data yang dipilih
    setFormData({
        ...item,
        fotoFile: null, // Reset input file fisik saat edit
        docSpecFile: null
    });
    setShowModal(true);
  };

  // C. Logic SIMPAN (Cerdas: Edit atau Tambah)
  const handleSaveModal = () => {
    // 1. Handle Foto (Jika ada upload baru pakai blob, jika tidak pakai yg lama/placeholder)
    let fotoUrl = formData.fotoProduk;
    if (formData.fotoFile) {
        fotoUrl = URL.createObjectURL(formData.fotoFile);
    } else if (!isEditMode && !fotoUrl) {
        fotoUrl = "https://via.placeholder.com/100?text=No+Img";
    }

    // 2. Handle Nama File Dokumen
    let docName = formData.fileSpesifikasi;
    if (formData.docSpecFile) {
        docName = formData.docSpecFile.name;
    } else if (!isEditMode && !docName) {
        docName = "Lihat Dokumen";
    }

    // 3. Siapkan Object Data Akhir
    const finalData = {
        ...formData,
        hpp: formData.hpp || "Rp 0",
        fotoProduk: fotoUrl,
        fileSpesifikasi: docName,
        // Pastikan field string tidak undefined
        ahs: formData.ahs || "-",
        deskripsi: formData.deskripsi || "-",
        merek: formData.merek || "-",
        satuan: formData.satuan || "-",
        vendor: formData.vendor || "-",
        provinsi: formData.provinsi || "-",
        kabupaten: formData.kabupaten || "-",
        tahun: formData.tahun || new Date().getFullYear().toString(),
        deskripsiProduk: formData.deskripsiProduk || "-",
        teksSpesifikasi: formData.teksSpesifikasi || "-"
    };

    if (isEditMode) {
        // --- MODE EDIT: UPDATE ARRAY ---
        setItems(items.map((item) => (item.id === formData.id ? finalData : item)));
        alert(`Data ${formData.id} berhasil diperbarui!`);
    } else {
        // --- MODE TAMBAH: AUTO ID & PUSH ARRAY ---
        let newId;
        if (items.length === 0) {
            newId = "M_001";
        } else {
            const lastItem = items[items.length - 1];
            const lastIdString = lastItem.id || "M_000";
            const idPart = lastIdString.split('_')[1];
            const nextNumber = parseInt(idPart) + 1;
            newId = `M_${String(nextNumber).padStart(3, '0')}`;
        }
        
        finalData.id = newId; // Pasang ID baru
        setItems([...items, finalData]);
        alert(`Data berhasil ditambahkan dengan ID: ${newId}`);
    }

    setShowModal(false);
  };

  // D. Hapus
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  // E. View Detail
  const handleView = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  // Filter Logic
  const filteredItems = items.filter((item) => {
    const matchSearch = (item.deskripsi?.toLowerCase().includes(search.toLowerCase()) || item.id?.toLowerCase().includes(search.toLowerCase()));
    const matchProv = filterProvinsi ? item.provinsi.toLowerCase().includes(filterProvinsi.toLowerCase()) : true;
    const matchKab = filterKab ? item.kabupaten?.toLowerCase().includes(filterKab.toLowerCase()) : true;
    const matchTahun = filterTahun ? item.tahun.includes(filterTahun) : true;
    return matchSearch && matchProv && matchKab && matchTahun;
  });

  return (
    <div className="vendor-container">
      <Sidebar />

      <div className="vendor-main">

        {/* === TOPBAR === */}
        <div className="topbar-container">
          <div className="topbar-left">
            <div className="input-wrapper">
              <span className="icon-search">🔍</span>
              <input type="text" placeholder="Cari (ID/Deskripsi)" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <input type="text" placeholder="Provinsi" value={filterProvinsi} onChange={(e) => setFilterProvinsi(e.target.value)} />
            <input type="text" placeholder="Kabupaten" value={filterKab} onChange={(e) => setFilterKab(e.target.value)} />
            <input type="text" placeholder="Tahun" value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} className="input-tahun" />
          </div>

          <div className="topbar-right">
            <button className="btn-action btn-export">📥 Ekspor</button>

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

            {/* TOMBOL BARU MEMANGGIL handleOpenAdd */}
            <button className="btn-action btn-new" onClick={handleOpenAdd}>+ Baru</button>

            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => { console.log(e.target.files[0]); setShowDropdown(false); }} />
          </div>
        </div>

        {/* === TABEL ITEM === */}
        <div className="vendor-content">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>AHS</th>
                  <th>Deskripsi</th>
                  <th>Merek</th>
                  <th>Satuan</th>
                  <th>HPP</th>
                  <th>Vendor</th>
                  <th>Provinsi</th>
                  <th>Kab</th>
                  <th>Tahun</th>
                  <th>Foto</th>
                  <th>Deskripsi Produk</th>
                  <th>Spesifikasi (File & Teks)</th>
                  <th className="sticky-action">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.ahs}</td>
                    <td className="col-deskripsi">{item.deskripsi}</td>
                    <td>{item.merek}</td>
                    <td>{item.satuan}</td>
                    <td>{item.hpp}</td>
                    <td>{item.vendor}</td>
                    <td>{item.provinsi}</td>
                    <td>{item.kabupaten}</td>
                    <td>{item.tahun}</td>
                    <td>
                      <img src={item.fotoProduk} alt="img" className="table-img" />
                    </td>
                    <td className="col-desc-prod">{item.deskripsiProduk}</td>
                    <td className="col-specs">
                      <a href="#" className="link-doc">📄 {item.fileSpesifikasi}</a>
                      <div className="spec-text">{item.teksSpesifikasi}</div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-view" onClick={() => handleView(item)} title="Lihat">👁️</button>
                        {/* TOMBOL EDIT MEMANGGIL handleOpenEdit */}
                        <button className="btn-edit" onClick={() => handleOpenEdit(item)} title="Edit">✏️</button>
                        <button className="btn-delete" onClick={() => handleDelete(item.id)} title="Hapus">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === MODAL FORM (GABUNGAN TAMBAH & EDIT) === */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal" style={{ position: 'relative' }}>
              
              {/* Judul Dinamis */}
              <h3>{isEditMode ? "Edit Data Item" : "Tambah Data Item"}</h3>

              <div className="modal-body">
                {/* ID Field: Hanya muncul saat Edit (Read Only) */}
                {isEditMode && (
                    <>
                        <label>ID Item</label>
                        <input value={formData.id} disabled style={{ backgroundColor: '#eee' }} />
                    </>
                )}

                <label>AHS</label>
                <input
                  placeholder="Material / Jasa"
                  value={formData.ahs}
                  onChange={(e) => setFormData({ ...formData, ahs: e.target.value })}
                />
                <label>Deskripsi</label>
                <input
                  placeholder="Nama Item"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                />
                <label>Merek</label>
                <input
                  placeholder="Merek Produk"
                  value={formData.merek}
                  onChange={(e) => setFormData({ ...formData, merek: e.target.value })}
                />
                <label>Satuan</label>
                <input
                  placeholder="Unit (Bh, Paket, dll)"
                  value={formData.satuan}
                  onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                />
                <label>HPP</label>
                <input
                  placeholder="Harga Satuan (Rp)"
                  value={formData.hpp}
                  onChange={(e) => setFormData({ ...formData, hpp: e.target.value })}
                />
                <label>Vendor</label>
                <input
                  placeholder="Nama Vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                />
                <label>Provinsi</label>
                <input
                  placeholder="Lokasi Provinsi"
                  value={formData.provinsi}
                  onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                />
                <label>Kab</label>
                <input
                  placeholder="Lokasi Kabupaten"
                  value={formData.kabupaten}
                  onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                />
                <label>Tahun</label>
                <input
                  placeholder="Tahun Anggaran"
                  type="number"
                  value={formData.tahun}
                  onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                />
                
                {/* Upload Foto */}
                <label style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}>Upload Foto Produk</label>
                <input
                  type="file"
                  className="input-file"
                  onChange={(e) => setFormData({ ...formData, fotoFile: e.target.files[0] })}
                />
                
                <label>Deskripsi Produk</label>
                <input
                  placeholder="Detail Lengkap"
                  value={formData.deskripsiProduk}
                  onChange={(e) => setFormData({ ...formData, deskripsiProduk: e.target.value })}
                />
                
                {/* Upload Spek */}
                <label style={{ fontWeight: 'bold', marginTop: '10px', display: 'block' }}>Spesifikasi (Dokumen & Teks)</label>
                <input
                  type="file"
                  className="input-file"
                  style={{ marginBottom: '5px' }}
                  onChange={(e) => setFormData({ ...formData, docSpecFile: e.target.files[0] })}
                />
                <textarea
                  placeholder="• Daya: 150W&#10;• Tegangan: 220V"
                  rows="4"
                  style={{ width: '100%', padding: '8px' }}
                  value={formData.teksSpesifikasi}
                  onChange={(e) => setFormData({ ...formData, teksSpesifikasi: e.target.value })}
                />
              </div>

              <div className="modal-buttons">
                {/* Tombol Simpan (Dinamis Label) */}
                <button className="btn-save" onClick={handleSaveModal}>
                    {isEditMode ? "Simpan Perubahan" : "Simpan Data"}
                </button>
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL DETAIL ITEM === */}
        {showDetail && selectedItem && (
          <div className="modal-overlay">
            <div className="modal" style={{ position: 'relative' }}>
              <h3>Detail Item</h3>
              
              <div className="detail-content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <p><strong>ID:</strong> {selectedItem.id}</p>
                <p><strong>AHS:</strong> {selectedItem.ahs}</p>
                <p><strong>Deskripsi:</strong> {selectedItem.deskripsi}</p>
                <p><strong>Merek:</strong> {selectedItem.merek}</p>
                <p><strong>Satuan:</strong> {selectedItem.satuan}</p>
                <p><strong>HPP:</strong> {selectedItem.hpp}</p>
                <p><strong>Vendor:</strong> {selectedItem.vendor}</p>
                <p><strong>Provinsi:</strong> {selectedItem.provinsi}</p>
                <p><strong>Kabupaten:</strong> {selectedItem.kabupaten}</p>
                <p><strong>Tahun:</strong> {selectedItem.tahun}</p>

                <div style={{ margin: '15px 0' }}>
                    <strong>Foto Produk:</strong>
                    <br />
                    <img
                        src={selectedItem.fotoProduk}
                        alt="Foto Produk"
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                
                <p><strong>Deskripsi Produk:</strong> {selectedItem.deskripsiProduk}</p>
                
                <div style={{ margin: '10px 0' }}>
                    <strong>Spesifikasi Teknis:</strong>
                    <p><strong>File Dokumen:</strong> {selectedItem.fileSpesifikasi}</p>
                    <p style={{ whiteSpace: 'pre-line', margin: '5px 0 0 10px', color: '#555' }}>
                        {selectedItem.teksSpesifikasi}
                    </p>
                </div>
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

export default Item;