const fs = require("fs");
const tasksFilePath = "./tasks.json";

// Read tasks from the JSON file
function readTasks() {
    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([])); // Create file if it doesn't exist
    }
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
}

// Write tasks to the JSON file
function writeTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
