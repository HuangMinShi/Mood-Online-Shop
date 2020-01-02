'use strict';

const { sequelize } = require('../models')
const productSkus = [
  {
    sku: 'TB21',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 1,
    product_id: 1
  },
  {
    sku: 'TB31',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 2,
    product_id: 1
  },
  {
    sku: 'GH11',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 3,
    product_id: 1
  },
  {
    sku: 'GH21',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 4,
    product_id: 1
  },
  {
    sku: 'GH31',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 5,
    product_id: 1
  },
  {
    sku: 'GH41',
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    stock: 6,
    product_id: 1
  },
  {
    sku: 'TB22',
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    stock: 7,
    product_id: 2
  },
  {
    sku: 'GH12',
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    stock: 8,
    product_id: 2
  },
  {
    sku: 'GH22',
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    stock: 9,
    product_id: 2
  },
  {
    sku: 'GH32',
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    stock: 10,
    product_id: 2
  },
  {
    sku: 'SP13',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 11,
    product_id: 3
  },
  {
    sku: 'SP23',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 12,
    product_id: 3
  },
  {
    sku: 'SP33',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 13,
    product_id: 3
  },
  {
    sku: 'SP43',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 14,
    product_id: 3
  },
  {
    sku: 'OU13',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 15,
    product_id: 3
  },
  {
    sku: 'OU23',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 16,
    product_id: 3
  },
  {
    sku: 'OU33',
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    stock: 17,
    product_id: 3
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_skus', productSkus, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Product_skus', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

