import React from 'react'

import { IconContext } from "react-icons"
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBin6Line } from 'react-icons/ri'

import IconWrapper from '../../../common/icon-wrapper/icon-wrapper.component'

import './product.component.scss'
import InputField from '../../../common/input-field/input-field.component'
import Button from '../../../common/button/button.component'

export default function Product (props) {
    const { productId, productName, quantity, unitPrice, totalPrice } = props.product
    const { deleteProductCallback } = props

    const handleOnChange = () => {

    }

    return(
      <tr>
        <td>
          <InputField
            type='text'
            value={productId}
            placeholder='Product Id'
            onChangeCallback={handleOnChange}
          />
        </td>
        <td>
          <InputField
            type='text'
            value={productName}
            placeholder='Product Name'
            onChangeCallback={handleOnChange}
          />
        </td>
        <td>
          <InputField
            type='number'
            value={quantity}
            placeholder='Quantity'
            onChangeCallback={handleOnChange}
          />
        </td>
        <td>
          <InputField
            type='number'
            value={unitPrice}
            placeholder='Unit Price'
            onChangeCallback={handleOnChange}
          />
        </td>
        <td>
          <InputField
            type='number'
            value={totalPrice}
            disabled={true}
            placeholder='Total Price'
            onChangeCallback={handleOnChange}
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