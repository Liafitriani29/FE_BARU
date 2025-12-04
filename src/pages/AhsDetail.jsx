import React from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ahsData } from "../data/ahsData";
import "../styles/AhsDetail.css";

const AhsDetail = () => {
  const { id } = useParams();
  const ahs = ahsData.find((a) => a.id === id);

  if (!ahs) return <p>Data tidak ditemukan</p>;

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>Detail {ahs.deskripsi}</h2>
        <p><strong>ID:</strong> {ahs.id}</p>
        <p><strong>Satuan:</strong> {ahs.satuan}</p>
        <p><strong>HPP Total:</strong> Rp {ahs.hpp.toLocaleString()}</p>

        <h3>Item dalam {ahs.id}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Uraian</th>
              <th>Satuan</th>
              <th>Volume</th>
              <th>HPP</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {ahs.items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.uraian}</td>
                <td>{item.satuan}</td>
                <td>{item.volume}</td>
                <td>{item.hpp.toLocaleString()}</td>
                <td>{item.jumlah.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/ahs" className="btn-back">Kembali</Link>
      </div>
    </div>
  );
};

export default AhsDetail;
