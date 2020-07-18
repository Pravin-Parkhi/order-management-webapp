import React from 'react'

import './icon-wrapper.component.scss'

export default function IconWrapper (props) {
    const { onClickCallback } = props

    return (
        <div className='icon-wrapper' onClick={onClickCallback}>
            {props.children}
        </div>
    )
}