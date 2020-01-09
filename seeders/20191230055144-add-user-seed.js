'use strict';

const faker = require('faker')
const bcryptjs = require('bcryptjs')
const { sequelize } = require('../models')

const users = [
  {
    name: 'Ethan Huang',
    email: 'z7707092003@gmail.com',
    password: bcryptjs.hashSync('0', bcryptjs.genSaltSync(10)),
    birthday: faker.date.recent(3),
    admin: true,
    avatar: 'https://imgur.com/95Sf85I',
    address: '彰化縣彰化市民生路317巷17號',
    tel: '0912387122',
    role: 'member'
  },
  {
    name: 'Eddy Lin',
    email: 's024039@gmail.com',
    password: bcryptjs.hashSync('0', bcryptjs.genSaltSync(10)),
    birthday: faker.date.recent(3),
    admin: false,
    avatar: 'https://imgur.com/KOcqhhj',
    address: '彰化縣員林市三民街18號',
    tel: '048347171',
    role: 'member'
  },
  {
    name: '徐英誠',
    email: 'roger770516@hotmail.com',
    password: bcryptjs.hashSync('0', bcryptjs.genSaltSync(10)),
    birthday: faker.date.recent(3),
    admin: false,
    avatar: 'https://imgur.com/eEvrG3K',
    address: '彰化縣大村鄉大村村中正西路338號',
    tel: '048520149',
    role: 'member'
  },
  {
    name: 'Allbe Yu',
    email: 'allbeYu@mail.e-land.gov.tw',
    password: bcryptjs.hashSync('0', bcryptjs.genSaltSync(10)),
    birthday: faker.date.recent(3),
    admin: false,
    avatar: 'https://imgur.com/a5OSM1K',
    address: '宜蘭縣宜蘭市縣政北路1號',
    tel: '039251000',
    role: 'member'
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Users', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};
