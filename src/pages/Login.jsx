import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://task-api-eight-flax.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed. Check your credentials.');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ id: data.id, email: data.email }));
                navigate('/dashboard');
            } else {
                throw new Error('No token received.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDemoFill = () => {
        setEmail('user1@example.com');
        setPassword('password123');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome to Donezo, A Task Management Dashboard</h2>
                <p className="login-subtitle">Sign in to continue</p>
                {error && <div className="login-error">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user1@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="login-hint">
                    <p>Demo Credentials:</p>
                    <div className="demo-credentials" onClick={handleDemoFill}>
                        <span>Email: user1@example.com</span>
                        <span>Password: password123</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
