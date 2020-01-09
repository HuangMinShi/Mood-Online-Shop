'use strict';

const { sequelize } = require('../models')
const images = [
  {
    url: '../images/product-0001/1-trueblack-1.jpg',
    is_main: true,
    product_id: 1
  },
  {
    url: '../images/product-0001/1-trueblack-2.jpg',
    is_main: false,
    product_id: 1
  },
  {
    url: '../images/product-0001/1-trueblack-3.jpg',
    is_main: false,
    product_id: 1
  },
  {
    url: '../images/product-0001/1-trueblack-4.jpg',
    is_main: false,
    product_id: 1
  },
  {
    url: '../images/product-0001/1-trueblack-5.jpg',
    is_main: false,
    product_id: 1
  },
  {
    url: '../images/product-0001/1-grayheather-1.jpg',
    is_main: true,
    product_id: 2
  },
  {
    url: '../images/product-0001/1-grayheather-2.jpg',
    is_main: false,
    product_id: 2
  },
  {
    url: '../images/product-0001/1-grayheather-3.jpg',
    is_main: false,
    product_id: 2
  },
  {
    url: '../images/product-0001/1-grayheather-4.jpg',
    is_main: false,
    product_id: 2
  },
  {
    url: '../images/product-0001/1-grayheather-5.jpg',
    is_main: false,
    product_id: 2
  },
  {
    url: '../images/product-0002/2-trueblack-1.jpg',
    is_main: true,
    product_id: 3
  },
  {
    url: '../images/product-0002/2-trueblack-2.jpg',
    is_main: false,
    product_id: 3
  },
  {
    url: '../images/product-0002/2-trueblack-3.jpg',
    is_main: false,
    product_id: 3
  },
  {
    url: '../images/product-0002/2-trueblack-4.jpg',
    is_main: false,
    product_id: 3
  },
  {
    url: '../images/product-0002/2-trueblack-5.jpg',
    is_main: false,
    product_id: 3
  },
  {
    url: '../images/product-0002/2-grayheather-1.jpg',
    is_main: true,
    product_id: 4
  },
  {
    url: '../images/product-0002/2-grayheather-2.jpg',
    is_main: false,
    product_id: 4
  },
  {
    url: '../images/product-0002/2-grayheather-3.jpg',
    is_main: false,
    product_id: 4
  },
  {
    url: '../images/product-0002/2-grayheather-4.jpg',
    is_main: false,
    product_id: 4
  },
  {
    url: '../images/product-0002/2-grayheather-5.jpg',
    is_main: false,
    product_id: 4
  },
  {
    url: '../images/product-0003/3-slatepopfloral-1.jpg',
    is_main: true,
    product_id: 5
  },
  {
    url: '../images/product-0003/3-slatepopfloral-2.jpg',
    is_main: false,
    product_id: 5
  },
  {
    url: '../images/product-0003/3-slatepopfloral-3.jpg',
    is_main: false,
    product_id: 5
  },
  {
    url: '../images/product-0003/3-slatepopfloral-4.jpg',
    is_main: false,
    product_id: 5
  },
  {
    url: '../images/product-0003/3-slatepopfloral-5.jpg',
    is_main: false,
    product_id: 5
  },
  {
    url: '../images/product-0003/3-outland-1.jpg',
    is_main: true,
    product_id: 6
  },
  {
    url: '../images/product-0003/3-outland-2.jpg',
    is_main: false,
    product_id: 6
  },
  {
    url: '../images/product-0003/3-outland-3.jpg',
    is_main: false,
    product_id: 6
  },
  {
    url: '../images/product-0003/3-outland-4.jpg',
    is_main: false,
    product_id: 6
  },
  {
    url: '../images/product-0003/3-outland-5.jpg',
    is_main: false,
    product_id: 6
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', images, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Images', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

