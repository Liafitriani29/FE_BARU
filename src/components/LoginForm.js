import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginForm.css'; // Import CSS yang sudah dibuat

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Tambahkan logika autentikasi di sini
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Header Section */}
        <div className="header-section">
          <h1 className="header-title">
            PT TTMT
          </h1>
          <p className="header-subtitle">
            Please login to your account
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingRight: '3rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;