import React from 'react';

interface PixelCardProps {
    children: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
}

export const PixelCard: React.FC<PixelCardProps> = ({ children, title, style }) => {
    return (
        <div style={{
            border: '4px solid #000',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '8px 8px 0px 0px #000',
            marginBottom: '20px',
            ...style
        }}>
            {title && (
                <div style={{
                    borderBottom: '4px solid #000',
                    marginBottom: '20px',
                    paddingBottom: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
};
