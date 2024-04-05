import React from 'react'

export const StyledMiddleSection = ({ className,justifyContent, children }) => {
    return (
        <div
            className={`row justify-content-${justifyContent} align-items-center ${className}`}
        >
            {children}
        </div>
    )
}
