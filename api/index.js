const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ alter: false }).then(() => {
  console.log('Connected to DB');
  server.listen(3001, () => {
    console.log('Listening on port 3001'); // eslint-disable-line no-console
  });
});

