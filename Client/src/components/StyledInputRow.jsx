import React from 'react'

export const StyledInputRow = ({className, children}) => {
    return (
        <div className={`row justify-content-start align-items-center ${className}`}>
            {children}
        </div>
    )
}
