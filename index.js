require('dotenv').config();
const { Pool, Client } = require('pg')


const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

client.connect();


const text = 'SELECT * FROM role';
//const text = 'INSERT INTO role(role_name) VALUES($1) RETURNING *'
//const values = ['brianc', 'brian.m.carlson@gmail.com'];
const values = [];
client
  .query(text, values)
  .then(res => {
    console.log(res.rows)//.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  })
  .catch(e => console.error(e.stack))

// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

