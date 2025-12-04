// src/components/ItemDropdown.jsx

import React, { useState, useEffect } from "react";
import "./ItemDropdown.css";

// Terima prop 'selectedItem' dari parent (AddAHS)
const ItemDropdown = ({ onAdd, allItemList, selectedItem }) => {
  const itemsData = allItemList || [];

  // State internal untuk mengontrol dropdown
  const [internalSelected, setInternalSelected] = useState("");

  // Sinkronkan state internal jika prop 'selectedItem' dari parent berubah
  // (Ini penting agar bisa di-reset)
  useEffect(() => {
    if (!selectedItem) {
      setInternalSelected("");
    }
  }, [selectedItem]);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    setInternalSelected(selectedId); // Update state internal

    const item = itemsData.find((i) => i.id === selectedId);
    if (item) {
      onAdd(item); // Kirim objek item lengkap ke AddAHS
    } else {
      onAdd(null); // Kirim null jika "Pilih Item" dipilih
    }
  };

  return (
    <div className="item-dropdown-container">
      <select value={internalSelected} onChange={handleSelect}>
        <option value="">Pencarian</option>
        {itemsData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id} - {item.nama || item.uraian}
          </option>
        ))}
      </select>
      
      {/* Tombol "Tambah Item" DIHAPUS DARI SINI */}
      
    </div>
  );
};

export default ItemDropdown;