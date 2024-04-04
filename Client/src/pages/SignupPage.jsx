import React, {useState} from 'react'
import bankLogo from '../assets/BankLogoHeader.svg';
import israelFlag from '../assets/IsraelFlag.svg';
import reactFlag from '../assets/react.svg';
import waterMark from '../assets/waterMark.svg'
import {StyledInputRow} from "../components/StyledInputRow.jsx";
import {StyledLabel} from "../components/StyledLabel.jsx";
import {StyledInput} from "../components/StyledInput.jsx";
import {StyledDropdownItem} from "../components/StyledDropdownItem.jsx";
import {StyledTab} from "../components/StyledTab.jsx";
import {StyledSection} from "../components/StyledSection.jsx";


export const SignupPage = () => {
    const [account, setAccount] = useState('');
    const [isSignupForm, setIsSignupForm] = useState(true);
    const [signInError, setSignInError] = useState('Invalid email os password, please try again.'); // todo start ''
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileAreaCode, setMobileAreaCode] = useState('+972');
    const [chosenFlag, setChosenFlag] = useState(israelFlag);

    const handleSetChosenFlag = (flag, areaCode) => {
        setChosenFlag(flag);
        setMobileAreaCode(areaCode);
    };


    return (
        <div className='signupPage gradient container p-0 m-0 min-vw-100 min-vh-100'>
            <StyledSection>
                <img src={bankLogo} alt='Bank logo'/>
            </StyledSection>
            <div className='
            row
            justify-content-around
            align-items-center'
            >
                <center className='col-4 text-start sideText'
                >
                    Experience the<br/>
                    Future of Banking
                </center>
                <div className='col'
                     style={{ zIndex: '100' }}>
                    <div className='signupCard card-transperaant bg-white bg-opacity-75 rounded-5'
                         style={{ zIndex: '100' }}>
                        <div className='card-body text-center'
                             style={{ zIndex: '100' }}>
                            <h3>
                                {isSignupForm ? ("Let's Get Started") : ("Welcome Back")}
                            </h3>

                            <div className='d-flex justify-content-center'>
                                <StyledTab
                                    textColor='primary'
                                    type='button'
                                    onClick={() => setIsSignupForm(true)}
                                    isActive={isSignupForm}
                                    text='Sign Up'
                                />
                                <StyledTab
                                    textColor='primary'
                                    type='button'
                                    onClick={() => setIsSignupForm(false)}
                                    isActive={!isSignupForm}
                                    text='Sign in'
                                />
                            </div>
                            <div className='container'>
                                <StyledInputRow>
                                    <StyledLabel
                                        htmlFor='email'
                                        labelText='Email'
                                    />
                                    <StyledInput
                                        className={`${emailError ? 'is-invalid' : ''}`}
                                        type='email'
                                        placeholder={emailError}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id='email'
                                    />
                                </StyledInputRow>

                                <StyledInputRow>
                                    <StyledLabel
                                        htmlFor='password'
                                        labelText='Password'
                                    />
                                    <StyledInput
                                        className={`${passwordError ? 'is-invalid' : ''}`}
                                        type='email'
                                        placeholder={passwordError}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id='password'
                                    />
                                </StyledInputRow>

                                {isSignupForm && (
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
                                                    (
                                                        `${mobileNumberError}`
                                                    ) : (
                                                        `${mobileAreaCode}    Enter Your Phone Number`
                                                    )}`}
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                id='phone'
                                            />
                                        </div>
                                    </StyledInputRow>

                                )}

                                {!isSignupForm && signInError && (
                                    <div className='d-flex'>
                                        <div
                                            className='flex-grow-0 text-danger'
                                            style={{ zIndex: '100' }}
                                        >
                                            {`${signInError}`}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ zIndex: '100' }}
                            >
                                <button
                                    className='btn btn-lg btn-outline-primary'
                                    type='button'
                                    onClick={() => console.log('clicked')}
                                    style={{ zIndex: '100' }}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StyledSection>
                <img src={waterMark} alt='Bank logo'/>
            </StyledSection>
        </div>
    )
}
