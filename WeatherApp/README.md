# 🌦️ Weather CLI Tool

A lightweight and powerful Command Line Interface (CLI) tool built with **Node.js** to fetch real-time weather data for any city across the globe.

## ✨ Features

- 🌡️ **Real-time Data:** Get temperature, humidity, and wind speed instantly.
- 🔍 **Smart Search:** Handles multi-word city names (e.g., "New York") and special characters effortlessly.
- 🛡️ **Error Validation:** Clear feedback for invalid API keys, non-existent cities, or network issues.
- 🗣️ **Verbose Mode:** Use the `-v` flag to inspect the API request process (perfect for debugging).
- 🎨 **Elegant Interface:** Clean, organized, and color-coded terminal output powered by `chalk`.

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone [git clone https://github.com/gpinedaoviedo/Projects-CLI-Utilities.git](https://github.com/gpinedaoviedo/Projects-CLI-Utilities.git)
   cd Projects-CLI-Utilities/WeatherApp

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a .env file in the root directory and add your credentials:

WEATHER_API_KEY=your_openweathermap_api_key
WEATHER_API_URL=[https://api.openweathermap.org/data/2.5/weather](https://api.openweathermap.org/data/2.5/weather)

🛠️ UsageThe tool is designed to be intuitive. Note: Always use quotes for cities with names consisting of more than one word.

4. **Core Commands**
Action         Command
Get Weather:   npm start -c ""(city_name)""
Verbose Mode:  npm start -c ""(city_name)"" -v
Help/Manual,   npm start (Shows instructions if city is missing)

Examples
## Simple city
npm start -c "London"

## Multi-word city (requires quotes)
npm start -c "San Francisco"

## Using full flag with verbose mode
npm start --city "Tokyo" -v

📦 Architecture & Dependencies

The project follows a clean separation of concerns, decoupling data fetching logic from the display interface:
    
- Axios: Handles HTTP requests to the OpenWeatherMap API.  
- Chalk: Stylizes terminal strings with colors.
- Dotenv: Securely manages environment variables.
- util.parseArgs: Native Node.js argument parsing.

📝 Technical Requirements

- Node.js: v18.x or higher (required for native parseArgs support).
- API Key: Sign up for free at OpenWeatherMap to get your key.

⚖️ License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it!