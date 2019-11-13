const express = require('express');
const router = express.Router();

// destructuring the input object
module.exports = ({ getTodos, addTodo }) => {

  // OR use this
  // module.exports = (todoFcts) => {

  //   todoFcts.getTodos()

  // const getTodos = todofcts.getTodos;
  // const addTodo = todofcts.addTodo;

  // const { getTodos, addTodo } = todofcts;

  // console.log(todofcts);

  router.get('/', (req, res) => {

    getTodos()
      // getting the results of the query
      .then(result => res.json(result.rows))
      .catch(err => console.log(`Error getting the data: ${err}`));

  });


  // get the new todo from the request and create a new todo in the DB
  router.post('/', (req, res) => {

    // Extract the information from the request (Form)

    // const task = req.body.task;
    // const dueDate = req.body.due_date;
    // const categoryId = req.body.category_id;

    const { task, due_date: dueDate, category_id: categoryId } = req.body;

    addTodo(task, dueDate, categoryId)
      .then(result => {
        console.log(`${result.rowCount} todo has been inserted`);
        res.json(result.rows[0]);
      })
      .catch(err => console.log(`Error inserting Data: ${err}`));
  });

  return router;
};

