import axios from 'axios';
import chalk from 'chalk';
import dotenv from 'dotenv'
import { parseArgs } from 'node:util';

dotenv.config();

function commandArgs() {
    try {
        const config = {
            options: {
                city: {type: "string", short: "c"},
                verbose: {type: "boolean", short: "v"}
            },
            allowPositionals: true
        }
        const {values, positionals} = parseArgs({options: config.options, allowPositionals: config.allowPositionals});

        // Validation: If no city is provided, show instruction and exit
        if (!values.city) throw new Error("Missing city argument");

        return {
            city: values.city?.toLowerCase().trim(),
            verbose: values.verbose ?? false,
            extra: positionals
        }
    } catch (error) {
        console.error(`Error: ${error.message}.`);
        console.log(chalk.yellow("\nUsage: npm start -c '(e.g. Roma, paris, texas)' or npm start --city '(e.g. Roma, paris, texas)'"));
        process.exit(1);
    }
}

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_URL;

// Fail early if file .env is not configured
if (!API_KEY || !BASE_URL) {
    console.error(chalk.red("Error: Configuration missing in .env (Check WEATHER_API_KEY and WEATHER_API_URL)."));    process.exit(1);
}

const flagsFunc = commandArgs();

function displayData (weatherData){
    if (!weatherData) return;        
    if (flagsFunc.verbose) console.log(chalk.blue(`Rendering output for ${weatherData.name}...`));

    console.log(chalk.green(`\n------Weather Report in ${weatherData.name}------`));
    console.log(chalk.cyan(("Description: "), chalk.white(weatherData.description)));
    console.log(chalk.cyan(`Temp:         ${chalk.white(weatherData.temp)}°C`));
    console.log(chalk.cyan(`Humidity:     ${chalk.white(weatherData.humidity)}%`));
    console.log(chalk.cyan(`Wind speed:   ${chalk.white(weatherData.speed)} m/s`));
    console.log(chalk.green(`-----------------------------------\n`));
}

async function getWeatherData(city){
    try {

        const API_URL = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        if (flagsFunc.verbose) console.log(chalk.blue(`[DEBUG]: Fetching data for ${city}...`));
        //API request
        const {data} = await axios(API_URL);
        //Data
        return { 
            name: data.name,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            speed: data.wind.speed
        };    

    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                console.log(chalk.red("Error 401: Invalid API Key. Check your .env or wait for activation."));
            } else if (error.response.status === 404) {
                console.log(chalk.red(`Error 404: City "${city}" not found.`));
            }
        } else {
            console.log(chalk.red("Error: Network problem or service unavailable."));
        }    
        return null;
    }
}

async function main() {
    const weatherData = await getWeatherData(flagsFunc.city);
    displayData(weatherData);
}

main();