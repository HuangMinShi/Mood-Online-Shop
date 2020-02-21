const faker = require('faker')

const products = [
  {
    sn: '0001',
    name: 'MEN\'S BRTN CREW SWEATSHIRT',
    description: faker.lorem.lines(2),
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    color_id: 1,
    category_id: 2
  },
  {
    sn: '0001',
    name: 'MEN\'S BRTN CREW SWEATSHIRT',
    description: faker.lorem.lines(2),
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    color_id: 2,
    category_id: 2
  },
  {
    sn: '0002',
    name: 'MEN\'S CROWN BONDED FULL- ZIP HOODIE',
    description: faker.lorem.lines(2),
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    color_id: 1,
    category_id: 2
  },
  {
    sn: '0002',
    name: 'MEN\'S CROWN BONDED FULL- ZIP HOODIE',
    description: faker.lorem.lines(2),
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    color_id: 2,
    category_id: 2
  },
  {
    sn: '0003',
    name: 'MEN\'S CREEKSIDE SHORT',
    description: faker.lorem.lines(2),
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    color_id: 3,
    category_id: 4
  },
  {
    sn: '0003',
    name: 'MEN\'S CREEKSIDE SHORT',
    description: faker.lorem.lines(2),
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    color_id: 4,
    category_id: 4
  }
]

module.exports = products