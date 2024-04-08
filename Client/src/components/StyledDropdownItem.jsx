import React from 'react'

export const StyledDropdownItem = ({ className, src, alt, onClick }) => {
    return (
        <li className={`content dropdown-item ${className}`}>
            <img
                src={src}
                alt={`${alt}`}
                height='30px'
                onClick={onClick}
            />
        </li>
    )
}
