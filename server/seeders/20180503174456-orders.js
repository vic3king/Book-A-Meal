export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('orders', [
    {
      id: '067411a2-23c9-4ce9-b8b6-dff4bb34e01f',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      mealId: '64c45c00-ed18-44b7-862a-f12d0481696c',
      quantity: 1,
      status: 'pending',
      deliveryAddress: 'bajiki close'
    },
    {
      id: '95d84610-4e59-430c-9ab0-116bba424582',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      mealId: '64c45c00-ed18-44b7-862a-f12d0481696c',
      quantity: 1,
      status: 'delivered',
      deliveryAddress: 'bajiki close'
    },
    {
      id: 'd161e8e8-eed0-4869-bcf1-4679289d940c',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      mealId: '64c45c00-ed18-44b7-862a-f12d0481696c',
      quantity: 1,
      status: 'pending',
      deliveryAddress: 'Irepodun street'
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('orders', null, {})
};
