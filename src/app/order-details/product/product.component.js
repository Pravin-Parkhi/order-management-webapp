import React from 'react'
import InputField from '../../../common/input-field/input-field.component'
import Button from '../../../common/button/button.component'

import './product.component.scss'

export default function Product (props) {
    const { productId, productName, quantity, unitPrice, note, totalPrice } = props.product
    const { deleteProductCallback, onChangeCallback } = props

    const handleOnChange = (event) => {
      onChangeCallback(event)
    }

    return(
      <tr>
        <td>
          <InputField
            type='text'
            name='productId'
            value={productId}
            readOnly={true}
            placeholder='Product Id'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
        <td>
          <InputField
            type='text'
            name='productName'
            value={productName}
            placeholder='Product Name'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
        <td>
          <InputField
            type='number'
            name='quantity'
            value={quantity}
            placeholder='Quantity'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
        <td>
          <InputField
            type='number'
            name='unitPrice'
            value={unitPrice}
            placeholder='Unit Price'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
        <td>
          <InputField
            type='number'
            name='totalPrice'
            value={totalPrice}
            disabled={true}
            placeholder='Total Price'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
        <td>
          <InputField
            type='text'
            name='note'
            value={note}
            placeholder='Write a note here..'
            onChangeCallback={(event)=> handleOnChange(event)}
          />
        </td>
          <td>
            <div className='action-wrapper'>
              <Button size='sm' type='danger' buttonClickCallback={deleteProductCallback}>delete</Button>
            </div>
          </td>
        </tr>
      )
}