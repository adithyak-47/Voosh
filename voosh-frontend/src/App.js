import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signup';
import UserOrder from './components/UserOrder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <nav className="navbar">
          <ul className="navbar-links">
            <li className="navbar-link-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-link-item">
              <Link to="/signup" className="navbar-link">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='home-welcome'>
        <p>Welcome!</p>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userOrder/:userid" element={<UserOrder />} />
      </Routes>
    </Router>
  );
}

export default App;

