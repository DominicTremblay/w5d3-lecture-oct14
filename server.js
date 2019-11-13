const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const todosRoutes = require('./routes/todos');
const categoriesRoutes = require('./routes/categories');
const queryHelpers = require('./helpers/queryHelpers');

const port = process.env.PORT || 3000;
const app = express();

require('dotenv').config();

const connectionOptions = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pgClient = new Client(connectionOptions);

// Connecting to the databse

pgClient
  .connect()
  .then(() => console.log(`Connected to ${pgClient.database} database`))
  .catch(err => console.log(`Error connecting to db: ${err.message}`));

// parse application/json
app.use(bodyParser.json());


// activate the todos routes
app.use('/todos', todosRoutes(queryHelpers(pgClient)));
app.use('/categories', categoriesRoutes(pgClient));

app.listen(port, () => console.log(`Server listening on port ${port}`));
