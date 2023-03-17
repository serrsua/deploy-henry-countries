//                       oo0oo
//                      o8888888o
//                      88" . "88
//                      (| -- |)
//                      0\  =  /0
//                    __/---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  . .'
//          ."" '<  `._<|>/__.' >' "".
//         | | :  - \.;\ _ /;./ -  : | |
//         \  \ _.   \_ __\ /__ _/   .- /  /
//     =====-.____. ___/__.-___.-'=====
//                       =---='
//     ~~~~~~~~~~~
const server = require("./src/app.js");
const getApiData = require('./src/controllers/getApiData');
const { conn } = require('./src/db');
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await getApiData();
    console.log("DB Created");
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
