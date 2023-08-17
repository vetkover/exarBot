const {configDB} = require(`../stuff/databaseWork.js`)
async function getIncomingFriends(page) { //получение информации о входящих запросах в друзья по страницам
  const config = await configDB();
  try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://api.exarcheia.com/api/profile/user/632/friends/incoming?page=${page}`, {
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


  async function getNotAcceptedFriends() {
      async function request(page) {
        let data = await getIncomingFriends(page);
        return data;
      }
  
      let ids = [];
      const pagesCount = (await request(0)).last_page;
  
      for (let pageCount = 0; pageCount < pagesCount; pageCount++) {
          let data = await request(pageCount);
          let userOnPageCount = data["data"].length;
          for (let i = 0; i < userOnPageCount; i++) {
            ids.push(`${data["data"][i].login}:${data["data"][i].id}`);
          }
      }
      return ids;
    }
  
  module.exports = { getNotAcceptedFriends, getIncomingFriends };
  