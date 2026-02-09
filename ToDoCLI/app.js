#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import chalk from "chalk";

const tasks = []; //in-memory task storage
const DB_FILES = "tasks.json"; //file to store tasks persistently

// Load tasks from file "tasks.json" if it exists
function loadTasks(){
    try {
        if(!existsSync(DB_FILES)) return; //file does not exist

        const data = readFileSync(DB_FILES, "utf-8");
        const parsed = JSON.parse(data);
        if(data){
            tasks.length = 0; //clear current tasks
            tasks.push(...parsed); //load tasks from file
        }
    } catch (error) {
        console.error(chalk.red("\nError Loading tasks: ", error));
    }
}

//save tasks to file "tasks.json"
function saveTasks(){
    try {
        const data = JSON.stringify(tasks, null, 2);
        writeFileSync(DB_FILES, data, "utf-8");
        console.log(chalk.blue("\nTask saved successfully!"));

    } catch (error) {
        console.error("\nError saving tasks: ", error);
    }
}

//create readline interface
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

//display menu
const showMenu = () => {
    console.log(chalk.yellow("\n----- To-Do List CLI -----"));
    console.log(chalk.blue("\n--- Menu ---"));
    console.log(("1. Add Task"));
    console.log(("2. List Tasks"));
    console.log(("3. Complete Task"));
    console.log(("4. Delete Task"));
    console.log(("5. Exit"));
}

//prompt user for input
const chooseOption = async () => {
    const answer = await rl.question(chalk.magenta("\nChoose an option(num): "));
    let exit = false; 
    switch (answer) {
        case "1":
            await addTask();
            break;
        case "2":
            listTasks();
            break;
        case "3":
            await completeTasks();
            break;
        case "4":
            await deleteTasks();
            break;
        case "5":
            exit = true;
            rl.close();
            console.log(chalk.yellow("Exiting To-Do List CLI. Goodbye!"));
            break;

        default:
            if(isNaN(answer) || answer < 1 || answer > 5){
                console.log(chalk.red("Invalid option. Please choose a number between 1 and 5."));
            }
            break;
    }
}

//initial load
loadTasks();
showMenu();
chooseOption();

async function addTask(){
    const description = await rl.question("Enter task description: ");
    //validate input
    if (description.trim() === "") {
        console.log(chalk.red("Task description cannot be empty."));
        showMenu();
        chooseOption();
        return;
    }
    tasks.push({description: description.trim(), completed: false});
    console.log(chalk.green("Task added successfully!"));
    saveTasks();
    showMenu();
    chooseOption(); 
}

function listTasks(){
    console.log(chalk.blue("\nYour Tasks:"));
    if(tasks.length === 0){
        console.log(chalk.red("No task available."));
    } else {
        tasks.forEach((task, index) => {
            const status = task.completed ? chalk.green("✓") : chalk.red("✗");
            console.log(`${index + 1}. [status: ${status}] - ${task.description}`);
        })
    }
    showMenu();
    chooseOption();
}

async function completeTasks(){
    const num = await rl.question("Enter task ID to complete: ");
    let index = parseInt(num) - 1;
    if(index >= 0 && index < tasks.length){
        tasks[index].completed = true;
        saveTasks();
        console.log(chalk.green("Task marked as completed!"));
    } else {
        console.log(chalk.red("Invalid task number."));
    }
    showMenu();
    chooseOption();
}

async function deleteTasks() {
    const num = await rl.question("Enter task number to delete: ");
    let index = parseInt(num) - 1;
    if(index >= 0 && index < tasks.length){
        tasks.splice(index, 1);
        saveTasks();
        console.log(chalk.green("Task deleted successfully!"));
    } else {
        console.log(chalk.red("invalid task number."));
    }
    showMenu();
    chooseOption()  
}

