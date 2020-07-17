import React from 'react'

import './card.component.scss'

export default function Card (props) {
  return (
    <div className='card-wrapper'>{props.children}</div>
  )
}