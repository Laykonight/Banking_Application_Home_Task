import React from 'react'

export const StyledLabel = ({ classNameFlex, classNameLabel, htmlFor, labelText }) => {
    return (
        <div className={`content d-flex p-0 ${classNameFlex}`}>
            <label
                className={`content flex-grow-0 ${classNameLabel}`}
                htmlFor={`${htmlFor}`}
            >
                {labelText}
            </label>
        </div>
    )
}
