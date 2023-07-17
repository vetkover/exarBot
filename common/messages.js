const {sendMessage} = require('../api/sendMessage.js')

async function welcomeMessage(message){} //проблема нулевого сообщения и да мне лень вводить условный оператор в обработку

async function customMessage(message){
    
    sendMessage(message.id, message.text, message.reply_id)
}


module.exports = {customMessage}