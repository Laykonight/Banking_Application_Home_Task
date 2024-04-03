import React from 'react'
import israelFlag from "../assets/IsraelFlag.svg";

export const StyledDropdownItem = ({ className, src, alt, onClick }) => {
    return (
        <li className={`dropdown-item ${className}`}>
            <img
                src={src}
                alt={`${alt}`}
                height='30px'
                onClick={onClick}
            />
        </li>
    )
}
