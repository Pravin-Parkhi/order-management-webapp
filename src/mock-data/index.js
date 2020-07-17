export const ORDER_LIST = {
    orderList: [
      {
        orderId: 1,
        userDetails: {
          userId: 101,
          firstName: 'Nitish',
          firstName: 'Rana'
        },
        shippingAddress: {
          addressLine1: 'D-703, Concorder Moidway City',
          addressLine2: 'Basapura',
          city: 'Bangalore',
          state: 'Karnataka',
          zipcode: 442402,
          country: 'India'
        },
        billingAddress: {
          addressLine1: 'D-703, Concorder Moidway City',
          addressLine2: 'Basapura',
          city: 'Bangalore',
          state: 'Karnataka',
          zipcode: 442402,
          country: 'India'
        },
        orderDate: '04/02/2019',
        expectedDeliveryDate: '14/02/2019',
        status: 'completed',
        products: [
          {
            productId: 1001,
            productName: 'Stockholm Dining Table',
            quantity: 8,
            UnitPrice: 529,
            totalPrice: 4232,
            notes: 'This is test note'
          },
          {
            productId: 1002,
            productName: 'Dining Table',
            quantity: 2,
            UnitPrice: 529,
            totalPrice: 1058,
            notes: 'This is test note'
          },
          {
            productId: 1004,
            productName: 'Stockholm Dining Table',
            quantity: 1,
            UnitPrice: 529,
            totalPrice: 529,
            notes: 'This is test note'
          }
        ]
      },
      {
        orderId: 2,
        userDetails: {
          userId: 102,
          firstName: 'Nitin',
          firstName: 'Das'
        },
        shippingAddress: {
          addressLine1: 'D-703, Concorder Moidway City',
          addressLine2: 'Basapura',
          city: 'Bangalore',
          state: 'Karnataka',
          zipcode: 442402,
          country: 'India'
        },
        billingAddress: {
          addressLine1: 'D-703, Concorder Moidway City',
          addressLine2: 'Basapura',
          city: 'Bangalore',
          state: 'Karnataka',
          zipcode: 442402,
          country: 'India'
        },
        orderDate: '04/02/2019',
        expectedDeliveryDate: '14/02/2019',
        status: 'pending',
        products: [
          {
            productId: 1001,
            productName: 'Stockholm Dining Table',
            quantity: 8,
            UnitPrice: 529,
            totalPrice: 4232,
            notes: 'This is test note'
          },
          {
            productId: 1004,
            productName: 'Stockholm Dining Table',
            quantity: 1,
            UnitPrice: 529,
            totalPrice: 529,
            notes: 'This is test note'
          }
        ]
      }
    ]
  }