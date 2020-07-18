import React from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'

import './order-list.component.scss'

const OrderStatusList = {
  pending: 'pending',
  completed: 'completed'
}

function OrderList (props) {
  const { history, orderList } = props

  const handleOrderClick = (order) => {
    history.push(`/order-details/${order.orderId}`)
  }

  const renderOrder = (order, index) => {
    const { orderId, status, shippingAddress } = order
    return(
      <tr key={order.orderId} onClick={() => handleOrderClick(order)}>
        <td>{orderId}</td>
        <td>{`${shippingAddress.addressLine1 || ''} ${shippingAddress.addressLine2 || ''} `}</td>
        <td
          className={classNames(['status', 
          { 'pending': status === OrderStatusList.pending },
          { 'completed': status === OrderStatusList.completed }
        ])}>
          {status}
        </td>
      </tr>
    )
  }

  return (
    <div className='order-list-wrapper'>
        <p className='section-heading'>Order List</p>
        <div className='order-list-table'>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Shipping Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(orderList && orderList.length) ? orderList.map((order, index) => renderOrder(order, index)) : null}
            </tbody>
          </table>
        </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    orderList: state.app.orderList
  }
}

export default (connect(mapStateToProps, {})(OrderList))