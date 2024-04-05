import React from 'react'

export const StyledTab = ({ className, textColor, type, onClick, isActive, text }) => {
    return (
        <button
            className={`content btn btn-transparent rounded-0 fs-4 text-${textColor} ${className}`}
            onClick={onClick}
            type={`${type}`}
            style={{
                border: '0',
                borderBottom: isActive ? '2px solid #0d6efd' : '1px solid blue',
                fontWeight: isActive ? 'bold' : 'normal',
                // zIndex: '100',
            }}
        >
            {text}
        </button>
    )
}
