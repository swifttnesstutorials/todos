const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

// Routes

// GET /todos: Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: idCounter++,
        task: req.body.task,
        completed: req.body.completed || false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// PUT /todos/:id Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        todo.task = req.body.task !== undefined ? req.body.task : todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE /todos/:id Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
