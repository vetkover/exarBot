const {customMessage} = require('../common/messages.js')

async function help(zero, messageObj){
    let message = {     
      id: messageObj.user_id,  
      reply_id: messageObj.message_id,
        text: ` /ping - проверка работы бота <br> /balance - проверка внутреннего баланса бота <br> /moneyback (сумма) - перевод средств на свой счёт exarcheia <br> /transfer internal (никнейм) (сумма) - перевод средств внутри бота`        
      };
    customMessage(message)
}

module.exports = {help}