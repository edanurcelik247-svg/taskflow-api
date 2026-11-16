const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

// JSON dosyasını okuyup görev dizisini döndürür
function readTasks() {
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content);
}

// Görev dizisini JSON dosyasına yazar
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

module.exports = { readTasks, writeTasks };
