import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { PixelCard } from '../components/PixelCard';
import { PixelButton } from '../components/PixelButton';

export const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const res = await api.post(endpoint, { username, password });

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <PixelCard title={isLogin ? 'LOGIN' : 'REGISTER'}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>USERNAME</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '2px solid #000',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '2px solid #000',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '10px' }}>{error}</div>}

                    <PixelButton type="submit" style={{ width: '100%', marginBottom: '10px' }}>
                        {isLogin ? 'ENTER WORLD' : 'JOIN GAME'}
                    </PixelButton>

                    <div style={{ textAlign: 'center', fontSize: '10px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need account? Register' : 'Have account? Login'}
                    </div>
                </form>
            </PixelCard>
        </div>
    );
};
