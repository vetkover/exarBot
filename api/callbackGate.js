const { configDB } = require(`../stuff/databaseWork.js`);
async function fetchCall(url, method, body) {
  //функция запроса к серверу
  const config = await configDB();
  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      `https://api.exarcheia.com/api/${url}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en",
          authorization: `Bearer ${config.bearer}`,
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          timezone: "0",
        },
        referrer: "https://exarcheia.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: body,
        method: method,
        mode: "cors",
      }
    );
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return undefined;
  }
}

module.exports = { fetchCall };
