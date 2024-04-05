import React, { useState, useRef } from 'react';
import {StyledHeader} from "../components/StyledHeader.jsx";
import {StyledFooter} from "../components/StyledFooter.jsx";
import {StyledMiddleSection} from "../components/StyledMiddleSection.jsx";
// import { Button, Col, Container, Form, Form.Group, Row } from 'react-bootstrap';

export const VerificationPage = () => {
    const [passcode, setPasscode] = useState(['', '', '', '', '', '']); // Array to store passcode digits
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefs = useRef([]); // Array to hold references to input fields

    const handlePasscodeChange = (index, event) => {
        const newPasscode = [...passcode];
        if (event.target.value !== '') {
            newPasscode[index] = event.target.value;
            if (index < passcode.length - 1) {
                inputRefs.current[index + 1].focus(); // Move focus to next if not empty
            }
        } else { // Handle backspace or any empty value
            newPasscode[index] = '';
            // Find the next non-empty input to focus on (if any)
            let nextNonEmptyIndex = index - 1;
            while (nextNonEmptyIndex >= 0 && newPasscode[nextNonEmptyIndex] === '') {
                nextNonEmptyIndex--;
            }
            if (nextNonEmptyIndex >= 0) {
                inputRefs.current[nextNonEmptyIndex].focus();
            }
        }
        setPasscode(newPasscode);
    };

    const handleVerify = () => {
        // Implement verification logic here
        // This could involve sending the passcode to the backend for validation
        // and handling success or failure scenarios
        setErrorMessage(''); // Clear any previous errors

        const joinedPasscode = passcode.join('');
        if (joinedPasscode.length !== 6) {
            setErrorMessage('Passcode must be 6 digits long.');
            return;
        }

        // Simulate successful verification for now
        console.log('Passcode verified successfully!', joinedPasscode);
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
                                    key={index} // Key for react
                                    ref={(el) => (inputRefs.current[index] = el)} // Store reference
                                    type='text'
                                    maxLength={1} // Limit input to 1 character
                                    value={value}
                                    onChange={(e) => handlePasscodeChange(index, e)}
                                />
                            ))}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className='passcodeBox form-control rounded mx-2'*/}
                            {/*    type='text'*/}
                            {/*    maxLength={1}*/}
                            {/*    onChange={(e) => handlePasscodeChange(index, e)}*/}
                            {/*/>*/}
                        </div>
                        {/*<div className='row justify-content-center align-items-center px-3'>*/}
                        {/*    <div className='col-2 passcodeBox'>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </StyledMiddleSection>
            <StyledFooter />
        </div>
    )
}
