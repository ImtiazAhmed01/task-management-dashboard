import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Search, Bell, Mail, Settings, HelpCircle, LogOut,
    LayoutDashboard, CheckSquare, BarChart2, Users, Package
} from 'lucide-react';
import '../pages/Dashboard.css';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getMenuClass = (path) => {
        // Exact path for dashboard
        if (path === '/dashboard' && location.pathname === '/dashboard') return 'menu-item active';
        // Nested paths
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return 'menu-item active';
        return 'menu-item';
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo-container">
                    <div className="logo-icon">
                        <CheckSquare size={18} strokeWidth={3} />
                    </div>
                    Donezo
                </div>

                <div className="menu-section">
                    <div className="menu-title">Menu</div>
                    <ul className="menu-list">
                        <li className={getMenuClass('/dashboard')} onClick={() => navigate('/dashboard')}>
                            <LayoutDashboard size={20} /> Dashboard
                        </li>
                        <li className={getMenuClass('/dashboard/users')} onClick={() => navigate('/dashboard/users')}>
                            <Users size={20} /> Users
                        </li>
                        <li className={getMenuClass('/dashboard/analytics')} onClick={() => navigate('/dashboard/analytics')}>
                            <BarChart2 size={20} /> Analytics
                        </li>
                        <li className={getMenuClass('/dashboard/products')} onClick={() => navigate('/dashboard/products')}>
                            <Package size={20} /> Products
                        </li>
                    </ul>
                </div>

                <div className="menu-section">
                    <div className="menu-title">General</div>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Settings size={20} /> Settings
                        </li>
                        <li className="menu-item">
                            <HelpCircle size={20} /> Help
                        </li>
                        <li className="menu-item" onClick={handleLogout} style={{ color: '#ef4444' }}>
                            <LogOut size={20} /> Logout
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-container">
                <div className="main-content">
                    <div className="header">
                        <div className="search-bar">
                            <Search size={20} color="#8c8c8c" />
                            <input type="text" placeholder="Search task" />
                            <span className="search-shortcut">⌘ F</span>
                        </div>
                        <div className="header-right">
                            <button className="icon-btn"><Mail size={18} /></button>
                            <button className="icon-btn"><Bell size={18} /></button>
                            <div className="user-profile">
                                <img src={`https://ui-avatars.com/api/?name=Totok+Michael&background=random`} alt="User" className="avatar" />
                                <div className="user-info">
                                    <span className="user-name">Totok Michael</span>
                                    <span className="user-email">tmichael20@mail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
