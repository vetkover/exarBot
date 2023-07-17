const {customMessage} = require('../common/messages.js')
const {sendMoney} = require('../api/moneyTransferSend.js')
const {findUsersDB, updateUserParameter} = require('../stuff/databaseWork.js')
async function moneyBack(args, messageObj){

    let userDB = await findUsersDB(messageObj.user_id)
    let  commissionUp = Math.floor(parseInt(args[0]) + ( parseInt(args[0]) * 0.1));
    let commissionDown = Math.floor(parseInt(args[0]) - ( parseInt(args[0]) * 0.1));
    if(userDB.balance >= commissionUp){
      if( commissionUp > 0){
      await updateUserParameter(messageObj.user_id, "balance", userDB.balance-commissionUp)
      await sendMoney(messageObj.user_id, commissionDown)
      let userDBUpdate = await findUsersDB(messageObj.user_id)
      let message = {     
        id: messageObj.user_id,  
        reply_id: messageObj.message_id,
        text: `Перевод выполнен, вы вернули себе ${commissionDown} с учетом комиссии Exarcheia и ваш баланс бота равен ${userDBUpdate.balance}`        
      };

      customMessage(message)
    } else {
      let message = {     
        id: messageObj.user_id,  
        reply_id: messageObj.message_id,
        text: `Прости, но в данный момент вывод и ввод средств за одну транзакцию может быть в пределах 1-100000 долларов`        
      };

      customMessage(message)
    }
    } else {
      let message = {     
        id: messageObj.user_id,  
        reply_id: messageObj.message_id,
        text: `кажется ты пытаешься меня обмануть :/`        
      };

      customMessage(message)
    }
}



module.exports = {moneyBack}