import React from 'react'

export const StyledLabel = ({ classNameFlex, classNameLabel, htmlFor, labelText }) => {
    return (
        <div className={`d-flex p-0 ${classNameFlex}`}>
            <label
                className={`flex-grow-0 ${classNameLabel}`}
                htmlFor={`${htmlFor}`}>
                {labelText}
            </label>
        </div>
    )
}
