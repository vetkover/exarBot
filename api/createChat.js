const {fetchCall} = require('./callbackGate.js')

async function createChat(id) { //создать диалог с пользователем
  return await fetchCall(`dialog/user/${id}`, "GET")
  }
  module.exports = {createChat};


;