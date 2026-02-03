import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { PixelButton } from './PixelButton';

export const Layout: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <header style={{
                border: '4px solid #000',
                padding: '20px',
                marginBottom: '40px',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '8px 8px 0px 0px #000'
            }}>
                <Link to="/" style={{ fontSize: '20px', color: '#ff4081' }}>
                    2 TRUTHS 1 LIE
                </Link>

                <nav style={{ display: 'flex', gap: '10px' }}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/"><PixelButton variant="primary">Home</PixelButton></Link>
                            <Link to="/create"><PixelButton variant="accent">Create</PixelButton></Link>
                            <PixelButton variant="secondary" onClick={handleLogout}>Logout</PixelButton>
                        </>
                    ) : (
                        <Link to="/login"><PixelButton variant="primary">Login</PixelButton></Link>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer style={{
                marginTop: '60px',
                textAlign: 'center',
                fontSize: '10px',
                opacity: 0.6
            }}>
                <p>Built for OOP Workshop</p>
                <p>Use arrow keys strictly? No, just click things.</p>
            </footer>
        </div>
    );
};
