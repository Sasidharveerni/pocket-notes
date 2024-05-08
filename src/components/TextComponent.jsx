/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

function TextComponent({ date, time, ele }) {

    return (
        <>
            <div className='text-div'>
            
                <div>
                    <p>
                        {ele}
                    </p>

                </div>

                <div className='text-container'>
                    <div style={{ marginRight: '1rem', fontSize: '1em' }}>
                        {date}
                    </div>

                    <div style={{ marginRight: '1rem', fontSize: '1.25em' }}>
                        &bull;
                    </div>

                    <div style={{ fontSize: '1em' }}>
                        {time}
                    </div>
                </div>

            </div>

        </>
    )
}

export default TextComponent