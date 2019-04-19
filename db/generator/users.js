const utils = require('./utils');

function newUser() {
  return {
    name: utils.random_name(),
    email: utils.randomEmail(),
    password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u." // bcrypted "password"
  }
}
exports.newUser = newUser;