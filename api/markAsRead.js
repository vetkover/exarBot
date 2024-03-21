const {fetchCall} = require('./callbackGate.js')

async function markAsRead(id) { //создать диалог с пользователем
  return await fetchCall(`messages/read-mark-all/${id}`, "PATCH")

  }


  module.exports = {markAsRead};