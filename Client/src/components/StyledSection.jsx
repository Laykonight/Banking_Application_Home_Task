import React from 'react'

export const StyledSection = ({ children, className }) => {
    return (
        <section className={`${className}`}>
            <div className={`content d-flex justify-content-start align-items-center mb-1`}>
                <div
                    className='content flex-grow-1'
                    style={{
                        marginTop: '7%',
                        marginLeft: '10%',
                    }}>
                    {children}
                </div>
            </div>
        </section>
    )
}
