const {getUnreadFriends} = require('../api/acceptedFriends.js')
const {markAsRead} = require('../api/markAsRead.js')
const {getLastUnreadMessages} = require('../api/readMessages.js')
const {customMessage} = require('../common/messages.js')
const {findUsersDB} = require('../stuff/databaseWork.js')

const {ping} = require('../commands/ping.js')
const {balance} = require(`../commands/balance.js`)
const {help} = require(`../commands/help.js`)
const {moneyBack} = require('../commands/returnFunds.js')
const {transfer} = require('../commands/transfer.js')

console.log('messages активировался');

async function entryPoint() {
    let userIdArray = await getUnreadFriends();
    if(userIdArray.length > 0){
      for(i = 0; i < userIdArray.length; i++){
      let chatId = (await findUsersDB(userIdArray[i])).chatID;
      let lastMessage = await getLastUnreadMessages(chatId);;
      if(lastMessage.text != undefined && lastMessage.text[0] === '/'){
        let clearMessage = lastMessage.text.split('/')[1]
        handleCommand(clearMessage, lastMessage)
      }
    await markAsRead(chatId)
    }
    }
  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function handleCommand(clearMessage, lastMessage) {
    const [command, ...args] = clearMessage.trim().split(' ');
    switch (command) {
      
      case 'ping':
        ping(clearMessage, lastMessage)
        break;

      case 'balance':
        balance(clearMessage, lastMessage)
        break;

      case 'help':
        help(clearMessage, lastMessage)
        break;

      case 'moneyback':
        moneyBack(args, lastMessage)
        break;

      case 'transfer':
        transfer(args, lastMessage)
        break;

      default:
        let message = {     
          id: lastMessage.user_id,  
          text: "Неизвестная команда",
          reply_id: lastMessage.message_id       
        };
        customMessage(message)
        break;
    }
  }


(async()=>{
  while(true){
    await delay(680)
    await entryPoint()
  }
})()
