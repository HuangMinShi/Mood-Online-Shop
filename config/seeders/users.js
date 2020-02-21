const faker = require('faker')
const bcryptjs = require('bcryptjs')

const users = [
  {
    name: 'Ethan Huang',
    email: 'z7707092003@gmail.com',
    password: bcryptjs.hashSync('0', bcryptjs.genSaltSync(10)),
    birthday: faker.date.recent(3),
    admin: true,
    avatar: 'https://imgur.com/95Sf85I',
    address: '彰化縣彰化市民權路124巷25號',
    tel: '0922564002',
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
    role: 'visitor'
  }
]

module.exports = users