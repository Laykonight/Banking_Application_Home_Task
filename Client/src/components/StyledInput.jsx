import React from 'react'

export const StyledInput = ({ className, type, placeholder, onChange, value, id }) => {
    return (
        <input
            className={`form-control ${className}`}
            type={`${type}`}
            value={`${value}`}
            id={`${id}`}
            onChange={onChange}
            placeholder={`${placeholder}`}
            style={{ zIndex: '100' }}
        />
    )
}
