require("dotenv/config");

export default {
  BASE_URL: process.env.CHAINSITE_BASE_URL,
  AUTH_TOKEN: process.env.CHAINSITE_AUTH_TOKEN,
  PORT: process.env.PORT,
  ENV: "test",
  APP_NAME: "PAKT SDK Sample Usage",
};
