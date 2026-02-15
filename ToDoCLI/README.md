# 📝 To-Do List CLI  

A simple yet robust command-line application built with **Node.js** that allows users to manage tasks with full **data persistence** using the local file system.

## 🚀 Features

- Add, list, complete, and delete tasks
- Persistent storage using a local JSON file
- Clean and interactive CLI interface
- Asynchronous input handling
- Lightweight and dependency-minimal design

## 1. General Description

This version of the **To-Do List CLI** introduces **persistent storage** using the **Node.js file system API**.  
Tasks are automatically saved to a local **JSON file**, allowing the application to restore data on every launch.

This project demonstrates core backend concepts such as file handling, asynchronous input, and clean application flow.

---

## 2. Requirements and Dependencies

### Environment
- **Node.js** (v18 or higher recommended)

### Core Modules
- `node:fs`  
  Used for reading and writing files to disk.
- `node:readline/promises`  
  Provides an asynchronous command-line interface.

### External Modules
- `chalk`  
  Used for colored and formatted console output.

---

## 3. Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/gpinedaoviedo/Projects-CLI-Utilities.git
cd Projects-CLI-Utilities/ToDoCLI
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the application

```bash
node app.js
```
or
```bash
node start
```
---

## 4. Usage

Once the application starts, you will see an interactive menu:

```text
----- To-Do List CLI -----

1. Add Task
2. List Tasks
3. Complete Task
4. Delete Task
5. Exit
```

### Example Workflow

1. Select **Add Task** and enter a description.
2. List all tasks to view their status.
3. Mark tasks as completed.
4. Delete tasks you no longer need.
5. Exit the application safely.

All changes are automatically saved to **`tasks.json`**.

---

## 5. Persistence Handling (FS Module)

The application uses a local file named **`tasks.json`** as a lightweight database.

### `loadTasks()`

* Checks file existence using `existsSync()`
* Reads data using `readFileSync()`
* Parses JSON and loads tasks into memory
* Prevents crashes with error handling

### `saveTasks()`

* Serializes task data into formatted JSON
* Writes synchronously to disk
* Ensures data integrity before returning to the menu

---

## 6. Application Structure

```text
[Start]
   |
   v
[loadTasks]  ← Initial load from disk
   |
   v
[Main Loop]
   |-- (1) addTask        → saveTasks → Menu
   |-- (2) listTasks      → Menu
   |-- (3) completeTasks → saveTasks → Menu
   |-- (4) deleteTasks   → saveTasks → Menu
   |-- (5) Exit          → Application Close
```

---

## 7. Portfolio & Learning Highlights

I built this project to strengthen my understanding of **Node.js fundamentals** by working on a real, practical CLI application.

This project demonstrates practical knowledge of:

* Node.js core modules (`fs`, `readline`)
* Asynchronous programming with `async/await`
* File-based persistence
* Error handling and input validation
* Clean CLI UX design
* Modular and readable code structure

---

## 8. Technical Notes

* Synchronous file operations are intentionally used due to the single-user CLI context.
* The `tasks.json` file is created automatically after the first task is added.
* No external database or framework is required.

---


## 📅 Additional Information

* **Date:** January 2026
* **Project Type:** Educational / Portfolio CLI
* **Persistence:** Local JSON file
