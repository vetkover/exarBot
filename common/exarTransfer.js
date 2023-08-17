const {getFileData, addToExternalTransactions, updateUserParameter, findUsersDB } = require('../stuff/databaseWork.js')
const {customMessage} = require('../common/messages.js')


async function isTransferExist(transactionArray){
    let data = await getFileData();

    function findUserIdByLogin(login) {    
      const user = data.users.find(user => user.login === login);
      return user ? user.id : null;
    }    
    
    const ids = transactionArray.map(obj => obj.id);
    for(i = 0 ; i < ids.length; i++){
      if(someoneHasTransaction(ids[i]) == false){
        const newTransaction = {
          "id": transactionArray[i].id,
          "is_replenishment": transactionArray[i].is_replenishment,
          "amount": transactionArray[i].amount
        };
        let dbBalance = await findUsersDB(findUserIdByLogin(transactionArray[i].user))
        console.log( dbBalance.balance + newTransaction.amount)
        await addToExternalTransactions(findUserIdByLogin(transactionArray[i].user), newTransaction)
        await updateUserParameter(findUserIdByLogin(transactionArray[i].user), "balance", dbBalance.balance + newTransaction.amount)
        let message = {     
          id: findUserIdByLogin(transactionArray[i].user),  

          text: `Мы получили транзакцию от Вашего имени на сумму ${newTransaction.amount}$, ваш баланс равен ${ dbBalance.balance + newTransaction.amount}$. `
        };
        await customMessage(message)
      }
    }


    function someoneHasTransaction(id){
    let foundUser = false;
    
    for (const user of data.users) {
      if (user.external_transactions.some(transaction => transaction.id === id)) {
        foundUser = true;
        break;
      }
    }
    if (!foundUser) {
      return false;
    }
  }

  }


module.exports = {isTransferExist}