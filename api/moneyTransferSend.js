const {fetchCall} = require('./callbackGate.js')

async function sendMoney(id, amount) { //отправить деньги по id
   return fetchCall(`interface/phone/transactions/make/${id}?amount=${amount}`, "POST", null)
  }

  module.exports = {sendMoney};