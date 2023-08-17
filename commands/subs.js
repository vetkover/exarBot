
const {findUsersDB, updateUserParameter, updateUserSubscriptionsAndPermissions} = require('../stuff/databaseWork.js')
const {customMessage} = require('../common/messages.js')
async function subs(args, messageObj){
    switch(args[0]){

        case 'buy':
            switch(args[1]){
                case 'arbitration':
                   arbitration(args, messageObj)
                break;
            }
        break;

      default:
        let message = {     
          id: messageObj.user_id,  
          text: "Неизвестная команда",
          reply_id: messageObj.message_id       
        };
        customMessage(message)
        break;
    }
}

async function arbitration(args, messageObj){
    let buyer = await findUsersDB( messageObj.user_id)
    let owner = await findUsersDB(116)
    let price = 250000;
    if(buyer.balance >= price){
        
        await updateUserSubscriptionsAndPermissions(messageObj.user_id, Math.floor(Date.now() / 1000) + 86400)
        await updateUserParameter(messageObj.user_id,"balance" ,parseInt(parseInt(buyer.balance) - price))
        await updateUserParameter(owner.id,"balance" ,parseInt(parseInt(owner.balance) + price))
        let message = {     
            id: messageObj.user_id,  
            text: "Вы преобрели подписку, проверьте новые функции.",
            reply_id: messageObj.message_id       
          };
          customMessage(message)
    } else {
        let message = {     
            id: messageObj.user_id,  
            text: "У Вас недостаточно средств для покупки подписки. ",
            reply_id: messageObj.message_id       
          };
          customMessage(message)
    }
}



module.exports = {subs}