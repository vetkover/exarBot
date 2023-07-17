const {customMessage} = require('../common/messages.js')
const {findUsersDB} = require('../stuff/databaseWork.js')

async function balance(zero, messageObj){
    let balance = await findUsersDB(messageObj.user_id);

    let message = {     
      id: messageObj.user_id,  
      reply_id: messageObj.message_id,
        text: `Ваш баланс бота - ${balance.balance}$`        
      };
    customMessage(message)
}

module.exports = {balance}