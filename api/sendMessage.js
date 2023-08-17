const {findUsersDB, configDB} = require(`../stuff/databaseWork.js`)

async function sendMessages(chatId, body) { //отправить сообщение
  const config = await configDB();
    try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://api.exarcheia.com/api/messages/create/${chatId}`, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,nl;q=0.5,uk;q=0.4",
          "authorization": `Bearer ${config.bearer}`,
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-socket-id": "3n-eanZT72EjLwH4ACaC"
        },
        "referrer": "https://exarcheia.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });;
      return true;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return undefined;
    }
  }

  async function sendMessage(id, text, reply){
    let chatId = await findUsersDB(id)
    const body = `{
        "text": "${text}",
        "reply_id": ${reply != null ? reply : "null"},
        "images": [],
        "videos": []
      }`;
    sendMessages(chatId.chatID, body)
  }


  module.exports = {sendMessages, sendMessage};