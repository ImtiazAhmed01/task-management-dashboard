import React, { useState, useEffect } from 'react';
import { Package, Plus, Filter, Edit2, Trash2, Search } from 'lucide-react';
import '../pages/Dashboard.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProductForm, setNewProductForm] = useState({ name: '', category: 'subscription', price: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/products', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || 'demo'}`
                    }
                });
                const result = await response.json();
                setProducts(Array.isArray(result) ? result : result.products || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };

        setTimeout(fetchProducts, 600);
    }, []);

    const filteredProducts = products.filter(product => {
        const nameExtracted = product.name || '';
        const matchesSearch = nameExtracted.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            ...newProductForm,
            id: Math.random().toString(36).substr(2, 9),
            price: Number(newProductForm.price) || 0,
            sales: 0
        };
        setProducts([newProduct, ...products]);
        setShowAddModal(false);
        setNewProductForm({ name: '', category: 'subscription', price: '' });
    };

    if (loading) {
        return (
            <div className="loading" style={{ height: '60vh' }}>
                <div className="spinner"></div>
                <div>Loading Products...</div>
            </div>
        );
    }

    return (
        <div style={{ padding: '1rem 0' }}>
            <div className="page-title-row">
                <div className="page-title">
                    <h1>Products & Services</h1>
                    <p>Manage your platform's offerings and pricing.</p>
                </div>
                <div className="page-actions">
                    <select
                        className="btn-outline"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ padding: '0.75rem 1rem' }}
                    >
                        <option value="all">All Categories</option>
                        <option value="subscription">Subscription</option>
                        <option value="software">Software</option>
                        <option value="service">Service</option>
                        <option value="one-time">One-Time</option>
                    </select>
                    <button className="btn-primary" onClick={() => setShowAddModal(true)}><Plus size={18} /> Add Product</button>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 className="card-title">Product Catalog</h3>
                    <div className="search-bar" style={{ width: '250px', background: '#fff', border: '1px solid #e1e4e8' }}>
                        <Search size={18} color="#8c8c8c" />
                        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f7f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Product Name</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Category</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Price</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>Total Sales</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row">
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#e8f3ee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1b5b40' }}>
                                            <Package size={20} />
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{product.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textTransform: 'capitalize' }}>
                                    <span style={{
                                        background: product.category === 'subscription' ? '#e0e7ff' : '#fef3c7',
                                        color: product.category === 'subscription' ? '#4f46e5' : '#d97706',
                                        padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600
                                    }}>
                                        {product.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>
                                    ${product.price !== undefined ? product.price : 0}
                                </td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                                    {product.sales ? product.sales.toLocaleString() : 0} units
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

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1c1d21' }}>Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Product Name</label>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newProductForm.name} onChange={e => setNewProductForm({ ...newProductForm, name: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category</label>
                                    <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newProductForm.category} onChange={e => setNewProductForm({ ...newProductForm, category: e.target.value })}>
                                        <option value="subscription">Subscription</option>
                                        <option value="software">Software</option>
                                        <option value="service">Service</option>
                                        <option value="one-time">One-Time</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Price ($)</label>
                                    <input type="number" step="0.01" min="0" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e1e4e8' }} value={newProductForm.price} onChange={e => setNewProductForm({ ...newProductForm, price: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Product</button>
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

export default Products;
