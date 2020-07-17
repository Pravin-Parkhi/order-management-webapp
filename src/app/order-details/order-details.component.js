import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { getOrderDetails } from '../../actions/app.action'

import Card from '../../common/card/card.component'
import InputField from '../../common/input-field/input-field.component'

import './order-details.component.scss'

function OrderDetails (props) {
  const { orderDetails } = props
  const { getOrderDetails } = props

  const handleOnChange = () => {
    console.log()
  }

  const fetchOrderDetails = () => {
    const { match: { params } } = props
    getOrderDetails({orderId: params.orderId})
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  console.log(orderDetails)

  return (
    <div className='order-details-wrapper'>
        <Card>
          <div className='address-container'>
            <div className='billing-address'>
              <p className='sub-section-heading'>Billing Address</p>
              <InputField
                type='text'
                value=''
                placeholder='First Name'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Last Name'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Address line 1'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Address line 2'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='City'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='State'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Zipcode'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Country'
                onChangeCallback={handleOnChange}
              />
            </div>
            <div className='shipping-address'>
              <p className='sub-section-heading'>Shipping Address</p>
              <InputField
                type='text'
                value=''
                placeholder='First Name'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Last Name'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Address line 1'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Address line 2'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='City'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='State'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Zipcode'
                onChangeCallback={handleOnChange}
              />
              <InputField
                type='text'
                value=''
                placeholder='Country'
                onChangeCallback={handleOnChange}
              />
            </div>
          </div>
        </Card>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    orderDetails: state.app.orderDetails
  }
}

export default (connect(mapStateToProps, { getOrderDetails })(OrderDetails))