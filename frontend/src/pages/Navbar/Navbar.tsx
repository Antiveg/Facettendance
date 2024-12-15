// src/components/Navbar.tsx

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import axios from 'axios'

const Navbar: React.FC = () => {

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:5000/auth/logout')
            navigate('/login')
        } catch (error){
            console.log('Logout failed')
        }
    }

    return (
        <nav className={styles.nav}>
            <Link to="/home" className={styles.navItem}>Home</Link>
            <Link to="/about" className={styles.navItem}>About</Link>
            <Link to="/create" className={styles.navItem}>Create</Link>
            <div className={styles.authentication}>
                <button
                onClick={() => handleClick()}
                className={styles.btn}
                >
                    <b>LOGOUT</b>
                </button>
                <button
                onClick={() => navigate('/login')}
                className={styles.btn}
                >
                    <b>LOGIN</b>
                </button>
                <button
                onClick={() => navigate('/register')}
                className={styles.btn}
                >
                    <b>REGISTER</b>
                </button>
            </div>
            <Link to="/profile" className={styles.navItem}>Profile</Link>
        </nav>
    );
};

export default Navbar;