// src/components/AhsDetail.jsx
import React from "react";
import Topbar from "./Topbar";
import "./Ahs.css";


const AhsDetail = ({ selectedAhs }) => {
  if (!selectedAhs) {
    return (
      <div className="ahs-detail empty">
        <p>Pilih salah satu AHS untuk melihat detail itemnya.</p>
      </div>
    );
  }

  // Hitung total HPP
  const total = selectedAhs.items.reduce(
    (sum, item) => sum + item.volume * item.hpp,
    0
  );

  return (
    <div className="ahs-detail">
      <h2 className="detail-title">{selectedAhs.title}</h2>
      <p className="detail-info">
        ID: {selectedAhs.id} • Unit: {selectedAhs.unit}
      </p>

      <div className="table-container">
        <table className="detail-table">
          <thead>
            <tr>
              <th>ITEM ID</th>
              <th>URAIAN</th>
              <th>SATUAN</th>
              <th>VOLUME</th>
              <th>HPP</th>
              <th>JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            {selectedAhs.items.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>{item.uraian}</td>
                <td>{item.satuan}</td>
                <td>{item.volume.toFixed(3)}</td>
                <td>{item.hpp.toLocaleString()}</td>
                <td>{(item.volume * item.hpp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="total-label">
                TOTAL
              </td>
              <td className="total-value">{total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AhsDetail;
