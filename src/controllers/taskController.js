const { readTasks, writeTasks } = require('../data/taskStore');

// GET /tasks  (isteğe bağlı ?status= ve ?priority= filtreleri)
function getTasks(req, res) {
  let tasks = readTasks();
  const { status, priority } = req.query;

  if (status) tasks = tasks.filter((t) => t.status === status);
  if (priority) tasks = tasks.filter((t) => t.priority === priority);

  res.status(200).json(tasks);
}

// GET /tasks/:id
function getTaskById(req, res) {
  const task = readTasks().find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }
  res.status(200).json(task);
}

// POST /tasks
function createTask(req, res) {
  const tasks = readTasks();
  const { title, description, status, priority, assignee } = req.body;

  // Yeni id, mevcut en büyük id'nin bir fazlası
  const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const newTask = {
    id: newId,
    title,
    description,
    status: status || 'pending',
    priority,
    assignee,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
}

// PUT /tasks/:id
function updateTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  const { title, description, status, priority, assignee } = req.body;
  // id ve createdAt değişmez
  tasks[index] = {
    ...tasks[index],
    title,
    description,
    status: status || tasks[index].status,
    priority,
    assignee,
  };

  writeTasks(tasks);
  res.status(200).json(tasks[index]);
}

// DELETE /tasks/:id
function deleteTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);
  res.status(200).json({ message: 'Görev silindi', task: deleted });
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
