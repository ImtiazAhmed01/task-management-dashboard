import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, Bell, Mail, Settings, HelpCircle, LogOut,
    LayoutDashboard, CheckSquare, Calendar, BarChart2, Users,
    Plus, Upload, ArrowUpRight, Video, MoreHorizontal, Square, Heart, Triangle, Circle,
    Pause, Square as SquareIcon, Play
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

        // Add a slight delay for aesthetic loading presentation
        setTimeout(fetchData, 600);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading || !data) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <div>Loading Dashboard...</div>
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
        task: mockTasks[i].title,
        statusCode: mockTasks[i].status,
        statusClass: mockTasks[i].class
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
                        <li className="menu-item active">
                            <LayoutDashboard size={20} /> Dashboard
                        </li>
                        <li className="menu-item">
                            <CheckSquare size={20} /> Tasks
                            <span className="menu-badge">12+</span>
                        </li>
                        <li className="menu-item">
                            <Calendar size={20} /> Calendar
                        </li>
                        <li className="menu-item">
                            <BarChart2 size={20} /> Analytics
                        </li>
                        <li className="menu-item">
                            <Users size={20} /> Team
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

                <div className="cta-box">
                    <div className="cta-content">
                        <div style={{ background: '#fff', color: '#1b5b40', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                            <CheckSquare size={18} />
                        </div>
                        <div className="cta-title">Download our Mobile App</div>
                        <div className="cta-subtitle">Get easy in another way</div>
                        <button className="cta-btn">Download</button>
                    </div>
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

                    <div className="page-title-row">
                        <div className="page-title">
                            <h1>Dashboard</h1>
                            <p>Plan, prioritize, and accomplish your tasks with ease.</p>
                        </div>
                        <div className="page-actions">
                            <button className="btn-primary"><Plus size={18} /> Add Project</button>
                            <button className="btn-outline">Import Data</button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card featured">
                            <div className="stat-title">Total Projects</div>
                            <div className="stat-value">{overview.totalUsers.toLocaleString()}</div>
                            <div className="stat-trend"><span className="trend-badge"><ArrowUpRight size={14} /> 8%</span> Increased from last month</div>
                            <div className="stat-icon"><ArrowUpRight size={18} /></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-title">Ended Projects</div>
                            <div className="stat-value">{overview.activeUsers.toLocaleString()}</div>
                            <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><ArrowUpRight size={14} /> 6%</span> Increased from last month</div>
                            <div className="stat-icon"><ArrowUpRight size={18} /></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-title">Running Projects</div>
                            <div className="stat-value">{(overview.revenue / 1000).toFixed(0)}</div>
                            <div className="stat-trend"><span className="trend-badge" style={{ color: '#8c8c8c', background: '#f7f9fa' }}><ArrowUpRight size={14} /> 2%</span> Increased from last month</div>
                            <div className="stat-icon"><ArrowUpRight size={18} /></div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-title">Pending Project</div>
                            <div className="stat-value">{overview.growth}</div>
                            <div className="stat-trend">On Discuss</div>
                            <div className="stat-icon"><ArrowUpRight size={18} /></div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="grid-col">
                            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem' }}>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Project Analytics</h3>
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
                                    <button className="btn-meeting"><Video size={18} /> Start Meeting</button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '1.5rem' }}>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Team Collaboration</h3>
                                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px' }}><Plus size={14} style={{ marginRight: '0.2rem' }} /> Add Member</button>
                                    </div>
                                    <div className="team-list">
                                        {teamData.map((member, i) => (
                                            <div className="team-member" key={i}>
                                                <img src={`https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`} alt={member.name} className="avatar" />
                                                <div className="member-info">
                                                    <h4 className="member-name">{member.name}</h4>
                                                    <p className="member-task">{member.task}</p>
                                                </div>
                                                <span className={`status-badge ${member.statusClass}`}>{member.statusCode}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Project Progress</h3>
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
                                            <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.8rem', color: '#8c8c8c', textAlign: 'center', width: '100%' }}>Project Ended</div>
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
                                    <h3 className="card-title">Project</h3>
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
                                    <div className="time-display">01:24:08</div>
                                    <div className="tracker-controls">
                                        <button className="control-btn btn-pause"><Pause size={20} fill="currentColor" /></button>
                                        <button className="control-btn btn-stop"><SquareIcon size={16} fill="currentColor" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
