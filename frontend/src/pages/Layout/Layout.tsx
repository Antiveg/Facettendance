import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../../global.css'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
    const location = useLocation();

    // const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const isAuthPage = false

    return (
        <div className={styles.base}>
            {!isAuthPage && <Navbar />}
            <Outlet />
        </div>
    );
};

export default Layout;
