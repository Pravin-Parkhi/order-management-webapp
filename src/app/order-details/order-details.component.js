import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getOrderDetails } from '../../actions/app.action'
import { validateFormField, validateForm, validations } from '../../utils/validation.utils'

import Product from './product/product.component'
import Card from '../../common/card/card.component'
import Button from '../../common/button/button.component'
import InputField from '../../common/input-field/input-field.component'

import './order-details.component.scss'
import { deepCopy, getUUID } from '../../utils/misc.utils'

const requiredFields = ['firstName']
const formRegex = {
  amount: validations.number
}

function OrderDetails (props) {
  const [ values, setValues ] = useState({})
  const [ errors, setErrors ] = useState({})

  const { billingAddress, shippingAddress } = values
  const { orderDetails } = props
  const { getOrderDetails } = props

  const handleBillingAddressOnChange = event => {
    const {name, value} = event.target
    
    setValues({ 
      ...values,
      billingAddress: {
        ...values.billingAddress,
        [name]: value
      }
    });

    // validate({
    //   ...values,
    //   [name]: value
    // }, name)
  }

  const handleShippingAddressOnChange = event => {
    const {name, value} = event.target
    
    setValues({ 
      ...values,
      billingAddress: {
        ...values.billingAddress,
        [name]: value
      }
    });

    // validate({
    //   ...values,
    //   [name]: value
    // }, name)
  }

  const validate = (form, prop) => {
    form = form || values
    if (prop) {
      let error = validateFormField(form[prop], formRegex[prop], requiredFields.indexOf(prop) >= 0)
      setErrors({ ...errors, [prop]: error })
      return error
    } else {
      const errorObj = validateForm(form, formRegex, requiredFields)
      setErrors({ ...errors, ...errorObj.fieldErrors })
      return errorObj.hasError
    }
  }

  const fetchOrderDetails = () => {
    const { match: { params } } = props
    getOrderDetails({orderId: params.orderId})
  }

  const handleOnAddProductClick = () => {
    let valuesCopy = deepCopy(values)
    valuesCopy.products.push({
      productId: getUUID(),
      productName: '',
      quantity: '',
      UnitPrice: '',
      totalPrice: '',
      notes: ''
    })

    setValues(valuesCopy)
  }

  const handleDeleteProduct = (productId) => {
    let valuesCopy = deepCopy(values)
    const productIndx = valuesCopy.products.findIndex(product => product.productId === productId)
    valuesCopy.products.splice(productIndx, 1)
    setValues(valuesCopy)
  }

  const handleOnSave = () => {
    console.log(values)
  }

  const renderProduct = (product, index) => {
    const { productId } = product
    return(
      <Product
        key={productId}
        product={product}
        deleteProductCallback={() => handleDeleteProduct(product.productId)}
      />
    )
  }

  const populateForm = (orderDetails) => {
    setValues({
      ...orderDetails
    })
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  useEffect(() => {
    if(orderDetails){
      populateForm(orderDetails)
    }
  }, [orderDetails])

  console.log(values)

  return (
    <div className='order-details-wrapper'>
      <Card>
        <div className='address-container'>
          <div className='billing-address'>
            <p className='sub-section-heading'>Billing Address</p>
            <InputField
              type='text'
              value={billingAddress ? billingAddress.firstName : ''}
              name='firstName'
              placeholder='First Name'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={billingAddress ? billingAddress.lastName : ''}
              name='lastName'
              placeholder='Last Name'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='addressLine1'
              value={billingAddress ? billingAddress.addressLine1 : ''}
              placeholder='Address line 1'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='addressLine2'
              value={billingAddress ? billingAddress.addressLine2 : ''}
              placeholder='Address line 2'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='city'
              value={billingAddress ? billingAddress.city : ''}
              placeholder='City'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='state'
              value={billingAddress ? billingAddress.state : ''}
              placeholder='State'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='zipcode'
              value={billingAddress ? billingAddress.zipcode : ''}
              placeholder='Zipcode'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='country'
              value={billingAddress ? billingAddress.country : ''}
              placeholder='Country'
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
          </div>
          <div className='shipping-address'>
            <p className='sub-section-heading'>Shipping Address</p>
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.firstName : ''}
              name='firstName'
              placeholder='First Name'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.lastName : ''}
              name='lastName'
              placeholder='Last Name'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.addressLine1 : ''}
              name='addressLine1'
              placeholder='Address line 1'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.addressLine2 : ''}
              name='addressLine2'
              placeholder='Address line 2'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.city : ''}
              name='city'
              placeholder='City'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.state : ''}
              name='state'
              placeholder='State'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.zipcode : ''}
              name='zipcode'
              placeholder='Zipcode'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.country : ''}
              name='country'
              placeholder='Country'
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
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
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(values.products && values.products.length) 
                ? values.products.map((product, index) => renderProduct(product, index)) 
                  : null}
            </tbody>
          </table>
        </div>
        <Button size='sm' type='info' buttonClickCallback={handleOnAddProductClick}>
          add product
        </Button>
        <div className='save-button-wrapper'>
          <Button size='md' type='info' buttonClickCallback={handleOnSave}>
            save
          </Button>
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