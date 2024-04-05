import React, {useState} from 'react'
import israelFlag from '../assets/IsraelFlag.svg';
import {StyledInputRow} from "../components/StyledInputRow.jsx";
import {StyledLabel} from "../components/StyledLabel.jsx";
import {StyledInput} from "../components/StyledInput.jsx";
import {StyledTab} from "../components/StyledTab.jsx";
import {MobilePhoneInput} from "../components/MobilePhoneInput.jsx";
import {StyledButton} from "../components/StyledButton.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setAccountAvailable, setToken} from "../redux/Store.jsx";
import {StyledHeader} from "../components/StyledHeader.jsx";
import {StyledFooter} from "../components/StyledFooter.jsx";
import {StyledMiddleSection} from "../components/StyledMiddleSection.jsx";


export const SignupPage = () => {
    // const [account, setAccount] = useState('');
    const [isSignupForm, setIsSignupForm] = useState(true);
    const [signInError, setSignInError] = useState(''); // todo start ''

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileAreaCode, setMobileAreaCode] = useState('+972');
    const [chosenFlag, setChosenFlag] = useState(israelFlag);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const SERVER_ADDRESS = 'http://localhost:3000/';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileNumberRegex = /^\d{10}$/;

    const isFormValid = () => {
        setEmailError('');
        setPasswordError('');
        setMobileNumberError('');
        let isValid = true;

        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address !');
            isValid = false;
        }

        if (password.trim() === ''){
            setPasswordError('Please enter password here !');
            isValid = false;
        }

        if (isSignupForm && !mobileNumberRegex.test(mobileNumber)){
            setMobileNumberError('Please enter a valid mobile number !');
            isValid = false;
        }
        return isValid;
    }

    const handleSetChosenFlag = (flag, areaCode) => {
        setChosenFlag(flag);
        setMobileAreaCode(areaCode);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setMobileNumber('');
    }

    const handleSignIn = async () =>{
        const isValid = isFormValid();
        if (isValid){
            const loginData = {
                email: email.trim(),
                password: password.trim()
            };
            try {
                const response = await axios.post(`${SERVER_ADDRESS}login`, {loginData});
                console.log('Login successful:', response.data);
                const token = response.data.accessToken;
                console.log('token:', token);

                dispatch(setToken(token));
                dispatch(setAccountAvailable());
                resetForm();
                navigate('/');
            } catch (error){
                console.error('Login error:', error.response.data);
                resetForm();
            }
        }
    }

    const handleSignUp = async () =>{
        const isValid = isFormValid();
        if (isValid){
            const signupData = {
                email: email.trim(),
                password: password.trim(),
                phone: `${mobileAreaCode}${mobileNumber}`
            };
            try {
                const response = await axios.post(`${SERVER_ADDRESS}signup`, {signupData});
                console.log('Signup successful:', response.data);
                resetForm();
                navigate('/verification');
            } catch (error){
                console.error('Signup error:', error.response.data);
                resetForm();
            }
        }
    }

    return (
        <div className='signupPage gradient container p-0 m-0 min-vw-100 min-vh-100'>
            <StyledHeader />
                <StyledMiddleSection justifyContent='around'>
                    <div
                        className='
                        sideText
                        col-4
                        text-start'
                    >
                        Experience the<br/>
                        Future of Banking
                    </div>
                    <div className='content col'>
                        <div
                            className='
                            content signupCard
                            card-transperaant
                            bg-white bg-opacity-75
                            rounded-5'>
                            <div
                                className='
                                content
                                card-body
                                text-center'>

                                {/* Form title*/}
                                <h2 className='fw-medium pt-3'>
                                    {isSignupForm ? ("Let's Get Started") : ("Welcome Back")}
                                </h2>

                                {/* Switch forms tabs*/}
                                <div className='d-flex justify-content-center my-4'>
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
                                    {/* Email input row*/}
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

                                    {/* Password input row*/}
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
                                        <MobilePhoneInput
                                            chosenFlag={chosenFlag}
                                            handleSetChosenFlag={handleSetChosenFlag}
                                            mobileNumberError={mobileNumberError}
                                            mobileAreaCode={mobileAreaCode}
                                            mobileNumber={mobileNumber}
                                            setMobileNumber={setMobileNumber}
                                        />
                                    )}
                                    {!isSignupForm && signInError && //Sign In Error message
                                        (<div className='d-flex'>
                                            <div
                                                className='content flex-grow-0 text-danger'>
                                                {`${signInError}`}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='content'> {/*Sign Up/In Button */}
                                    <StyledButton
                                        className='fs-4 my-4'
                                        bsSize='lg'
                                        bsColor='primary'
                                        type='button'
                                        onClick={isSignupForm ? (() => handleSignUp()) : (() => handleSignIn())}
                                        text={isSignupForm ? ("Sign Up") : ("Sign In")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </StyledMiddleSection>
            <StyledFooter/>
        </div>
    )
}
