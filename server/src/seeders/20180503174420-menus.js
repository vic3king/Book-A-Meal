import moment from 'moment';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('menus', [
    {
      id: 'd48a03fa-ca24-4f5c-9ff2-61c6f5b7b633',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: '2018-06-24'
    },
    {
      id: '635e660b-06aa-4e62-91be-6c3df6c87abe',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: '2018-06-25'
    },
    {
      id: '0b0df326-6161-4c97-b5f3-8fa0384ac5cd',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: '2018-06-26'
    },
    {
      id: '2a19ef38-856c-403b-8726-229e47beef37',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: '2018-07-26'
    },
    {
      id: 'cdf0351d-d2c9-4303-a56f-fd33bb437491',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: moment().format('YYYY-MM-DD')
    },
    {
      id: 'aca43e8e-3315-451f-a523-1318f003463e',
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      date: moment().format('YYYY-MM-DD')
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('menus', null, {})
};
