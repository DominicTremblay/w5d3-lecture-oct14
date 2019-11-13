const express = require('express');
const router = express.Router();

module.exports = pgClient => {

  router.get('/:id/todos', (req, res) => {

    // extracting the id from the URL
    const { id } = req.params;

    // Creating a join because we need data from multiple tables
    const query = {
      text: 'SELECT *  FROM categories INNER JOIN todos ON categories.id = todos.category_id WHERE categories.id = $1',
      values: [id]
    };

    pgClient
      .query(query)
      .then(result => res.json(result.rows))
      .catch(err => console.log(`Error getting data: ${err.message}`))

  });

  return router;
};