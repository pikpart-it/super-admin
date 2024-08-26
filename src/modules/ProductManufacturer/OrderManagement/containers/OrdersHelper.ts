export const dateRangeOptions = [
    {
      name: 'Last day',
      value: 1,
    },
    {
      name: 'Last 3 days',
      value: 3,
    },
    {
      name: 'Last 7 day',
      value: 7,
    },
    {
      name: 'Last 14 day',
      value: 14,
    },
    {
      name: 'Last 30 day',
      value: 30,
    },
    {
      name: 'Last 90 day',
      value: 90,
    },
    {
      name: 'Last 180 day',
      value: 180,
    },
    {
      name: 'Last 365 day',
      value: 365,
    },
  
    {
      name: 'Custom Date Range',
      value: 'custom',
    },
  ]
  
  /////////// TABLE PREFERENCES OBJECTS //////////
  
  export const orderDateOptions = [
    { id: 0, displayName: 'Day', valueName: 'day', name: 'orderDate', checked: true },
    { id: 1, displayName: 'Time', valueName: 'L', name: 'orderDate', checked: false },
    {
      id: 2,
      displayName: 'Time from the order date',
      valueName: 'LT',
      name: 'orderDate',
      checked: false,
    },
  ]
  
  export const orderDetailsOptions = [
    { id: 1, displayName: 'Order ID', valueName: 'orderId', name: 'orderDetails', checked: true },
    {
      id: 2,
      displayName: 'Buyer name',
      valueName: 'firstName',
      name: 'orderDetails',
      checked: true,
    },
    {
      id: 3,
      displayName: 'Fulfilment method',
      valueName: 'fulfilmentMethod',
      name: 'orderDetails',
      checked: false,
    },
    {
      id: 4,
      displayName: 'Sales channel',
      valueName: 'salesChannel',
      name: 'orderDetails',
      checked: false,
    },
    {
      id: 5,
      displayName: 'Billing Country/Region',
      valueName: 'billingCountry',
      name: 'orderDetails',
      checked: false,
    },
  ]
  
  export const productNameOption = [
    {
      id: 0,
      displayName: 'Name',
      valueName: 'name',
      name: 'productName',
      checked: true,
    },
    {
      id: 1,
      displayName: 'Quantity',
      valueName: 'quantity',
      name: 'productName',
      checked: true,
    },
    {
      id: 2,
      displayName: 'SKU',
      valueName: 'sku',
      name: 'productName',
      checked: false,
    },
    {
      id: 3,
      displayName: 'ASIN',
      valueName: 'ASIN',
      name: 'productName',
      checked: false,
    },
    {
      id: 4,
      displayName: 'subtotal',
      valueName: 'subTotal',
      name: 'productName',
      checked: false,
    },
    {
      id: 5,
      displayName: 'Condition',
      valueName: 'condition',
      name: 'productName',
      checked: false,
    },
    {
      id: 6,
      displayName: 'Listing ID',
      valueName: 'orderId',
      name: 'productName',
      checked: false,
    },
    {
      id: 7,
      displayName: 'Order item ID',
      valueName: 'itemId',
      name: 'productName',
      checked: false,
    },
    {
      id: 8,
      displayName: 'Brand',
      valueName: 'brand',
      name: 'productName',
      checked: true,
    }
  ]
  
  export const customerOption = [
    {
      id: 0,
      displayName: 'Customer shipping service',
      valueName: 'shipping',
      name: 'customerOptions',
      checked: true,
    },
    {
      id: 1,
      displayName: 'Ship by date',
      valueName: 'shipByDate',
      name: 'customerOptions',
      checked: false,
    },
    {
      id: 2,
      displayName: 'deliver by date',
      valueName: 'deliverByDate',
      name: 'customerOptions',
      checked: false,
    },
  ]
  
  export const ordersPerPageOptions = [50, 100, 150, 200, 250]
  
  export const orderSortOptions = [
    'Order date (ascending)',
    'Order date (descending)',
    'Ship-by date (ascending)',
    'Ship-by date (descending)',
    'Shipping service (ascending)',
    'Shipping service (descending)',
    'Status (ascending)',
    'Status (descending)',
  ]
  