/* eslint-disable */

let API_URL = "API_URL_REPLACE_ME";

if (process.env.NODE_ENV === "development") {
  API_URL = process.env.REACT_APP_API_URL;
}

module.exports = {
  API_URL: API_URL,
};
