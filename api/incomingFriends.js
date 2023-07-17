const {configDB} = require(`../stuff/databaseWork.js`)
async function getIncomingFriends(page) { //получение информации о входящих запросах в друзья по страницам
  const config = await configDB();
  try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://api.exarcheia.ru/api/profile/user/632/friends/incoming?page=${page}`, {
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
        "referrer": "https://exarcheia.ru/",
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


  async function getNotAcceptedFriends(){ // получение массива людей, которые ожидают принятия в друзья
    try{
    async function request(page){
        let data = await getIncomingFriends(page);
        return data;
    }

    let ids = [];
    var pagesCount = (await request(0)).last_page
    var pageCount = 0;
    for(i = 0; i < pagesCount; i++){
        pageCount++
        let data = await request(pageCount);
        let userOnPageCount = data["data"].length;
        for(i = 0; i < userOnPageCount; i++){
                ids.push(`${data["data"][i].login}:${data["data"][i].id}`);
        }
    }
    return ids
  }catch(err){
    return []
  }
}


module.exports = {getNotAcceptedFriends, getIncomingFriends};