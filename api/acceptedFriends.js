const {
  updateUserParameter,
  findUsersDB,
  configDB,
} = require(`../stuff/databaseWork.js`);
async function getAcceptedFriends(page) {
  //получение информации о друзьях по страницам
  const config = await configDB();
  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      `https://api.exarcheia.ru/api/profile/user/632/friends/accepted?page=${page}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language":
            "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,nl;q=0.5,uk;q=0.4",
            "authorization": `Bearer ${config.bearer}`,
            "sec-ch-ua":
            '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-socket-id": "nlf17dYShI6zvPQlAJTT",
        },
        referrer: "https://exarcheia.ru/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
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
    if (data) {
      let userOnPageCount = data["data"].length;
      for (i = 0; i <= userOnPageCount - 1; i++) {
        if (
          data["data"][i].count_not_read_messages != 0 &&
          data["data"][0].count_not_read_messages != null
        ) {
          ids.push(data["data"][i].id);
        }
      }
      return ids;
    } else {
      return [];
    }
  }
}

module.exports = { getAcceptedFriends, getUnreadFriends };
