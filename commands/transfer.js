const {internal, external} = require('../common/botTransfer.js')
async function transfer(args, messageObj){
    switch(args[0]){

        case 'internal':
            internal(args, messageObj)
        break;
        
        case 'external':
          external(args, messageObj)
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



module.exports = {transfer}