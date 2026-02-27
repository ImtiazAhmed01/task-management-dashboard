import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, ArrowUpRight, Video, MoreHorizontal, Square, Heart, Triangle, Circle,
    LayoutDashboard, Pause, Play, Square as SquareIcon
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardHome = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Timer state
    const [time, setTime] = useState(0); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Format time function
    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    // Timer controls
    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        setIsRunning(!isRunning);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTime(0);
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || 'demo'}`
                    }
                });
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setLoading(false);
            }
        };

        setTimeout(fetchData, 600);
    }, []);

    if (loading || !data) {
        return (
            <div className="loading" style={{ height: '60vh' }}>
                <div className="spinner"></div>
                <div>Loading Overview...</div>
            </div>
        );
    }

    const { overview, users, analytics } = data;

    const mockTasks = [
        { title: 'Working on Github Project Repository', status: 'Completed', class: 'status-completed' },
        { title: 'Working on Integrate User Authentication System', status: 'In Progress', class: 'status-inprogress' },
        { title: 'Working on Develop Search and Filter Functionality', status: 'Pending', class: 'status-pending' },
        { title: 'Working on Responsive Layout for Homepage', status: 'In Progress', class: 'status-inprogress' },
    ];

    const teamData = users.slice(0, 4).map((u, i) => ({
        ...u,
        task: mockTasks[i]?.title || 'Working on tasks',
        statusCode: mockTasks[i]?.status || 'In Progress',
        statusClass: mockTasks[i]?.class || 'status-inprogress'
    }));

    const chartData = analytics.slice(-7);
    const maxViews = Math.max(...chartData.map(d => d.views));

    const projectList = [
        { name: 'Develop API Endpoints', date: 'Due date: Nov 26, 2024', icon: <Triangle color="#4f46e5" fill="#e0e7ff" size={20} />, bg: '#e0e7ff' },
        { name: 'Onboarding Flow', date: 'Due date: Nov 28, 2024', icon: <Circle color="#059669" fill="#d1fae5" size={20} />, bg: '#d1fae5' },
        { name: 'Build Dashboard', date: 'Due date: Nov 30, 2024', icon: <Square color="#d97706" fill="#fef3c7" size={20} />, bg: '#fef3c7' },
        { name: 'Optimize Page Load', date: 'Due date: Dec 5, 2024', icon: <Heart color="#e11d48" fill="#ffe4e6" size={20} />, bg: '#ffe4e6' },
        { name: 'Cross-Browser Testing', date: 'Due date: Dec 6, 2024', icon: <LayoutDashboard color="#7c3aed" fill="#ede9fe" size={20} />, bg: '#ede9fe' },
    ];

    return (
        <>
            <div className="page-title-row">
                <div className="page-title">
                    <h1>Overview</h1>
                    <p>Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
                <div className="page-actions">
                    <button className="btn-primary"><Plus size={18} /> Add Target</button>
                    <button className="btn-outline">Import Data</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card featured">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{overview.totalUsers.toLocaleString()}</div>
                    <div className="stat-trend"><span className="trend-badge"><ArrowUpRight size={14} /> 8%</span> Increased from last month</div>
                    <div className="stat-icon"><ArrowUpRight size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Active Users</div>
                    <div className="stat-value">{overview.activeUsers.toLocaleString()}</div>
                    <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><ArrowUpRight size={14} /> 6%</span> Increased from last month</div>
                    <div className="stat-icon"><ArrowUpRight size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${(overview.revenue / 1000).toFixed(0)}k</div>
                    <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><ArrowUpRight size={14} /> 2%</span> Increased from last month</div>
                    <div className="stat-icon"><ArrowUpRight size={18} /></div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Growth</div>
                    <div className="stat-value">{overview.growth}%</div>
                    <div className="stat-trend">Steady</div>
                    <div className="stat-icon"><ArrowUpRight size={18} /></div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="grid-col">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem' }}>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Analytics Overview</h3>
                                <MoreHorizontal size={20} color="#8c8c8c" cursor="pointer" />
                            </div>
                            <div className="chart-container">
                                {chartData.map((d, i) => {
                                    const height = (d.views / maxViews) * 100;
                                    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                                    const isHighlighted = i === 3;
                                    return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
                                            <div className="bar-track">
                                                {isHighlighted ? (
                                                    <div className="bar-fill" style={{ height: `${height}%`, background: '#1b5b40', position: 'absolute', bottom: 0 }}></div>
                                                ) : (
                                                    <div className="bar-fill" style={{ height: `${height}%`, background: 'rgba(27, 91, 64, 0.8)', position: 'absolute', bottom: 0, opacity: i % 2 === 0 ? 0.3 : 1 }}></div>
                                                )}
                                            </div>
                                            <div className="bar-x">{days[i]}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="card reminder-card">
                            <div className="card-header">
                                <h3 className="card-title" style={{ fontSize: '1rem' }}>Reminders</h3>
                            </div>
                            <h4 className="reminder-title">Meeting with Arc<br />Company</h4>
                            <div className="reminder-time">Time : 02.00 pm - 04.00 pm</div>
                            <button className="btn-meeting" onClick={() => setShowModal(true)}>
                                <Video size={18} /> Start Meeting
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '1.5rem' }}>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Users List</h3>
                                <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px' }}><Plus size={14} style={{ marginRight: '0.2rem' }} /> Add</button>
                            </div>
                            <div className="team-list">
                                {teamData.map((member, i) => (
                                    <div className="team-member" key={i}>
                                        <img src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`} alt={member.name} className="avatar" />
                                        <div className="member-info">
                                            <h4 className="member-name">{member.name}</h4>
                                            <p className="member-task">{member.email}</p>
                                        </div>
                                        <span className={`status-badge ${member.statusClass}`}>{member.statusCode}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Progress</h3>
                            </div>
                            <div className="donut-chart-container">
                                <div style={{ width: '180px', height: '180px', marginTop: '0.5rem', position: 'relative' }}>
                                    <CircularProgressbar
                                        value={41}
                                        text={`41%`}
                                        styles={buildStyles({
                                            pathColor: '#1b5b40',
                                            textColor: '#1c1d21',
                                            trailColor: '#f7f9fa',
                                            backgroundColor: '#fff',
                                            textSize: '22px',
                                            strokeLinecap: 'butt',
                                        })}
                                        strokeWidth={14}
                                        circleRatio={0.7}
                                        className="custom-donut"
                                    />
                                    <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.8rem', color: '#8c8c8c', textAlign: 'center', width: '100%' }}>Task Ended</div>
                                </div>

                                <div className="donut-legend">
                                    <div className="legend-item"><div className="legend-dot" style={{ background: '#1b5b40' }}></div> Completed</div>
                                    <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(27, 91, 64, 0.4)' }}></div> In Progress</div>
                                    <div className="legend-item">
                                        <div className="legend-dot" style={{
                                            background: 'repeating-linear-gradient(45deg, #e1e4e8, #e1e4e8 2px, #fff 2px, #fff 4px)'
                                        }}></div> Pending
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-col">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Quick Actions</h3>
                            <button className="btn-outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', borderRadius: '12px' }}><Plus size={14} style={{ marginRight: '0.2rem' }} /> New</button>
                        </div>
                        <div className="project-list">
                            {projectList.map((project, i) => (
                                <div className="project-item" key={i}>
                                    <div className="project-icon" style={{ background: project.bg }}>
                                        {project.icon}
                                    </div>
                                    <div className="project-info">
                                        <h4>{project.name}</h4>
                                        <p>{project.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="time-tracker">
                        <div className="tracker-content">
                            <div className="tracker-title">Time Tracker</div>
                            <div className="time-display">{formatTime(time)}</div>
                            <div className="tracker-controls">
                                <button className="control-btn btn-pause" onClick={toggleTimer}>
                                    {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                </button>
                                <button className="control-btn btn-stop" onClick={stopTimer}>
                                    <SquareIcon size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1rem', color: '#1c1d21' }}>Starting Meeting...</h2>
                        <p style={{ color: '#8c8c8c', marginBottom: '2rem' }}>Connecting to Arc Company video bridge.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button className="btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={() => setShowModal(false)}>Join Audio</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardHome;
