import React from 'react'
import BrandLogo from '../../assets/images/brand-logo.png'


import './header.component.scss'

export default function Header () {

  return (
    <div className='header-wrapper'>
        <img src={BrandLogo} alt='Brand Logo' className='brand-logo' />
        <p className='brand-name'>Order Manager</p>
    </div>
  )
}