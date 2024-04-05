import React from 'react'
import {StyledInputRow} from "./StyledInputRow.jsx";
import {StyledLabel} from "./StyledLabel.jsx";
import {StyledDropdownItem} from "./StyledDropdownItem.jsx";
import israelFlag from "../assets/IsraelFlag.svg";
import reactFlag from "../assets/react.svg";
import {StyledInput} from "./StyledInput.jsx";

export const MobilePhoneInput = ({
 chosenFlag,
 handleSetChosenFlag,
 mobileNumberError,
 mobileAreaCode,
 mobileNumber,
 setMobileNumber
}) => {
    return (
        <StyledInputRow>
            <StyledLabel
                htmlFor='Phone'
                labelText='Mobile number'
            />
            <div className='input-group p-0'>
                <button
                    className='btn btn-outline-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img src={chosenFlag} alt='Israel flag' height='20px'/>
                </button>
                <ul className='dropdown-menu' style={{minWidth: '1rem'}}>
                    <StyledDropdownItem
                        src={israelFlag}
                        alt='Israel flag'
                        onClick={() => handleSetChosenFlag(israelFlag, '+972')}
                    />
                    <StyledDropdownItem
                        src={reactFlag}
                        alt='react flag'
                        onClick={() => handleSetChosenFlag(reactFlag, '+react')}
                    />
                </ul>
                <StyledInput
                    className={`${mobileNumberError ? 'is-invalid' : ''}`}
                    type='tel'
                    placeholder={`${mobileNumberError ?
                        (`${mobileNumberError}`) :
                        (`${mobileAreaCode}    Enter Your Phone Number`)}`}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    id='phone'
                />
            </div>
        </StyledInputRow>
    )
}
