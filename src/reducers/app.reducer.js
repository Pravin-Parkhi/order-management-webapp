import ActionTypes from '../action-types/index'
import { ORDER_LIST } from '../mock-data/index'

const defaultState = {
  orderList: ORDER_LIST.orderList
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case ActionTypes.GET_ORDER_LIST: {
      return {
        ...state,
        orderList: state.orderList
      }
    }

    case ActionTypes.GET_ORDER_DETAILS: {
      const orderList = state.orderList
      const orderId = action.orderId
      const orderDetails = orderList.find((order => order.orderId === orderId))
      return {
        ...state,
        orderDetails: orderDetails
      }
    }

    default:
      return state
  }
};

export default appReducer;