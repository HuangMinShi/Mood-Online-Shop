'use strict';

const { sequelize } = require('../models')
const images = [
  {
    url: 'https://imgur.com/mpMhDrR',
    color: 'TRUE BLACK',
    product_id: 1
  },
  {
    url: 'https://imgur.com/ZtiZQ2T',
    color: 'TRUE BLACK',
    product_id: 1
  },
  {
    url: 'https://imgur.com/edC8CKS',
    color: 'TRUE BLACK',
    product_id: 1
  },
  {
    url: 'https://imgur.com/MpS62Ws',
    color: 'TRUE BLACK',
    product_id: 1
  },
  {
    url: 'https://imgur.com/8u2Uz2T',
    color: 'TRUE BLACK',
    product_id: 1
  },
  {
    url: 'https://imgur.com/Di9xxH8',
    color: 'GRAY HEATHER',
    product_id: 1
  },
  {
    url: 'https://imgur.com/ZcHlPvk',
    color: 'GRAY HEATHER',
    product_id: 1
  },
  {
    url: 'https://imgur.com/bsofBan',
    color: 'GRAY HEATHER',
    product_id: 1
  },
  {
    url: 'https://imgur.com/fiDSGrp',
    color: 'GRAY HEATHER',
    product_id: 1
  },
  {
    url: 'https://imgur.com/eM0LX91',
    color: 'GRAY HEATHER',
    product_id: 1
  },
  {
    url: 'https://imgur.com/C2nyaHr',
    color: 'TRUE BLACK',
    product_id: 2
  },
  {
    url: 'https://imgur.com/a920IQY',
    color: 'TRUE BLACK',
    product_id: 2
  },
  {
    url: 'https://imgur.com/2rNswb6',
    color: 'TRUE BLACK',
    product_id: 2
  },
  {
    url: 'https://imgur.com/UZpIkhK',
    color: 'TRUE BLACK',
    product_id: 2
  },
  {
    url: 'https://imgur.com/rkmfm5o',
    color: 'TRUE BLACK',
    product_id: 2
  },
  {
    url: 'https://imgur.com/YjXFZio',
    color: 'GRAY HEATHER',
    product_id: 2
  },
  {
    url: 'https://imgur.com/NfqKo7f',
    color: 'GRAY HEATHER',
    product_id: 2
  },
  {
    url: 'https://imgur.com/lyV8D63',
    color: 'GRAY HEATHER',
    product_id: 2
  },
  {
    url: 'https://imgur.com/oeMCZCk',
    color: 'GRAY HEATHER',
    product_id: 2
  },
  {
    url: 'https://imgur.com/qkZIo3f',
    color: 'GRAY HEATHER',
    product_id: 2
  },
  {
    url: 'https://imgur.com/pgycWdC',
    color: 'SLATE POP FLORAL',
    product_id: 3
  },
  {
    url: 'https://imgur.com/juV34JL',
    color: 'SLATE POP FLORAL',
    product_id: 3
  },
  {
    url: 'https://imgur.com/HKNYyFp',
    color: 'SLATE POP FLORAL',
    product_id: 3
  },
  {
    url: 'https://imgur.com/QEiU4Pc',
    color: 'SLATE POP FLORAL',
    product_id: 3
  },
  {
    url: 'https://imgur.com/wIe73hW',
    color: 'SLATE POP FLORAL',
    product_id: 3
  },
  {
    url: 'https://imgur.com/t3aswTW',
    color: 'OUTLAND',
    product_id: 3
  },
  {
    url: 'https://imgur.com/bNYAIpc',
    color: 'OUTLAND',
    product_id: 3
  },
  {
    url: 'https://imgur.com/IRhBzQI',
    color: 'OUTLAND',
    product_id: 3
  },
  {
    url: 'https://imgur.com/9BGVStr',
    color: 'OUTLAND',
    product_id: 3
  },
  {
    url: 'https://imgur.com/lQppzaE',
    color: 'OUTLAND',
    product_id: 3
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

