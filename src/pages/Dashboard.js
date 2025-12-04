import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import { FaBoxOpen, FaIndustry, FaCalculator } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const pieData = [
    { name: "Item", value: 120 },
    { name: "Vendor", value: 15 },
    { name: "AHS", value: 35 },
  ];
  const COLORS = ["#4e73df", "#1cc88a", "#f6c23e"];

 const barData = [
  { name: "Jan", item: 20, vendor: 5, ahs: 10 },
  { name: "Feb", item: 30, vendor: 8, ahs: 12 },
  { name: "Mar", item: 25, vendor: 7, ahs: 15 },
  { name: "Apr", item: 18, vendor: 4, ahs: 9 },
  { name: "Mei", item: 22, vendor: 6, ahs: 13 },
  { name: "Jun", item: 27, vendor: 9, ahs: 11 },
  { name: "Jul", item: 32, vendor: 10, ahs: 14 },
  { name: "Agu", item: 29, vendor: 8, ahs: 12 },
  { name: "Sep", item: 24, vendor: 7, ahs: 10 },
  { name: "Okt", item: 30, vendor: 9, ahs: 15 },
  { name: "Nov", item: 28, vendor: 6, ahs: 13 },
  { name: "Des", item: 35, vendor: 11, ahs: 17 },
];


  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="dashboard-header">
          <h2>Selamat Datang  👋</h2>
        </div>

        {/* Grid 2 baris */}
        <div className="dashboard-grid">
          {/* Baris Pertama: 3 Card ringkas */}
          <div className="top-cards">
            <div className="dashboard-card">
              <FaBoxOpen className="card-icon item" />
              <h4>Jumlah Item</h4>
              <p>120</p>
            </div>

            <div className="dashboard-card">
              <FaIndustry className="card-icon vendor" />
              <h4>Jumlah Vendor</h4>
              <p>15</p>
            </div>

            <div className="dashboard-card">
              <FaCalculator className="card-icon ahs" />
              <h4>Jumlah AHS</h4>
              <p>35</p>
            </div>
          </div>

          {/* Baris Kedua: Chart */}
          <div className="bottom-cards">
            <div className="dashboard-card chart-card">
              <h4>Distribusi Data</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={80} label>
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="dashboard-card chart-card">
              <h4>Aktivitas Bulanan</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="item" fill="#4e73df" />
                  <Bar dataKey="vendor" fill="#1cc88a" />
                  <Bar dataKey="ahs" fill="#f6c23e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
