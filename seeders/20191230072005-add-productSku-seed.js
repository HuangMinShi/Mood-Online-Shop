'use strict';

const { sequelize } = require('../models')
const productSkus = [
  {
    sku: 'TB20001',
    size: 'S',
    stock: 1,
    product_id: 1
  },
  {
    sku: 'TB30001',
    size: 'M',
    stock: 2,
    product_id: 1
  },
  {
    sku: 'GH10001',
    size: 'XS',
    stock: 3,
    product_id: 2
  },
  {
    sku: 'GH20001',
    size: 'S',
    stock: 4,
    product_id: 2
  },
  {
    sku: 'GH30001',
    size: 'M',
    stock: 5,
    product_id: 2
  },
  {
    sku: 'GH40001',
    size: 'L',
    stock: 6,
    product_id: 2
  },
  {
    sku: 'TB20002',
    size: 'S',
    stock: 7,
    product_id: 3
  },
  {
    sku: 'GH10002',
    size: 'XS',
    stock: 8,
    product_id: 4
  },
  {
    sku: 'GH20002',
    size: 'S',
    stock: 9,
    product_id: 4
  },
  {
    sku: 'GH30002',
    size: 'M',
    stock: 10,
    product_id: 4
  },
  {
    sku: 'SP10003',
    size: 'XS',
    stock: 11,
    product_id: 5
  },
  {
    sku: 'SP20003',
    size: 'S',
    stock: 12,
    product_id: 5
  },
  {
    sku: 'SP30003',
    size: 'M',
    stock: 13,
    product_id: 5
  },
  {
    sku: 'SP40003',
    size: 'L',
    stock: 14,
    product_id: 5
  },
  {
    sku: 'OU10003',
    size: 'XS',
    stock: 15,
    product_id: 6
  },
  {
    sku: 'OU20003',
    size: 'S',
    stock: 16,
    product_id: 6
  },
  {
    sku: 'OU30003',
    size: 'M',
    stock: 17,
    product_id: 6
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

