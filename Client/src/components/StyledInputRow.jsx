import React from 'react'

export const StyledInputRow = ({className, children}) => {
    return (
        <div className={`content row justify-content-start align-items-center fs-5 mx-3 my-4 ${className}`}>
            {children}
        </div>
    )
}
