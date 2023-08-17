const {configDB} = require(`../stuff/databaseWork.js`)
async function setAcceptFriend(id) { //принять в друзья человека по id
  const config = await configDB();
      const fetch = await import('node-fetch');
      const response = await fetch.default("https://api.exarcheia.com/api/profile/friend/accept", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": `Bearer ${config.bearer}`,
          "content-type": "application/json;charset=UTF-8",
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
        "body": `{\"user\":${id}}`,
        "method": "PATCH",
        "mode": "cors",
        "credentials": "include"
      });;
      try {
        const data = await response.json();
        return data;
      } catch (error) {
        return undefined
      }
  }

  async function acceptFriend(id){
    const body = {
        user: id
      };
      return setAcceptFriend(id);
    }
  module.exports = {acceptFriend};