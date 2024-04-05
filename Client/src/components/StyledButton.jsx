import React from 'react'

export const StyledButton = ({
 className,
 bsSize,
 bsColor,
 type,
 onClick,
 text
}) => {
    return (
        <button
            className={`content btn btn-${bsSize} btn-${bsColor} ${className}`}
            type={`${type}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
