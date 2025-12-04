import React from "react";
import AhsDetail from "./AhsDetail";
import "./AhsList.css";

const AhsList = ({ data, onSelect, selectedId, onEdit, onDelete }) => {
  
  // --- PERBAIKAN DI SINI (LOGIKA TOGGLE) ---
  const handleViewClick = (e, id) => {
    e.stopPropagation();
    
    // Cek apakah ID yang diklik adalah ID yang sedang terbuka
    if (id === selectedId) {
      onSelect(null); // Jika ya, tutup (kirim null)
    } else {
      onSelect(id);   // Jika tidak, buka detail baru
    }
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  const calculateTotal = (items = []) => {
    return items.reduce(
        (sum, item) =>
            sum +
            (Number(item.volume) || 1) *
            (Number(item.hpp) || 0), 
        0
    ).toLocaleString('id-ID'); 
  };

  return (
    <div className="ahs-list-container">
      <div className="table-responsive">
        <table className="ahs-table">
          <thead>
            <tr>
              <th>AHS</th>
              <th>Deskripsi</th>
              <th>Satuan</th>
              <th>Provinsi</th>
              <th>Kabupaten</th>
              <th>Tahun</th>
              <th>Harga Pokok Total</th>
              <th className="sticky-action">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ahs) => (
              <React.Fragment key={ahs.id}>
                {/* === BARIS UTAMA === */}
                <tr
                  className={`ahs-row ${ahs.id === selectedId ? "active" : ""}`}
                >
                  <td>{ahs.id}</td>
                  <td className="col-deskripsi">{ahs.deskripsi || "-"}</td>
                  <td>{ahs.unit || ahs.satuan || "-"}</td>
                  <td>{ahs.provinsi || "-"}</td>
                  <td>{ahs.kabupaten || "-"}</td>
                  <td>{ahs.tahun || "-"}</td>
                  <td className="col-hpp">
                    Rp {calculateTotal(ahs.items)}
                  </td>

                  {/* === Kolom Aksi === */}
                  <td className="ahs-actions">
                    <button
                      className="btn-icon btn-view"
                      title={ahs.id === selectedId ? "Tutup Detail" : "Lihat Detail"}
                      onClick={(e) => handleViewClick(e, ahs.id)}
                    >
                      {/* Ikon berubah jika sedang terbuka (Opsional, tapi bagus untuk UX) */}
                      {ahs.id === selectedId ? "❌" : "👁️"} 
                    </button>
                    
                    <button
                      className="btn-icon btn-edit"
                      title="Edit AHS"
                      onClick={(e) => handleEditClick(e, ahs.id)}
                    >
                      ✏️
                    </button>

                    <button
                      className="btn-icon btn-delete"
                      title="Hapus AHS"
                      onClick={(e) => handleDeleteClick(e, ahs.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>

                {/* === BARIS DETAIL === */}
                {ahs.id === selectedId && (
                  <tr className="ahs-detail-row">
                    <td colSpan="8">
                      <AhsDetail selectedAhs={ahs} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {/* Jika tidak ada data */}
            {data.length === 0 && (
              <tr>
                <td colSpan="8" className="no-data-cell">
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AhsList;