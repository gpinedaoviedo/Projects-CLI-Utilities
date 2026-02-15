#!/usr/bin/env node
import fse from 'fs-extra';
import sharp from 'sharp';
import chalk from 'chalk';
import path from 'path';
import { createInterface } from 'node:readline/promises';
import { exec } from 'node:child_process';
import { platform } from 'node:os';

const rl = createInterface({input: process.stdin, output: process.stdout});
const inputDir = './assets/originals/';
const outputDir = './assets/optimized/';
const autoMode = process.argv.includes('-y') || (process.argv.includes('--yes'));
let globalExtension = "jpg"; // Default extension

console.log(chalk.yellow("\n----- Image Optimizer CLI -----"));

// Function to prompt for new image name
const imageName = async (fileName) => {
    const fileOptimized = `${fileName}_optimized`;
    const name = await rl.question(chalk.cyan(`New name (${chalk.yellow(`Default: ${fileOptimized}`)}): `));
    if (autoMode || name.trim() === '') {
        return fileOptimized;
    } else {
        return name.trim();
    }
}

// Function to prompt for new image extension
const imageExt = async (ext) => {
    const extension = await rl.question(chalk.cyan(`New extension (${chalk.yellow(`webp, png, default: ${ext}`)}): `));
    return extension.trim();
}

// If auto mode, ask for global extension once
if (autoMode){
    const ans = await rl.question(chalk.yellow(`\nAuto mode ON. Choose file type (webp, png, default: jpg): `));
    globalExtension = ans.trim().toLowerCase().replace('.', '') || "jpg";
    console.log(chalk.magenta(`Auto mode: All images will be converted to ${chalk.yellow(globalExtension)} format.`));
}

const optimizeImages = async () => {
    try {
        // Assure directories exist
        await fse.ensureDir('./assets/originals/');
        await fse.ensureDir('./assets/optimized/');
        await fse.ensureFile(`${outputDir}/.gitkeep`); // File to keep the folder in git
        const files = await fse.readdir(inputDir);
        const formatsRegex = /\.(jpeg|jpg|png|webp)$/i; // Regex for suportted formats
        const imageFiles = files.filter(file => file.match(formatsRegex)); //Filter only images files

        // Check if there are images files to process
        if (imageFiles.length === 0) {
            console.log(chalk.red("No image files found. Supported formats: jpeg, jpg, png, webp"));
            rl.close();
            return;
        }

        // Process each image file
        for(const file of files){
            const inputFilePath = path.join(inputDir, file); // Obtain full input file path
            const baseName = path.parse(file).name; // Obtain file name without extension
            let finalName, finalExtension; // Variables for final name and extension

            // Skip unsuportted files          
            if (!file.match(formatsRegex)){
                console.log(chalk.red(`Skipping unsupported file: ${file}`));
                continue;
            }
            
            // Verify mode and ask for name and extension acordingly
            if (autoMode){
                // Auto Mode
                finalName = `${baseName}_optimized`; // Same name for all files
                finalExtension = globalExtension; // Same extension for all files
            } else {
                // Interactive Mode
                console.log(chalk.yellow('\n-------------Config------------'));
                finalName = await imageName(baseName); // Ask for new name on each file
                const validExtension = path.extname(finalName).toLowerCase().replace('.', '') || "jpg";
                finalExtension = await imageExt(validExtension); // Ask for new extension on each file
                console.log(chalk.yellow('-------------------------------\n'));
            }
            
            // Validate extension
            if (!['jpeg', 'png', 'webp', 'jpg'].includes(finalExtension)) {
                console.log(chalk.red("Invalid extension. Using original extension instead."));
                finalExtension = globalExtension;
            }

            // Define output file path
            const outputFilePath = path.join(outputDir, `${finalName}.${finalExtension}`);
            console.log(chalk.magenta("Optimizing: " + inputFilePath));

            // Optimize and save image
            await sharp(inputFilePath)
                .resize(1920, 1080, { fit: 'inside'}) //Full HD max size, maintaining aspect ratio
                .toFormat(finalExtension, { quality: 80})
                .toFile(outputFilePath);
            
            console.log(chalk.greenBright("Optimized and saved to: " + outputFilePath));
            await sizeSaved(inputFilePath, outputFilePath); // Show size saved
        }
        console.log(chalk.yellow('\nAll images have been optimized successfully!'));
        // Ask to open the optimized images folder
        await openFolder(); 
    } catch (error) {
        console.error(chalk.red("\nError during optimization: ", error.message));
    } finally{
        console.log(chalk.yellow("Exiting Image Optimizer CLI. Goodbye!"));
        rl.close();
    }
}

// Function to calculate and display size saved
const sizeSaved = async (originalPath, optimizedPath) => {
    try {
        const originalStats = await fse.stat(originalPath);
        const optimizedStats = await fse.stat(optimizedPath);
        const sizeDifference = originalStats.size - optimizedStats.size;
        const sizeSavedPercent = ((sizeDifference / originalStats.size) * 100).toFixed(2);
        if (sizeSavedPercent < 0) {
            console.log(chalk.red(`Image has been optimized before. No size saved.`));
        } else {
            console.log(chalk.bgCyan(`Size saved: ${ (sizeDifference / 1024).toFixed(2)} KB (${sizeSavedPercent}%)`));
        }
    } catch (error) {
        console.error(chalk.red("\nError calculating size saved: ", error));
    }
}

// Function to open the optimized images folder
const openFolder = async () => {
    const openFolder = await rl.question(chalk.cyan('Do you want to open the optimized images folder? (y/n): '));
    if (openFolder.toLowerCase() === "y"){
        const folderPath = path.resolve(outputDir);
        let command;
        switch (platform()){
            case 'win32':
                command = 'start ""';
                break;
            case 'darwin':
                command = 'open';
                break;
            case 'linux':
                command = 'xdg-open';
                break;
            default:
                console.log(chalk.red("Unsupported OS for opening folders."));
                break;
        }
        exec(`${command} "${folderPath}"`); // Ejecutar el comando para abrir la carpeta de destino
    }
}

await optimizeImages();


