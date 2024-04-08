import React from 'react'
import bankLogo from "../assets/BankLogoHeader.svg";
import {StyledSection} from "./StyledSection.jsx";

export const StyledHeader = ({ className }) => {
    return (
        <StyledSection
            className={`${className}`}
        >
            <img src={bankLogo} alt='Bank logo'/>
        </StyledSection>
    )
}
