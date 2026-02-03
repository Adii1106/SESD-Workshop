import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent';
}

export const PixelButton: React.FC<PixelButtonProps> = ({ children, variant = 'primary', style, ...props }) => {
    let bgColor = 'var(--primary)';
    let shadowColor = 'var(--primary-shadow)';

    if (variant === 'secondary') {
        bgColor = 'var(--secondary)';
        shadowColor = 'var(--secondary-shadow)';
    } else if (variant === 'accent') {
        bgColor = 'var(--accent)';
        shadowColor = '#00a856';
    }

    const btnStyle: React.CSSProperties = {
        backgroundColor: bgColor,
        border: '4px solid #000',
        padding: '12px 24px',
        fontSize: '14px',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: `4px 4px 0px 0px #000`,
        color: '#000',
        textTransform: 'uppercase',
        transition: 'transform 0.1s, box-shadow 0.1s',
        ...style
    };

    return (
        <button
            {...props}
            style={btnStyle}
            className="pixel-btn"
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(4px, 4px)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `4px 4px 0px 0px #000`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `4px 4px 0px 0px #000`;
            }}
        >
            {children}
        </button>
    );
};
