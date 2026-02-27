import React, { useState, useEffect } from 'react';
import { Search, Edit2, Trash2, Filter } from 'lucide-react';
import '../pages/Dashboard.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'user', status: 'active' });

    const fetchUserDetail = async (id) => {
        setLoadingUser(true);
        setSelectedUser({ id });
        try {
            const response = await fetch(`https://task-api-eight-flax.vercel.app/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || 'demo'}`
                }
            });
            const result = await response.json();
            setSelectedUser(result.user || result);
        } catch (err) {
            console.error('Error fetching user detail:', err);
        } finally {
            setLoadingUser(false);
        }
    };

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

    const filteredUsers = users.filter(user => {
        const nameExtracted = user.name || '';
        const emailExtracted = user.email || '';
        const matchesSearch = nameExtracted.toLowerCase().includes(searchTerm.toLowerCase()) || emailExtracted.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        const newUser = {
            ...newUserForm,
            id: Math.random().toString(36).substr(2, 9),
            joinDate: new Date().toISOString()
        };
        setUsers([newUser, ...users]);
        setShowAddModal(false);
        setNewUserForm({ name: '', email: '', role: 'user', status: 'active' });
    };

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
                    <select
                        className="btn-outline"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '0.75rem 1rem' }}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button className="btn-primary" onClick={() => setShowAddModal(true)}>Add New User</button>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 className="card-title">All Users</h3>
                    <div className="search-bar" style={{ width: '250px', background: '#fff', border: '1px solid #e1e4e8' }}>
                        <Search size={18} color="#8c8c8c" />
                        <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                        {filteredUsers.map(user => (
                            <tr key={user.id}
                                style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }}
                                className="table-row"
                                onClick={() => fetchUserDetail(user.id)}
                            >
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

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {loadingUser ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                                <div className="spinner" style={{ marginBottom: '1rem' }}></div>
                                <div style={{ color: '#8c8c8c' }}>Loading user data...</div>
                            </div>
                        ) : selectedUser.name ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <img src={`https://ui-avatars.com/api/?name=${selectedUser.name.replace(' ', '+')}&size=80&background=random`} alt={selectedUser.name} className="avatar" style={{ width: '80px', height: '80px' }} />
                                    <div>
                                        <h2 style={{ margin: 0, color: '#1c1d21' }}>{selectedUser.name}</h2>
                                        <p style={{ margin: '0.2rem 0 0 0', color: '#8c8c8c' }}>{selectedUser.email}</p>
                                    </div>
                                </div>
                                <div style={{ background: '#f7f9fa', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ color: '#8c8c8c' }}>Status</span>
                                        <strong>{selectedUser.status}</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#8c8c8c' }}>Join Date</span>
                                        <strong>{selectedUser.joinDate ? new Date(selectedUser.joinDate).toLocaleDateString() : 'N/A'}</strong>
                                    </div>
                                    {selectedUser.role && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                            <span style={{ color: '#8c8c8c' }}>Role</span>
                                            <strong style={{ textTransform: 'capitalize' }}>{selectedUser.role}</strong>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={() => setSelectedUser(null)}>Close</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                                Failed to load user details.
                                <div style={{ marginTop: '1rem' }}>
                                    <button className="btn-primary" onClick={() => setSelectedUser(null)}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1c1d21' }}>Add New User</h2>
                        <form onSubmit={handleAddUser}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Name</label>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email</label>
                                <input type="email" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Role</label>
                                    <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newUserForm.role} onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status</label>
                                    <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newUserForm.status} onChange={e => setNewUserForm({ ...newUserForm, status: e.target.value })}>
                                        <option value="active">Active</option>
                                        <option value="pending">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>
                {`
                    .table-row:hover { background: #f8faf9; }
                `}
            </style>
        </div>
    );
};

export default Users;
