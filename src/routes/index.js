import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import BaseLayout from '../common/base-layout/base-layout.component'
import OrderList from '../app/order-list/order-list.component'
import OrderDetails from '../app/order-details/order-details.component'


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <BaseLayout>
          <Route exact path='/' render={() => (<Redirect to='/order-list' />)} /> 
          <Route exact path='/order-list' component={OrderList} />
          <Route exact path='/order-details/:orderId' component={OrderDetails} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}