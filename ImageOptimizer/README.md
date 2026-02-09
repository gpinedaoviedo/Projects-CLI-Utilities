# 📸 Image Optimizer CLI

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Sharp](https://img.shields.io/badge/Sharp-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A robust Command Line Interface (CLI) tool built with **Node.js** to optimize, resize, and convert images (JPEG, PNG, WebP) either in bulk or interactively. Designed for web development workflows that require lightweight images without sacrificing quality.

---

## 🚀 Key Features

* **Dual Operation Modes**:
    * **Interactive Mode**: Configure names and extensions file-by-file for total control.
    * **Auto Mode (`-y` / `--yes`)**: Batch processing with a one-time global format configuration.
* **Smart Resizing**: Automatically adjusts width to 800px while maintaining the original aspect ratio.
* **Performance Metrics**: Calculates and displays the exact disk space saved in KB and the reduction percentage.
* **Cross-Platform**: Native support to automatically open the destination folder on Windows, macOS, and Linux.
* **File Safety**: Automatically filters non-supported files and ensures the output directory structure exists via `.gitkeep`.

---

## 🛠️ Built With

* **[Sharp](https://sharp.pixelplumbing.com/)**: High-performance Node.js image processing.
* **[Chalk](https://github.com/chalk/chalk)**: Terminal string styling for a colorful UI.
* **[FS-Extra](https://github.com/jprichardson/node-fs-extra)**: Enhanced file system methods.
* **Node.js Native Modules**: `path`, `readline/promises`, `child_process`, and `os`.

---

## 📦 Installation

1. **Clone the repository**:

   git clone [https://github.com/gpinedaoviedo/Projects-CLI-Utilities.git] (https://github.com/gpinedaoviedo/Projects-CLI-Utilities.git)

   cd Projects-CLI-Utilities/ImageOptimizer

2. **Install Dependencies**:

    npm install

## 📖 Usage Guide

1. **Preparation**
    Place the images you want to process in the following directory: ./assets/originals/.

2. **Execution**
Choose the mode that best fits your needs:

    - Manual Mode (Interactive): Great for custom renaming and format selection for each file.

        npm start
    
    - Automatic Mode (Bulk): Processes the entire folder quickly using a global format.

        npm run auto
        or
        node app.js -y

3. **Results**
    The optimized images will be saved in ./assets/optimized/. Once the process is finished, the CLI will ask if you want to open the output folder automatically.

## 🧠 Key Learnings

Building this tool allowed me to deepen my understanding of several backend development concepts:

    - Asynchronous JavaScript: Managing complex async/await flows for heavy I/O operations.

    - CLI UX Design: Creating user-friendly tools that interact via terminal prompts and process arguments (process.argv).

    - System Integration: Executing shell commands dynamically based on the user's Operating System (OS).

    - Project Maintenance: Implementing best practices like .gitignore and .gitkeep to maintain a clean repository structure.

## 📝 License

This project is licensed under the MIT License. Feel free to use, modify, and share!