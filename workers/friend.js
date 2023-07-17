const {getNotAcceptedFriends} = require('../api/incomingFriends.js')
const {acceptFriend} = require('../api/acceptFriend.js')
const {addUserToDatabase, updateUserParameter} = require(`../stuff/databaseWork.js`)
const {createChat} = require(`../api/createChat.js`)

console.log('friend активировался');
async function entryPoint() {

  await delay(480)
    let awaitedList = await getNotAcceptedFriends()

    const arrayAwaitedList = await awaitedList.map(item => item.split(':'));

    if(awaitedList != null){
        for(i = 0 ; i < awaitedList.length; i++ ){
          await delay(260)
           let acceptRequest = await acceptFriend(arrayAwaitedList[i][1])
           if(acceptRequest.status == 1){
            let message = {
                id: arrayAwaitedList[i][1],
                login: arrayAwaitedList[i][0]
              };
              await addUserToDatabase(message)
              let getChatId = ((await createChat(arrayAwaitedList[i][1])).id)
              await updateUserParameter(arrayAwaitedList[i][1], "chatID", getChatId)
           } else {
            console.log(`при добавлении в друзья ${arrayAwaitedList[i][0]} id ${arrayAwaitedList[i][1]} произошла ошибка`)
           }
        }
    }
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

(async()=>{
  while(true){
    await delay(480)
    await entryPoint()
  }
})()
