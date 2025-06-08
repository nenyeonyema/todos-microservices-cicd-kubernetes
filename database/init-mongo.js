db = db.getSiblingDB('todos');
db.todos.insertOne({ title: "Sample Todo", completed: false });
