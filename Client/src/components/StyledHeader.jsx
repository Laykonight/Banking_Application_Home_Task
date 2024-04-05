import React from 'react'
import bankLogo from "../assets/BankLogoHeader.svg";
import {StyledSection} from "./StyledSection.jsx";

export const StyledHeader = () => {
    return (
        <StyledSection>
            <img src={bankLogo} alt='Bank logo'/>
        </StyledSection>
    )
}
