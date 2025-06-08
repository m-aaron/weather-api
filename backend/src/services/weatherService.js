import axios from "axios";
import dotenv from "dotenv";
import { BASE_URL } from "../configs/weatherAPIConfig.js";
import asyncHandler from "express-async-handler";


dotenv.config();

const fetchWeatherData = asyncHandler(async(city, units = "metric") => {
    const params = {
        key: process.env.VISUAL_CROSSING_API_KEY,
        unitGroup: units === "imperial" ? "us" : "metric",
        include: "current",
        contentType: "json"
    };

    const response = await axios.get(`${BASE_URL}/${city}`, { params }); // API call

    const current = response.data.currentConditions; // Get current weather only

    return {
        location: response.data.resolvedAddress,
        temperature: current.time,
        description: current.conditions,
        feelsLike: current.feelslike,
        humidity: current.humidity,
        windSpeed: current.windspeed,
        icon: current.icon
    };
});


export default fetchWeatherData;