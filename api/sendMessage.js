const { findUsersDB } = require(`../stuff/databaseWork.js`);
const { fetchCall } = require("./callbackGate.js");

async function sendMessages(chatId, body) {
  //отправить сообщение
  await fetchCall(`messages/create/${chatId}`, "POST", body), ": sendMessage";
}

async function sendMessage(id, text, reply) {
  let chatId = await findUsersDB(id);
  const body = `{\"text\":\"${text}\",\"reply_id\":null,\"images\":[],\"videos\":[]}`;
  sendMessages(chatId.chatID, body);
}

module.exports = { sendMessages, sendMessage };
