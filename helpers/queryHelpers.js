
module.exports = pgClient => {

  const getTodos = () => {

    // Creating the text of the query
    const query = {
      text: 'SELECT * FROM todos'
    };

    // Running the query
    return pgClient
      .query(query);

  };

  const addTodo = (task, dueDate, categoryId) => {

    // Insert to the info to the DB with an INSERT query

    const query = {
      text: `INSERT INTO todos(task, due_date, category_id) VALUES($1, $2, $3) RETURNING *`,
      values: [task, dueDate, categoryId]
    };

    return pgClient
      .query(query);
  }

  return { getTodos, addTodo };
};