import ActionTypes from '../action-types/index'
import { ORDER_LIST } from '../mock-data/index'
import { deepCopy } from '../utils/misc.utils';

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

    case ActionTypes.SAVE_ORDER: {
      let orderListCopy = deepCopy(state.orderList)
      const updatedOrder = action.order
      const orderIndx = orderListCopy.findIndex((order => order.orderId === updatedOrder.orderId))
      orderListCopy.splice(orderIndx, 1, updatedOrder)
      return {
        ...state,
        orderList: orderListCopy,
        orderDetails: updatedOrder
      }
    }

    default:
      return state
  }
};

export default appReducer;