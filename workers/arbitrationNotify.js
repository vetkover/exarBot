const { customMessage } = require('../common/messages.js');
const { getItemsAtStoreList } = require('../api/shopItemsCategories.js');
const { findUsersWithPermission } = require('../stuff/databaseWork.js');

console.log('arbitrationNotify активировался');

async function entryPoint() {

  const now = new Date();
  const minutes = now.getMinutes();

  if(minutes === 59){
  console.log('исполнение arbitrationNotify');
  await delay(60000)
  let usersIdList = await findUsersWithPermission("arbitration");
    await findBenefit(usersIdList)

} else {return 0}

async function findBenefit(usersIdList){

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
                    finalMessage = finalMessage.concat(` ${valuesfromData.displayNames[r]}: выгода за единицу: ${ (valuesfromData.priceSell[r] - valuesfromData.priceBuy[r]).toFixed(2) }$ <br>`)
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
          for(let s = 0; s < usersIdList.length; s++ ){
              let message = {     
                  id: usersIdList[s],  
                  text: finalMessage,  
                };
                customMessage(message)
              }
              
          } else {
            console.log("нету товаров для арбитража")
           
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
}

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

