const {configDB} = require(`../stuff/databaseWork.js`)
async function getItemsAtStore(shopId,categories) { //получение информации о товарах в магазине
  const config = await configDB();
  try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://api.exarcheia.com/api/launcher/shop/items/${shopId}?categories=${categories}`, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${config.bearer}`,
          "sec-ch-ua": "\"Opera GX\";v=\"99\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-socket-id": "6IXVUbysU83fab9XACYq"
        },
        "referrer": "https://exarcheia.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });;
      try {
        const data = await response.json();
        return data;
      } catch (error) {
        return undefined
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      return undefined;
    }
  }


  async function getItemsAtStoreList(shopId, categories){ // получение массива товаров с магазина
    try{
    async function request(shopId, categories){
        let data = await getItemsAtStore(shopId, categories);
        return data;
    }

    return await request(shopId, categories)

  }catch(err){
    return []
  }
}

// id 2 Немного семени (9 пища) (8 семена)
// id 4 Мясная лавка (10 сырые продукты) (11 жаренные продукты)
// id 6 Охота хлипкое (13 лут с врагов)
// id 5 Ролекс (12 ресурсы)

module.exports = {getItemsAtStore, getItemsAtStoreList};