import React, { useState } from 'react'

import './input-field.component.scss'

export default function InputField (props) {
    const { type, value, placeholder } = props
    
    const handeOnChange = (event) => {
        console.log(event.target.value)
    }

    return (
        <div className='input-wrapper'>
            <input
                type={type}
                value={value}
                onChange={handeOnChange}
                placeholder={placeholder}
            />
        </div>
    )
}