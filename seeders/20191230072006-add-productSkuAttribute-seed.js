'use strict';

const { sequelize } = require('../models')
const productSkuAttributes = [
  {
    attribute: 'color',
    value: 'TRUE BLACK',
    product_sku_id: 1
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 1
  },
  {
    attribute: 'color',
    value: 'TRUE BLACK',
    product_sku_id: 2
  },
  {
    attribute: 'size',
    value: 'M',
    product_sku_id: 2
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 3
  },
  {
    attribute: 'size',
    value: 'XS',
    product_sku_id: 3
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 4
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 4
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 5
  },
  {
    attribute: 'size',
    value: 'M',
    product_sku_id: 5
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 6
  },
  {
    attribute: 'size',
    value: 'L',
    product_sku_id: 6
  },
  {
    attribute: 'color',
    value: 'TRUE BLACK',
    product_sku_id: 7
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 7
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 8
  },
  {
    attribute: 'size',
    value: 'XS',
    product_sku_id: 8
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 9
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 9
  },
  {
    attribute: 'color',
    value: 'GRAY HEATHER',
    product_sku_id: 10
  },
  {
    attribute: 'size',
    value: 'M',
    product_sku_id: 10
  },
  {
    attribute: 'color',
    value: 'SLATE POP FLORAL',
    product_sku_id: 11
  },
  {
    attribute: 'size',
    value: 'XS',
    product_sku_id: 11
  },
  {
    attribute: 'color',
    value: 'SLATE POP FLORAL',
    product_sku_id: 12
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 12
  },
  {
    attribute: 'color',
    value: 'SLATE POP FLORAL',
    product_sku_id: 13
  },
  {
    attribute: 'size',
    value: 'M',
    product_sku_id: 13
  },
  {
    attribute: 'color',
    value: 'SLATE POP FLORAL',
    product_sku_id: 14
  },
  {
    attribute: 'size',
    value: 'L',
    product_sku_id: 14
  },
  {
    attribute: 'color',
    value: 'OUTLAND',
    product_sku_id: 15
  },
  {
    attribute: 'size',
    value: 'XS',
    product_sku_id: 15
  },
  {
    attribute: 'color',
    value: 'OUTLAND',
    product_sku_id: 16
  },
  {
    attribute: 'size',
    value: 'S',
    product_sku_id: 16
  },
  {
    attribute: 'color',
    value: 'OUTLAND',
    product_sku_id: 17
  },
  {
    attribute: 'size',
    value: 'M',
    product_sku_id: 17
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product_sku_attributes', productSkuAttributes, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Product_sku_attributes', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

