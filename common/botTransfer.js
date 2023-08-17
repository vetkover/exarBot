const {findUsersDBByLogin, findUsersDB, updateUserParameter} = require('../stuff/databaseWork.js')
const {customMessage} = require('../common/messages.js')
const {sendMoney} = require('../api/moneyTransferSend.js')

async function internal(args, messageObj){
    let targetUser = await findUsersDBByLogin(args[1])
    let messageUser = await findUsersDB( messageObj.user_id) 
    let amount = parseInt(args[2])
    if(targetUser != null && targetUser != false){
        if( amount <= messageUser.balance && amount > 0){
            await updateUserParameter(targetUser.id ,"balance" ,parseInt(parseInt(targetUser.balance) + amount))
            await updateUserParameter(messageUser.id ,"balance" ,parseInt(parseInt(messageUser.balance) - amount))
            
            let messageTarget = {     
                id: targetUser.id,  
                reply_id: null,
                  text: `Вы получили перевод от ${messageUser.login} в размере ${amount}$`        
                };

                let messageAuthor = {     
                    id: messageObj.user_id,  
                    reply_id: messageObj.message_id,
                      text: `Вы успешно перевели ${amount}$ ${targetUser.login}`        
                    };

              customMessage(messageTarget)
              customMessage(messageAuthor)
            

        } else {
            let message = {     
                id: messageObj.user_id,  
                reply_id: messageObj.message_id,
                  text: `У Вас нет такого колличества денег для такого перевода или сумма средств не совсем легальна.`        
                };
              customMessage(message)
        }
    } else {
        let message = {     
            id: messageObj.user_id,  
            reply_id: messageObj.message_id,
              text: `Этот человек не существует или не обслуживается и ему стоит подключиться к боту`        
            };
          customMessage(message)
    }
}

async function external(args, messageObj){
  let targetUser = await findUsersDBByLogin(args[1])
  let messageUser = await findUsersDB( messageObj.user_id) 
  let amount = parseInt(args[2])
  let  commissionUp = Math.floor( amount + (( amount) * 0.1));
  let commissionDown = Math.floor(amount - (( amount) * 0.1));
  if(targetUser != null && targetUser != false){
      if( commissionUp <= messageUser.balance && commissionUp > 0){
          await updateUserParameter(messageUser.id ,"balance" ,parseInt(parseInt(messageUser.balance) - commissionUp))
          await sendMoney(targetUser.id, commissionDown)

          let messageTarget = {     
              id: targetUser.id,  
              reply_id: null,
                text: `Вы получили перевод от ${messageUser.login} в размере ${commissionDown}$ на счёт Exarcheia.`        
              };

              let messageAuthor = {     
                  id: messageObj.user_id,  
                  reply_id: messageObj.message_id,
                    text: `Вы успешно перевели ${commissionDown}$ с учётом комиссии 10% ${targetUser.login} на счёт Exarcheia.`        
                  };

            customMessage(messageTarget)
            customMessage(messageAuthor)
          

      } else {
          let message = {     
              id: messageObj.user_id,  
              reply_id: messageObj.message_id,
                text: `У Вас нет такого колличества денег для такого перевода или сумма средств не совсем легальна.`        
              };
            customMessage(message)
      }
  } else {
      let message = {     
          id: messageObj.user_id,  
          reply_id: messageObj.message_id,
            text: `Этот человек не существует или не обслуживается и ему стоит подключиться к боту.`        
          };
        customMessage(message)
  }
}

module.exports = {internal, external}