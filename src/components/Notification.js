import React from "react";
import "./Notification.css";

const Notification = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-box">
        <p>{message}</p>
        <div className="notification-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Ya, Simpan</button>
          <button className="btn-cancel" onClick={onCancel}>Batal</button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
