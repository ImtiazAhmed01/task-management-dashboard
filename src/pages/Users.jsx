import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Filter } from 'lucide-react';
import '../pages/Dashboard.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || 'demo'}`
                    }
                });
                const result = await response.json();
                setUsers(Array.isArray(result) ? result : result.users || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err);
                setLoading(false);
            }
        };

        setTimeout(fetchUsers, 600);
    }, []);

    if (loading) {
        return (
            <div className="loading" style={{ height: '60vh' }}>
                <div className="spinner"></div>
                <div>Loading Users...</div>
            </div>
        );
    }

    return (
        <div style={{ padding: '1rem 0' }}>
            <div className="page-title-row">
                <div className="page-title">
                    <h1>Users Management</h1>
                    <p>Manage your platform users and their access.</p>
                </div>
                <div className="page-actions">
                    <button className="btn-outline"><Filter size={18} /> Filter</button>
                    <button className="btn-primary">Add New User</button>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 className="card-title">All Users</h3>
                    <div className="search-bar" style={{ width: '250px', background: '#fff', border: '1px solid #e1e4e8' }}>
                        <Search size={18} color="#8c8c8c" />
                        <input type="text" placeholder="Search users..." />
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f7f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>User</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Join Date</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row">
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div className="user-profile" style={{ gap: '1rem' }}>
                                        <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} alt={user.name} className="avatar" style={{ width: '36px', height: '36px' }} />
                                        <div className="user-info">
                                            <span className="user-name" style={{ fontSize: '0.9rem' }}>{user.name}</span>
                                            <span className="user-email" style={{ fontSize: '0.75rem' }}>{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span className={`status-badge ${user.status === 'active' ? 'status-completed' : 'status-pending'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    {new Date(user.joinDate).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                        <button className="icon-btn" style={{ width: '32px', height: '32px' }}><Edit2 size={14} /></button>
                                        <button className="icon-btn" style={{ width: '32px', height: '32px', color: '#ff4d4f' }}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>
                {`
                    .table-row:hover { background: #f8faf9; }
                `}
            </style>
        </div>
    );
};

export default Users;
