import React, { useState } from 'react'
import { connect } from 'react-redux'

import './order-details.component.scss'

function OrderDetails (props) {

  return (
    <div className='order-details-wrapper'>
        I am order details
    </div>
  )
}

function mapStateToProps (state) {
  return {}
}

export default (connect(mapStateToProps, {  })(OrderDetails))