const {fetchCall} = require('./callbackGate.js')

async function getItemsAtStore(shopId,categories) { //получение информации о товарах в магазине
      return await fetchCall(`launcher/shop/items/${shopId}?categories=${categories}`, "GET")
  }

  async function getItemsAtStoreList(shopId, categories){ // получение массива товаров с магазина

    async function request(shopId, categories){
        let data = getItemsAtStore(shopId, categories);
        return data;
    }
    return await request(shopId, categories)
}

// id 2 Немного семени (9 пища) (8 семена)
// id 4 Мясная лавка (10 сырые продукты) (11 жаренные продукты)
// id 6 Охота хлипкое (13 лут с врагов)
// id 5 Ролекс (12 ресурсы)

module.exports = {getItemsAtStore, getItemsAtStoreList};