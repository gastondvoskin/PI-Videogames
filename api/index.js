const app = require('./src/app.js');
const { sequelize } = require('./src/db.js');
require('dotenv').config();

// const PORT = 3001;   /* old */
const PORT = process.env.PORT; /* new */

sequelize.sync({ force: true }).then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  });
});






// // ------- previous setup: commented. Start.  -------
// const server = require('./src/app.js');
// const { conn } = require('./src/db.js');

// conn.sync({ force: false }).then(() => {
//   console.log('Connected to DB');
//   server.listen(3001, () => {
//     console.log('Listening on port 3001'); // eslint-disable-line no-console
//   });
// });
// // ------- previous setup: commented. End.  -------

