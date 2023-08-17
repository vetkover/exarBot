const {sendMessage} = require('../api/sendMessage.js')



async function customMessage(message){
    
    sendMessage(message.id, message.text, message.reply_id)
}


module.exports = {customMessage}