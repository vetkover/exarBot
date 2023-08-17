const { customMessage } = require('../common/messages.js');
const { updateUserSubscriptionsAndPermissions, findUsersWithSubscriptions } = require('../stuff/databaseWork.js');

console.log('subscriptions активировался');

async function entryPoint() {
    let userWithSubs = await findUsersWithSubscriptions()

    userWithSubs.map(async (user) => {
        if(user.subscriptions.arbitration < Math.floor(Date.now() / 1000)){
            await updateUserSubscriptionsAndPermissions(user.id, 0)
            let message = {     
                id: user.id,  
                text: "Ваша подписка на арбитраж истекла.",  
              };
              await customMessage(message)
        }
    })
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async()=>{
  while(true){
    await delay(3000)
    await entryPoint();
  }
})()

