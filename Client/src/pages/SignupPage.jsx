import React, {useState} from 'react'
import bankLogo from '../assets/BankLogoFrame.svg';
import israelFlag from '../assets/IsraelFlag.svg';
import reactFlag from '../assets/react.svg';
import {StyledInputRow} from "../components/StyledInputRow.jsx";
import {StyledLabel} from "../components/StyledLabel.jsx";
import {StyledInput} from "../components/StyledInput.jsx";
import {StyledDropdownItem} from "../components/StyledDropdownItem.jsx";


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
        <div className='container p-0 m-0'>
            <div className='
            d-flex
            justify-content-start
            align-items-center'>
                <div className='flex-grow-1'>
                    <img src={bankLogo} alt='Bank logo'/>
                    <span>myBank</span>
                </div>
            </div>
            <div className='
            row
            justify-content-around
            align-items-center'>
                <center className='col'>
                    Experience the<br/>
                    Future of Banking
                </center>
                <div className='col'>
                    <div className='card'>
                        <div className='card-body text-center'>
                            {isSignupForm ? (
                                <h5>
                                    Let's Get Started
                                </h5>
                            ) : (
                                <h5>
                                    Welcome Back
                                </h5>
                            )}

                            <div>
                                <button>
                                    sign up
                                </button>
                                <button>
                                    sign in
                                </button>
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
                                            />
                                        </div>
                                    </StyledInputRow>

                                )}

                                {!isSignupForm && signInError && (
                                    <div className='d-flex'>
                                        <div className='flex-grow-0 text-danger'>
                                            {`${signInError}`}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <button>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
