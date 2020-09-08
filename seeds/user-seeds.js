const { User } = require('../models');
const userData = [
  {
    username: 'Tim',
    email: 'TimK@gmail.com',
    password: '',
  },
  {
    username: 'Ann',
    email: 'Ann.J.C@gmail.com',
    password: '',
  },
  {
    username: 'Kevin',
    email: 'KevinT92@gmail.com',
    password: '',
  },
  {
    username: 'ruohanW1234',
    email: 'ruohanW1234@gmail.com',
    password: '',
  },
  {
    username: 'Noah',
    email: 'J.Noah@gmail.com',
    password: '',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
