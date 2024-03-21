const {fetchCall} = require('./callbackGate.js')

async function GetMessages(id) { //получить историю переписки с человеком по id
      return await fetchCall(`messages/${id}/index`, "GET")
  }

  async function getLastUnreadMessages(id) {
    async function request(id) {
      let data = await GetMessages(id);
      return data;
    }
  
    let mess = await request(id);
      data = {
        text: mess[0].text,
        user_id: mess[0]["user"].id,
        message_id: mess[0].id
      }
      return data;

    
  }

  

  module.exports = {GetMessages, getLastUnreadMessages};