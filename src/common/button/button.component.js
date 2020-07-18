import React from 'react'
import classNames from 'classnames'

import './button.component.scss'

export default function Button (props) {
    const { size, type } = props
    const { buttonClickCallback } = props
    return (
        <button
            type="button"
            className={classNames(['default-button', 
                { 'small': size === 'sm' },
                { 'medium': size === 'md' },
                { 'large': size === 'lg' },
                { 'info': type === 'info' },
                { 'danger': type === 'danger' }
            ])}
            onClick={buttonClickCallback}
        >
            {props.children}
        </button>
    )
}