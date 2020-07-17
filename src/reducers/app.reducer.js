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

    default:
      return state
  }
};

export default appReducer;