const {configDB} = require(`../stuff/databaseWork.js`)
async function getLastTransfer() { //проверка последних транзакций
  const config = await configDB();
    try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://api.exarcheia.com/api/interface/phone/transactions/last`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,nl;q=0.5,uk;q=0.4",
          "authorization": `Bearer ${config.bearer}`,
          "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-socket-id": "nlf17dYShI6zvPQlAJTT"
        },
        referrer: "https://exarcheia.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        "body": null,
        "method": "get",
        mode: "cors",
        credentials: "include"
      });
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

  

  module.exports = {getLastTransfer};