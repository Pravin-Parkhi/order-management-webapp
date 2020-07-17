import React from 'react'
import { connect } from 'react-redux'

import './order-list.component.scss'

function OrderList (props) {

  return (
    <div className='order-list-wrapper'>
        I am order list
    </div>
  )
}

function mapStateToProps (state) {
  return {}
}

export default (connect(mapStateToProps, {})(OrderList))