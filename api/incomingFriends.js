const {fetchCall} = require('./callbackGate.js')

async function getIncomingFriends(page) { //получение информации о входящих запросах в друзья по страницам
  return await fetchCall(`profile/user/632/friends/incoming?page=${page}`, "GET")
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
  