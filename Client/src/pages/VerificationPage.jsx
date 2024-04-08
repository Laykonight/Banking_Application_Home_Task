import React, { useState, useRef } from 'react';
import {StyledHeader} from "../components/StyledHeader.jsx";
import {StyledFooter} from "../components/StyledFooter.jsx";
import {StyledMiddleSection} from "../components/StyledMiddleSection.jsx";
import {StyledButton} from "../components/StyledButton.jsx";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setAccountAvailable, setToken} from "../redux/Store.jsx";

export const VerificationPage = () => {
    const [passcode, setPasscode] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefs = useRef([]);

    const email = useSelector((state) => state.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const SERVER_ADDRESS = 'http://localhost:3000/';

    const handleBackspace = (keyEvent, index) => {
        if (keyEvent.key === 'Backspace') {
            const newPasscode = [...passcode];
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


    const handleVerify = async () => {
        setErrorMessage('');
        const passcodeTry = passcode.join('');
        if (passcodeTry.length !== 6) {
            setErrorMessage('Passcode must be 6 digits long.');
            return;
        }

        const verification = {
            email: email,
            passcode: passcodeTry
        };

        try {
            const response = await axios.post(`${SERVER_ADDRESS}verification`, {verification});
            const token = response.data.accessToken;
            dispatch(setToken(token));
            dispatch(setAccountAvailable());
            navigate('/');
        } catch (error){
            setErrorMessage('Wrong input, please try again.');
            setPasscode(['', '', '', '', '', '']);
        }
    };

    return (
        <div className='verificationPage container p-0 m-0 min-vw-100 min-vh-100'>
            <div className='d-flex flex-column min-vw-100 min-vh-100'>
                <StyledHeader />
                <div
                    className='
                d-flex
                justify-content-center align-content-center
                fs-5 fw-bold
                bg-success-subtle
                border border-black border-2 rounded
                p-3'
                    style={{
                        position: 'fixed',
                        top: '10%',
                        right: '10%',
                        minHeight: '5%',
                    }}
                >
                    Enter passcode from backend terminal
                </div>
                <StyledMiddleSection justifyContent='center'>
                    <div
                        className='card'
                        style={{
                            maxWidth: '27%'
                        }}
                    >
                        <div className='card-body text-center'>
                            <h2 className='py-3 mt-3'>
                                Two Factor Authentication
                            </h2>
                            <h4 className='py-3 mb-3'>
                                Enter Two-Factor<br/>
                                Authentication Passcode
                            </h4>
                            <div className='input-group fs-4 mt-5 mb-3'>
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
                            {errorMessage !== '' && (
                                <div className='text-danger'>
                                    {errorMessage}
                                </div>
                            )}
                            <div className='row p-3'>
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
                <StyledFooter className='mt-auto p-2' />
            </div>
        </div>
    )
}
