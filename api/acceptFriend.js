const {fetchCall} = require('./callbackGate.js')

async function setAcceptFriend(id, body) { //принять в друзья человека по id
  return await fetchCall(`profile/friend/accept`, "PATCH", body)
  }

  async function acceptFriend(id){
    const body = {
        user: id
      };
      return setAcceptFriend(id, body);
    }
  module.exports = {acceptFriend};