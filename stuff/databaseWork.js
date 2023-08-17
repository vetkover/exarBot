const fs = require('fs');
const path = require('path');

const filePath = path.resolve('./database.json');

async function readFileData() {
  try {
    const data = await fs.readFileSync(filePath, 'utf8');
    const fileData = JSON.parse(data);
    return fileData;
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
    throw err;
  }
}

async function getFileData() {
  try {
    const fileData = await readFileData();
    return fileData;
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    throw err;
  }
}

async function usersCount() {
  const fileData = await getFileData();
  return fileData.users.length;
}

async function findUsersDB(id) {
  const fileData = await getFileData();
  const data = fileData.users.find(data => data.id === id);
  if (data) {
    return data;
  } else {
    return false;
  }
}

async function findUsersDBByLogin(login) {
  const fileData = await getFileData();
  const data = fileData.users.find(data => data.login === login);
  if (data) {
    return data;
  } else {
    return false;
  }
}

async function configDB() {
  const fileData = await getFileData();
  const data = await fileData["config"];
  return data;
}

async function updateUserParameter(id, parameter, newValue) {
  try {
    console.log(id, parameter, newValue)
    const fileData = await getFileData();
    const user = fileData['users'].find(data => data.id == id);
    if (user) {
      if (user.hasOwnProperty(parameter)) {
        user[parameter] = newValue;

        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');
        console.log(`Параметр ${parameter} успешно обновлен для пользователя с id ${id}.`);
      } else {
        console.log(`Параметр ${parameter} не существует у пользователя с id ${id}.`);
      }
    } else {
      console.log(`Пользователь с id ${id} не найден.`);
    }
  } catch (err) {
    console.error('Ошибка записи файла:', err);
    throw err;
  }
}

async function addUserToDatabase(newUser) {
  try {
    const fileData = await readFileData();
    const existingUser = fileData.users.find(user => user.login === newUser.login);
    if (existingUser) {
      console.log(`Пользователь с логином ${newUser.login} уже существует в базе данных.`);
      return true;
    } else { 

    let newUserObj = {
      login: newUser.login,
      id: parseInt(newUser.id),
      balance: 0,
      chatID: 0,
      internal_transactions: [],
      external_transactions: [],
      permissions: [],
      subscriptions: {
        arbitration: 0
      }
    };
    fileData.users.push(newUserObj);

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

    console.log(`Новый пользователь ${newUser.login} в базу данных добавлен успешно!`);
  }
  } catch (err) {
    console.error('Ошибка записи файла:', err);
    throw err;
  }
}


async function addToExternalTransactions(userId, newTransaction) {
  try {
    const fileData = await readFileData();

    const user = fileData.users.find(user => user.id === userId);

    if (user) {
      user.external_transactions.push(newTransaction);

      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

    }
  } catch (err) {
    console.error('Ошибка записи файла:', err);
    throw err;
  }
}

async function userPermission(userId){
  const fileData = await readFileData();
    const user = fileData.users.find(user => user.id === userId);
    return user ? user.permissions : [];
  }

async function findUsersWithPermission(permissionToFind) {
  try {
    const fileData = await readFileData();
    if (Array.isArray(fileData.users)) {
      const usersWithPermission = fileData.users.filter(user => user.permissions.join(" ").includes(permissionToFind));
      return usersWithPermission.map(user => user.id);
    } else {
      console.error("Пользователь не найден");
      return [];
    }
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    return [];
  }
}


async function findUsersWithSubscriptions() {
  try {
    const fileData = await readFileData();
    const usersWithNonZeroSubscriptions = fileData.users.filter(
      (user) => Object.values(user.subscriptions).some((value) => value !== 0)
    );

    const result = usersWithNonZeroSubscriptions.map((user) => {
      return {
        subscriptions: user.subscriptions,
        permissions: user.permissions,
        id: user.id,
      };
    });

    return result;
  } catch (error) {
    console.error('Ошибка при поиске:', error);
    return [];
  }
}

async function updateUserSubscriptionsAndPermissions(userId, newArbitrationValue) {
  try {
    const fileData = await readFileData();
    const user = fileData.users.find(user => user.id === userId);

    if (user) {
      user.subscriptions.arbitration = newArbitrationValue;

      if (user.permissions.includes('arbitration')) {
        const index = user.permissions.indexOf('arbitration');
        user.permissions.splice(index, 1);
      } else {
        user.permissions.push('arbitration');
      }

      await fs.promises.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf8');
    } else {
      console.log(`Пользователь с id ${userId} не найден.`);
    }
  } catch (err) {
    console.error('Ошибка при обновлении данных пользователя:', err);
    throw err;
  }
}

module.exports = {
  findUsersDB,
  usersCount,
  updateUserParameter,
  addUserToDatabase,
  configDB,
  getFileData,
  addToExternalTransactions,
  findUsersDBByLogin,
  userPermission,
  findUsersWithPermission,
  findUsersWithSubscriptions,
  updateUserSubscriptionsAndPermissions
};
