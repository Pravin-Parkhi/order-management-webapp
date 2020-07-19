import { zipObject } from 'lodash'

const ACTION_TYPES = [
  'GET_ORDER_LIST',

  'GET_ORDER_DETAILS',

  'SAVE_ORDER'
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)