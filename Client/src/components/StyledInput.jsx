import React from 'react'

export const StyledInput = ({ className, type, placeholder, onChange, value, id }) => {
    return (
        <input
            className={`content form-control border-black ${className}`}
            type={`${type}`}
            value={`${value}`}
            id={`${id}`}
            onChange={onChange}
            placeholder={`${placeholder}`}
        />
    )
}
