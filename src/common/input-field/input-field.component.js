import React from 'react'

import './input-field.component.scss'

export default function InputField (props) {
    const { type, value, disabled, placeholder, name } = props
    const { onChangeCallback } = props

    const handleChange = (event) => {
        onChangeCallback(event)
    }

    return (
        <div className='input-wrapper'>
            <input
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}