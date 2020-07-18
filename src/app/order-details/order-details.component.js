import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { IconContext } from "react-icons"
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getOrderDetails } from '../../actions/app.action'

import Card from '../../common/card/card.component'
import Button from '../../common/button/button.component'
import InputField from '../../common/input-field/input-field.component'
import IconWrapper from '../../common/icon-wrapper/icon-wrapper.component'

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

  const renderProduct = (product, index) => {
    const { productId, productName } = product
    return(
      <tr key={product.productId}>
        <td>{productId}</td>
        <td>{productName}</td>
        <td>
          <div className='action-wrapper'>
            <IconWrapper>
              <IconContext.Provider value={{ color: "#F44336"}}>
                <RiDeleteBin6Line />
              </IconContext.Provider>
            </IconWrapper>
            <IconWrapper>
              <IconContext.Provider value={{ color: "#1976D2" }}>
                <GrEdit />
              </IconContext.Provider>
            </IconWrapper>
          </div>
        </td>
      </tr>
    )
  }

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

      <Card>
        <div className='product-list-wrapper'>
          <table>
            <thead>
              <tr>
                <th>Produc Id</th>
                <th>Product Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(orderDetails && orderDetails.products.length) 
                ? orderDetails.products.map((product, index) => renderProduct(product, index)) 
                  : null}
            </tbody>
          </table>
          <Button size='sm' type='info'>
            add product
          </Button>
          <div className='save-button-wrapper'>
            <Button size='md' type='info'>
              save
            </Button>
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