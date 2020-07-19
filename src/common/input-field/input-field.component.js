import React from 'react'
import classNames from 'classnames'

import './input-field.component.scss'

export default function InputField (props) {
    const { type, value, disabled, placeholder, readOnly, name, error } = props
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
                readOnly={readOnly}
                disabled={disabled}
                onChange={handleChange}
                placeholder={placeholder}
                className={classNames('input-field', { 'error': error })}
            />
        </div>
    )
}