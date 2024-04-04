import React from 'react'

export const StyledSection = ({ children }) => {
    return (
        <section>
            <div className='
            d-flex
            justify-content-start
            align-items-center
            mb-1'
            >
                <div
                    className='flex-grow-1'
                    style={{
                        marginTop: '7%',
                        marginLeft: '10%',
                        zIndex: '100',
                    }}
                >
                    {children}
                </div>
            </div>
        </section>
    )
}
