const random_name = require('node-random-name');
const emailDomains = require('email-domains');

function newUser() {
  return {
    name: random_name(),
    email: emailDomains.generate(),
    password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."
  }
}
exports.newUser = newUser;