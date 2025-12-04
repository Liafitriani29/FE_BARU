// src/pages/AddAHS.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../components/Notification";
import ItemDropdown from "../components/ItemDropdown";
import "./../assets/styles/AddAHS.css";

const AddAHS = ({ onAddSubmit, onEditSubmit, allItemList, allAhsData }) => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ahs: "",
    deskripsi: "",
    satuan: "",
    provinsi: "",
    kabupaten: "",
    tahun: "",
  });

  const [items, setItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedItemToAdd, setSelectedItemToAdd] = useState(null);
  const [currentItemVolume, setCurrentItemVolume] = useState(1);

  // Generate ID otomatis (mode tambah)
  useEffect(() => {
    if (!isEditMode) {
      const generateAHSId = () => {
        const randomNum = Math.floor(100 + Math.random() * 900);
        return `AHS-${randomNum}`;
      };
      setFormData((prev) => ({ ...prev, ahs: generateAHSId() }));
    }
  }, [isEditMode]);

  // Load data saat edit
  useEffect(() => {
    if (isEditMode && allAhsData) {
      const dataToEdit = allAhsData.find((item) => item.id === id);
      if (dataToEdit) {
        setFormData({
          ahs: dataToEdit.id,
          deskripsi: dataToEdit.deskripsi || "",
          satuan: dataToEdit.unit || dataToEdit.satuan || "",
          provinsi: dataToEdit.provinsi || "",
          kabupaten: dataToEdit.kabupaten || "",
          tahun: dataToEdit.tahun || "",
        });
        setItems(dataToEdit.items || []);
      } else {
        console.error("Data AHS tidak ditemukan!");
        navigate("/ahs");
      }
    }
  }, [isEditMode, id, allAhsData, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemSelect = (item) => {
    setSelectedItemToAdd(item);
  };

  const handleAddItem = () => {
    if (!selectedItemToAdd || !currentItemVolume) {
      alert("Silakan pilih item dan isi volumenya.");
      return;
    }

    const isDuplicate = items.some((item) => item.id === selectedItemToAdd.id);
    if (isDuplicate) {
      alert("Item ini sudah ada di daftar.");
      return;
    }

    const itemToSave = {
      ...selectedItemToAdd,
      uraian: selectedItemToAdd.nama || selectedItemToAdd.uraian,
      volume: Number(currentItemVolume),
      itemId: selectedItemToAdd.id,
    };
    delete itemToSave.nama;

    setItems((prevItems) => [...prevItems, itemToSave]);
    setSelectedItemToAdd(null);
    setCurrentItemVolume(1);
  };

  const handleSave = () => {
    setShowNotification(true);
  };

  const confirmSave = () => {
    setShowNotification(false);

    const ahsDataToSubmit = {
      id: formData.ahs,
      deskripsi: formData.deskripsi,
      satuan: formData.satuan,
      provinsi: formData.provinsi,
      kabupaten: formData.kabupaten,
      tahun: formData.tahun,
      items: items,
    };

    if (isEditMode) {
      onEditSubmit(ahsDataToSubmit);
    } else {
      onAddSubmit(ahsDataToSubmit);
    }

    navigate("/ahs");
  };

  return (
    <div className="add-ahs-content">

      {/* === TOMBOL BACK KOTAK ELEGAN === */}
      <button
        type="button"
        onClick={() => navigate("/ahs")}
        style={{
          background: "#ffffff",
          border: "1.5px solid #3E6DFF",
          color: "#3E6DFF",
          padding: "8px 14px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "16px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          transition: "0.2s"
        }}
      >
        <span style={{ fontSize: "18px" }}>⟵</span>
        Kembali
      </button>

      {/* === JUDUL === */}
      <h2 style={{ marginTop: "0" }}>
        {isEditMode ? "Edit Data AHS" : "Tambah Data AHS"}
      </h2>

      {/* === FORM === */}
      <form className="ahs-form">
        <label>AHS</label>
        <input
          type="text"
          name="ahs"
          value={formData.ahs}
          readOnly
          style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
        />

        <label>Deskripsi</label>
        <input
          type="text"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
        />

        <label>Satuan</label>
        <input
          type="text"
          name="satuan"
          value={formData.satuan}
          onChange={handleChange}
        />

        <label>Provinsi</label>
        <input
          type="text"
          name="provinsi"
          value={formData.provinsi}
          onChange={handleChange}
        />

        <label>Kabupaten</label>
        <input
          type="text"
          name="kabupaten"
          value={formData.kabupaten}
          onChange={handleChange}
        />

        <label>Tahun</label>
        <input
          type="text"
          name="tahun"
          value={formData.tahun}
          onChange={handleChange}
        />

        {/* === ITEM SECTION === */}
        <div className="item-section">
          <ItemDropdown
            onAdd={handleItemSelect}
            allItemList={allItemList}
            selectedItem={selectedItemToAdd}
          />

          <input
            type="number"
            className="input-volume"
            placeholder="Volume"
            value={currentItemVolume}
            onChange={(e) => setCurrentItemVolume(e.target.value)}
          />

          <button
            type="button"
            className="btn-save"
            onClick={handleAddItem}
          >
            Tambah Item
          </button>
        </div>

        {/* === ITEM LIST === */}
        <div className="item-list">
          {items.length === 0 ? (
            <p style={{ fontStyle: "italic", color: "#777" }}>
              Belum ada item ditambahkan.
            </p>
          ) : (
            <>
              <div className="item-card item-list-header">
                <span><b>ITEM ID</b></span>
                <span><b>NAMA ITEM</b></span>
                <span><b>SATUAN</b></span>
                <span><b>VOLUME</b></span>
                <span><b>HPP</b></span>
              </div>

              {items.map((item, index) => (
                <div key={index} className="item-card">
                  <span>{item.itemId}</span>
                  <span><b>{item.uraian}</b></span>
                  <span>{item.satuan}</span>
                  <span>{item.volume}</span>
                  <span>{item.hpp?.toLocaleString?.() || item.hpp}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <button type="button" className="btn-save" onClick={handleSave}>
          {isEditMode ? "Simpan Perubahan" : "Simpan AHS"}
        </button>
      </form>

      {showNotification && (
        <Notification
          message={
            isEditMode
              ? "Yakin ingin menyimpan perubahan ini?"
              : "Yakin ingin menyimpan data AHS ini?"
          }
          onConfirm={confirmSave}
          onCancel={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default AddAHS;
