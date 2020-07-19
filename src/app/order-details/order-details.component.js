import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getOrderDetails } from '../../actions/app.action'
import { validateFormField, validateForm, validations } from '../../utils/validation.utils'
import { deepCopy, getUUID } from '../../utils/misc.utils'

import Product from './product/product.component'
import Card from '../../common/card/card.component'
import Button from '../../common/button/button.component'
import InputField from '../../common/input-field/input-field.component'

import './order-details.component.scss'

const billingAddressRequiredFields = ['firstName', 'lastName', 'addressLine1', 'addressLine2', 'city', 'state', 'zipcode', 'country']
const shippingAddressRequiredFields = ['firstName', 'lastName', 'addressLine1', 'addressLine2', 'city', 'state', 'zipcode', 'country']
const productRequiredFields = ['productName', 'quantity', 'unitPrice', 'totalPrice']

const formRegex = {
  amount: validations.number
}

function OrderDetails (props) {
  const [ values, setValues ] = useState({})
  const [ errors, setErrors ] = useState({
    billingAddress: {},
    shippingAddress: {},
    products: {}
  })

  const { orderDetails } = props
  const { getOrderDetails } = props
  const { billingAddress, shippingAddress } = values

  // billing address
  const handleBillingAddressOnChange = event => {
    const {name, value} = event.target
    setValues({ 
      ...values,
      billingAddress: {
        ...values.billingAddress,
        [name]: value
      }
    });
    validateBillingAddress({ 
      ...values,
      billingAddress: {
        ...values.billingAddress,
        [name]: value
      }
    }, name);
  }

  const validateBillingAddress = (form, prop) => {
    form = form || values
    if (prop) {
      let error = validateFormField(form.billingAddress[prop], formRegex[prop], billingAddressRequiredFields.indexOf(prop) >= 0)
      setErrors({
        ...errors,
        billingAddress: {
          ...errors.billingAddress,
          [prop]: error
        }
      })
      return error
    } else {
      const errorObj = validateForm(form.billingAddress, formRegex, billingAddressRequiredFields)
      setErrors({
        ...errors,
        billingAddress: {
          ...errorObj.fieldErrors
        }
      })
      return errorObj.hasError
    }
  }

  // shipping address
  const handleShippingAddressOnChange = event => {
    const {name, value} = event.target
    setValues({
      ...values,
      shippingAddress: {
        ...values.shippingAddress,
        [name]: value
      }
    });
    validateShippingAddress({
      ...values,
      shippingAddress: {
        ...values.shippingAddress,
        [name]: value
      }
    }, name);
  }

  const validateShippingAddress = (form, prop) => {
    form = form || values
    if (prop) {
      let error = validateFormField(form.shippingAddress[prop], formRegex[prop], shippingAddressRequiredFields.indexOf(prop) >= 0)
      setErrors({
        ...errors,
        shippingAddress: {
          ...errors.shippingAddress,
          [prop]: error
        }
      })
      return error
    } else {
      const errorObj = validateForm(form.shippingAddress, formRegex, shippingAddressRequiredFields)
      setErrors({ 
        ...errors, 
        shippingAddress: {
          ...errorObj.fieldErrors
        }
      })
      return errorObj.hasError
    }
  }

  // Products
  const handleProductValueChange = (event, productId) => {
    const {name, value} = event.target
    let valuesCopy = deepCopy(values)
    let productToBeUpdated = valuesCopy.products.filter(product => product.productId === productId)[0]
    if(name === 'quantity'){
      productToBeUpdated.totalPrice = productToBeUpdated.unitPrice * value
    } else if (name === 'unitPrice'){
      productToBeUpdated.totalPrice = productToBeUpdated.quantity * value
    }
    productToBeUpdated[name] = value
    setValues(valuesCopy)
    validateProducts(valuesCopy, name)
  }

  const validateProducts = (form, prop) => {
    form = form || values
    const { products } = form
    let errorsCopy = deepCopy(errors)
    if(prop){
      for(let productIndx=0; productIndx<products.length; productIndx++){
        const product = products[productIndx]
        const { productId } = product
        var error = validateFormField(product[prop], formRegex[prop], productRequiredFields.indexOf(prop) >= 0)
        errorsCopy = {
          ...errorsCopy,
          products: {
            ...errorsCopy.products,
            [productId]: {
              ...errorsCopy.products[productId],
              [prop]: error
            }
          }
        }
      }
      setErrors(errorsCopy)
      return error
    } else {
      for(let productIndx=0; productIndx<products.length; productIndx++){
        const product = products[productIndx]
        const { productId } = product
        var errorObj = validateForm(product, formRegex, productRequiredFields)
        errorsCopy = {
          ...errors,
          products: {
            ...errors.products,
            [productId]: {
              ...errorObj.fieldErrors
            }
          }
        }
      }
      setErrors(errorsCopy)
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
      unitPrice: '',
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
    if(!validateBillingAddress() && !validateShippingAddress() && !validateProducts()){
      console.log(errors)
    } else{
      console.log('Throw error')
    }
  }

  const renderProduct = (product) => {
    const { productId } = product
    return(
      <Product
        key={productId}
        product={product}
        errors={errors}
        onChangeCallback={(event) => handleProductValueChange(event, productId)}
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
              error={errors.billingAddress.firstName}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={billingAddress ? billingAddress.lastName : ''}
              name='lastName'
              placeholder='Last Name'
              error={errors.billingAddress.lastName}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='addressLine1'
              value={billingAddress ? billingAddress.addressLine1 : ''}
              placeholder='Address line 1'
              error={errors.billingAddress.addressLine1}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='addressLine2'
              value={billingAddress ? billingAddress.addressLine2 : ''}
              placeholder='Address line 2'
              error={errors.billingAddress.addressLine2}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='city'
              value={billingAddress ? billingAddress.city : ''}
              placeholder='City'
              error={errors.billingAddress.city}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='state'
              value={billingAddress ? billingAddress.state : ''}
              placeholder='State'
              error={errors.billingAddress.state}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='zipcode'
              placeholder='Zipcode'
              error={errors.billingAddress.zipcode}
              value={billingAddress ? billingAddress.zipcode : ''}
              onChangeCallback={(event)=> handleBillingAddressOnChange(event)}
            />
            <InputField
              type='text'
              name='country'
              value={billingAddress ? billingAddress.country : ''}
              placeholder='Country'
              error={errors.billingAddress.country}
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
              error={errors.shippingAddress.firstName}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.lastName : ''}
              name='lastName'
              placeholder='Last Name'
              error={errors.shippingAddress.lastName}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.addressLine1 : ''}
              name='addressLine1'
              placeholder='Address line 1'
              error={errors.shippingAddress.addressLine1}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.addressLine2 : ''}
              name='addressLine2'
              placeholder='Address line 2'
              error={errors.shippingAddress.addressLine2}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.city : ''}
              name='city'
              placeholder='City'
              error={errors.shippingAddress.city}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.state : ''}
              name='state'
              placeholder='State'
              error={errors.shippingAddress.state}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.zipcode : ''}
              name='zipcode'
              placeholder='Zipcode'
              error={errors.shippingAddress.zipcode}
              onChangeCallback={(event)=> handleShippingAddressOnChange(event)}
            />
            <InputField
              type='text'
              value={shippingAddress ? shippingAddress.country : ''}
              name='country'
              placeholder='Country'
              error={errors.shippingAddress.country}
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
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(values.products && values.products.length) 
                ? values.products.map((product) => renderProduct(product))
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