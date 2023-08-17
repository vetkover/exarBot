const {customMessage} = require('../common/messages.js')

async function help(zero, messageObj){
    let message = {     
      id: messageObj.user_id,  
      reply_id: messageObj.message_id,
        text: ` /ping - проверка работы бота <br> /balance - проверка внутреннего баланса бота <br> /moneyback (сумма) - перевод средств на свой счёт exarcheia <br> /transfer internal (никнейм) (сумма) - перевод средств внутри бота<br> /transfer external (никнейм) (сумма) - перевод средств на кошелёк exarcheia с комиссией 10%<br>/subs buy arbitration - покупка суточной подписки на услуги арбитража за 250к <br><br> Команды арбитража<br>/shop arbitration - принудительный просмотр товаров для арбитража<br>/shop show - просмотр цен у торговцев<br>`        
      };
    customMessage(message)
}

module.exports = {help}