const {fetchCall} = require('./callbackGate.js')

async function getAcceptedFriends(page) {
  return fetchCall(`profile/user/632/friends/accepted?page=${page}`, "GET")
}

async function getUnreadFriends() {
  // получение массива друзей у которых есть не прочитанные сообщения

  async function request(page) {
    let data = await getAcceptedFriends(page);
    return data;
  }

  let ids = [];
  var pagesCount = (await request(0)).last_page;
  var pageCount = 0;
  for (i = 0; i <= pagesCount; i++) {
    pageCount++;
    let data = await request(pageCount);
      let userOnPageCount = data["data"].length;
      for (s = 0; s <= userOnPageCount - 1; s++) {
        if (
          data["data"][s].count_not_read_messages != 0 &&
          data["data"][0].count_not_read_messages != null
        ) {
          ids.push(data["data"][s].id);
        }
      }
    }
    
    return ids
  }


module.exports = { getAcceptedFriends, getUnreadFriends };
