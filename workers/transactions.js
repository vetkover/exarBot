const {welcomeMessage} = require('../common/messages.js')
const {isTransferExist} = require(`../common/exarTransfer.js`)
const {getLastTransfer} = require(`../api/moneyTransferLast.js`)
console.log('transactions активировался');
async function entryPoint() {
  let lastTransactions = await getLastTransfer();

  for (let i = 0; i < lastTransactions["data"].length; i++) {
    if (!lastTransactions["data"][i].is_replenishment) {
      continue;
    }
    let transactionObj = {
      id: lastTransactions["data"][i].id,
      user: lastTransactions["data"][i].user,
      is_replenishment: lastTransactions["data"][i].is_replenishment,
      amount: lastTransactions["data"][i].amount
    };
    await isTransferExist([transactionObj]);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {
  while (true) {
    await delay(420);
    await entryPoint();
  }
})();
