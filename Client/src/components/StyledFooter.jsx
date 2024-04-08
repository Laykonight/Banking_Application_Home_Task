import React from 'react'
import waterMark from "../assets/waterMark.svg";
import {StyledSection} from "./StyledSection.jsx";

export const StyledFooter = ({ className }) => {
    return (
        <StyledSection className={`${className}`}>
            <img src={waterMark} alt='Bank logo'/>
        </StyledSection>
    )
}
