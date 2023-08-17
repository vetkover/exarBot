const {customMessage} = require('../common/messages.js')
const {getItemsAtStoreList} = require('../api/shopItemsCategories.js')
const {userHavePermisson} = require('../stuff/userPermission.js')

async function shop(args, messageObj){
    switch(args[0]){

        case 'show':
            show(args, messageObj)
        break;

        case 'arbitration':
          arbitration(args, messageObj)
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

      let userHavePermission = await userHavePermisson(messageObj.user_id, "arbitration")
        if(userHavePermission){

        shopIds = [2,4,6,5]
        shopNames = ["Немного семени","Мясная лавка","Охота хлипкое","Ролекс"]
        categoriesIDs = ["9,8","10,11","13","12"]

        let finalMessage = "АРБИТРАЖНЫЙ КОЛОКОЛ<br>";
        let itsNotEmpty = false;
        let benefit = 0;
        let sumBenefit = 0;
        for(let i = 0; i < shopIds.length; i++ ){
            let valuesfromData = await extractValuesFromStore(shopIds[i], categoriesIDs[i])
            finalMessage = finalMessage.concat(`<br>Магазин ${shopNames[i]}<br>`)
                for(let r = 0; r < valuesfromData.displayNames.length; r++){
                    if (valuesfromData.priceBuy[r] < valuesfromData.priceSell[r]){
                        itsNotEmpty = true;
                    finalMessage = finalMessage.concat(` ${valuesfromData.displayNames[r]}: ${ (valuesfromData.priceSell[r] - valuesfromData.priceBuy[r]).toFixed(2) }$ <br>`)
                    benefit += (valuesfromData.priceSell[r] - valuesfromData.priceBuy[r]).toFixed(2) * 30
                    sumBenefit += (valuesfromData.priceSell[r] - valuesfromData.priceBuy[r]).toFixed(2) * 30
                } 

                if (r === valuesfromData.displayNames.length - 1) {
                  finalMessage = finalMessage.concat(`Ожидаемая прибыль с магазина: ${benefit}$<br>`)
                  benefit = 0;
                }
            }
            if(i == shopIds.length -1){
              finalMessage = finalMessage.concat(`<br>Ожидаемая общая прибыль: ${sumBenefit.toFixed(2)}$<br>`)
            }
        }

          if(itsNotEmpty){
              let message = {     
                  id: messageObj.user_id,  
                  text: finalMessage,  
                };
                customMessage(message)
                
          } else {
            let message = {     
              id: messageObj.user_id,  
              text: "АРБИТРАЖНЫЙ КОЛОКОЛ<br>В данный момент ничего на рынке нет",  
            };
            customMessage(message)
          }
    

   async function extractValuesFromStore(shopId, categories) {
        data = await getItemsAtStoreList(shopId, categories)
        const displayNames = [];
        const priceBuy = [];
        const priceSell = [];
      
        for (const item of data) {
          displayNames.push(item.display_name);
          priceBuy.push(item.price_buy);
          priceSell.push(item.price_sell);
        }
        return {
          displayNames,
          priceBuy,
          priceSell,
        };
      }
} else {
  let message = {     
    id: messageObj.user_id,  
    text: "У Вас нет прав на использование данной команды!",
    reply_id: messageObj.message_id       
  };
  customMessage(message)
}


}

async function show(args, messageObj){
    let userHavePermission = await userHavePermisson(messageObj.user_id, "arbitration")
    if(userHavePermission){

        async function formatMessage(){
            shopIds = [2,4,6,5]
            shopNames = ["Немного семени","Мясная лавка","Охота хлипкое","Ролекс"]
            categoriesIDs = ["9,8","10,11","13","12"]

            let finalMessage = "";

            for(let i = 0; i < shopIds.length; i++ ){
                let valuesfromData = await extractValuesFromStore(shopIds[i], categoriesIDs[i])
                finalMessage = finalMessage.concat(`Магазин ${shopNames[i]}<br>`)
                    for(let r = 0; r < valuesfromData.displayNames.length; r++){
                        finalMessage = finalMessage.concat(` ${valuesfromData.displayNames[r]} покупка: ${valuesfromData.priceBuy[r]}$ продажа: ${valuesfromData.priceSell[r]}$ <br>`)
                    }
                    let message = {     
                        id: messageObj.user_id,  
                        text: finalMessage,
                        reply_id: messageObj.message_id       
                      };
                      customMessage(message)
                      finalMessage = "";
            }
        }
        formatMessage()
       async function extractValuesFromStore(shopId, categories) {
            data = await getItemsAtStoreList(shopId, categories)
            const displayNames = [];
            const priceBuy = [];
            const priceSell = [];
          
            for (const item of data) {
              displayNames.push(item.display_name);
              priceBuy.push(item.price_buy);
              priceSell.push(item.price_sell);
            }
            return {
              displayNames,
              priceBuy,
              priceSell,
            };
          }

    } else {
        let message = {     
            id: messageObj.user_id,  
            text: "У Вас нет прав на использование данной команды!",
            reply_id: messageObj.message_id       
          };
          customMessage(message)
    }
}

module.exports = {
    shop
}