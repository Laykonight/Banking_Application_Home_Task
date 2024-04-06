import React, { useState, useRef } from 'react';
import {StyledHeader} from "../components/StyledHeader.jsx";
import {StyledFooter} from "../components/StyledFooter.jsx";
import {StyledMiddleSection} from "../components/StyledMiddleSection.jsx";
import {StyledButton} from "../components/StyledButton.jsx";
// import { Button, Col, Container, Form, Form.Group, Row } from 'react-bootstrap';

export const VerificationPage = () => {
    const [passcode, setPasscode] = useState(['', '', '', '', '', '']); // Array to store passcode digits
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefs = useRef([]); // Array to hold references to input fields

    const handleBackspace = (keyEvent, index) => {
        if (keyEvent.key === 'Backspace') {
            const newPasscode = [...passcode];
            console.log('Backspace pressed!'); // Log backspace even if input is empty
            if (index > 0) {
                if (newPasscode[index] === ''){
                    --index;
                    inputRefs.current[index].focus();
                }
                newPasscode[index] = '';
                setPasscode(newPasscode);
            }
        }
    };

    const handlePasscodeChange = (index, event) => {
        const newPasscode = [...passcode];
        if (event.target.value !== '') {
            newPasscode[index] = event.target.value;
            if (index < passcode.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
        setPasscode(newPasscode);
    };

    const handleVerify = () => {
        setErrorMessage(''); // Clear any previous errors

        const passcodeTry = passcode.join('');
        console.log('Passcode attempt:', passcodeTry);

        if (passcodeTry.length !== 6) {
            setErrorMessage('Passcode must be 6 digits long.');
            return;
        }

        // Simulate successful verification for now
        console.log('Passcode verified successfully!', passcodeTry);
        // Redirect to the next page or display a success message
    };


    return (
        <div className='verificationPage container p-0 m-0 min-vw-100 min-vh-100'>
            <StyledHeader />
            <StyledMiddleSection justifyContent='center'>
                <div
                    className='card'
                    style={{
                        maxWidth: '40%'
                    }}
                >
                    <div className='card-body'>
                        <h2>
                            Two Factor Authentication
                        </h2>
                        <h4>
                            Enter Two-Factor<br/>
                            Authentication Passcode
                        </h4>
                        <div className='input-group fs-4'>
                            {passcode.map((value, index) => (
                                <input
                                    className='passcodeBox form-control rounded m-2 text-center p-0'
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='text'
                                    maxLength={1}
                                    value={value}
                                    onKeyDown={(key) => handleBackspace(key, index)}
                                    onChange={(e) => handlePasscodeChange(index, e)}
                                />
                            ))}
                        </div>
                        <div className='row'>
                            <StyledButton
                                className='col'
                                bsSize='lg'
                                bsColor='primary'
                                type='button'
                                onClick={() =>handleVerify()}
                                text='Verify'
                            />
                        </div>

                    </div>
                </div>
            </StyledMiddleSection>
            <StyledFooter/>
        </div>
    )
}
