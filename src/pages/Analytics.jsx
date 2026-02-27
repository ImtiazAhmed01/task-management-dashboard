import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import '../pages/Dashboard.css';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/analytics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || 'demo'}`
                    }
                });
                const result = await response.json();
                setAnalyticsData(Array.isArray(result) ? result : result.analytics || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching analytics:', err);
                setLoading(false);
            }
        };

        setTimeout(fetchAnalytics, 600);
    }, []);

    if (loading) {
        return (
            <div className="loading" style={{ height: '60vh' }}>
                <div className="spinner"></div>
                <div>Loading Analytics...</div>
            </div>
        );
    }

    const maxViews = Math.max(...analyticsData.map(d => d.views), 1);
    const maxClicks = Math.max(...analyticsData.map(d => d.clicks), 1);

    return (
        <div style={{ padding: '1rem 0' }}>
            <div className="page-title-row">
                <div className="page-title">
                    <h1>Performance Analytics</h1>
                    <p>Track your platform's growth and engagement.</p>
                </div>
                <div className="page-actions">
                    <button className="btn-outline"><Calendar size={18} /> Last 7 Days</button>
                    <button className="btn-primary"><Download size={18} /> Export Report</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card featured">
                    <div className="stat-title">Total Views</div>
                    <div className="stat-value">{analyticsData.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}</div>
                    <div className="stat-trend"><span className="trend-badge"><TrendingUp size={14} /> 12%</span> vs last week</div>
                    <div className="stat-icon"><BarChart2 size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Total Clicks</div>
                    <div className="stat-value">{analyticsData.reduce((acc, curr) => acc + curr.clicks, 0).toLocaleString()}</div>
                    <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><TrendingUp size={14} /> 4.5%</span> vs last week</div>
                    <div className="stat-icon"><BarChart2 size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Total Conversions</div>
                    <div className="stat-value">{analyticsData.reduce((acc, curr) => acc + curr.conversions, 0).toLocaleString()}</div>
                    <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><TrendingUp size={14} /> 2.1%</span> vs last week</div>
                    <div className="stat-icon"><BarChart2 size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Conversion Rate</div>
                    <div className="stat-value">
                        {((analyticsData.reduce((acc, curr) => acc + curr.conversions, 0) / Math.max(analyticsData.reduce((acc, curr) => acc + curr.views, 0), 1)) * 100).toFixed(1)}%
                    </div>
                    <div className="stat-trend">Average rate</div>
                    <div className="stat-icon"><BarChart2 size={18} /></div>
                </div>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="card" style={{ height: '400px' }}>
                    <div className="card-header">
                        <h3 className="card-title">Views and Clicks Metrics</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="legend-item"><div className="legend-dot" style={{ background: '#1b5b40' }}></div> Views</div>
                            <div className="legend-item"><div className="legend-dot" style={{ background: '#d1e6db' }}></div> Clicks</div>
                        </div>
                    </div>
                    <div className="chart-container" style={{ height: '280px', padding: '0 2rem' }}>
                        {analyticsData.map((d, i) => {
                            const viewHeight = (d.views / maxViews) * 100;
                            const clickHeight = (d.clicks / maxViews) * 100; // Relative to maxViews for comparison
                            const date = new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' });
                            return (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
                                    <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '8px', width: '60px' }}>
                                        <div className="bar-track" style={{ width: '25px', background: 'transparent', border: 'none' }}>
                                            <div className="bar-fill" style={{ height: `${viewHeight}%`, background: '#1b5b40', position: 'absolute', bottom: 0 }}></div>
                                        </div>
                                        <div className="bar-track" style={{ width: '25px', background: 'transparent', border: 'none' }}>
                                            <div className="bar-fill" style={{ height: `${clickHeight}%`, background: '#d1e6db', position: 'absolute', bottom: 0 }}></div>
                                        </div>
                                    </div>
                                    <div className="bar-x" style={{ marginTop: '1.5rem' }}>{date}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
