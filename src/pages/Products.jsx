import React, { useState, useEffect } from 'react';
import { Package, Plus, Filter, Edit2, Trash2 } from 'lucide-react';
import '../pages/Dashboard.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <button className="btn-outline"><Filter size={18} /> Categories</button>
                    <button className="btn-primary"><Plus size={18} /> Add Product</button>
                </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 className="card-title">Product Catalog</h3>
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
                        {products.map(product => (
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
                                    ${product.price}
                                </td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                                    {product.sales.toLocaleString()} units
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

export default Products;
