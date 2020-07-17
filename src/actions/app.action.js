import ActionTypes from '../action-types/index'

export const getOrderList = () => {
  return {
    type: ActionTypes.GET_ORDER_LIST
  }
}

export const getOrderDetails = (params) => {
  return {
    type: ActionTypes.GET_ORDER_DETAILS,
    orderId: params.orderId
  }
}