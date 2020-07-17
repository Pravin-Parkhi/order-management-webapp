import { zipObject } from 'lodash'

const ACTION_TYPES = [
  'GET_ORDER_LIST',
]

export default zipObject(ACTION_TYPES, ACTION_TYPES)