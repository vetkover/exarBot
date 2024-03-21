const {fetchCall} = require('./callbackGate.js')

async function getLastTransfer() { //проверка последних транзакций
    return await fetchCall(`interface/phone/transactions/last`, "GET")
  }

  

  module.exports = {getLastTransfer};