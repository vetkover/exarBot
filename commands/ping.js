const {customMessage} = require('../common/messages.js')

async function ping(zero, messageObj){
    let message = {     
        id: messageObj.user_id,  
        reply_id: messageObj.message_id,
        text: "pong"        
      };
    customMessage(message)
}

module.exports = {ping}