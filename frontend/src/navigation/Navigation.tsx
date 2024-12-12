import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../pages/Layout/Layout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Create from '../pages/Create/Create';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="create" element={<Create />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default Navigation