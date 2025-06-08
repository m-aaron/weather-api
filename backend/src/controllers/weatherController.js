import client from "../configs/redisConfig.js";
import fetchWeatherData from "../services/weatherService.js";
import asyncHandler from "express-async-handler";


const getWeather = asyncHandler(async(req, res) => {
    const { city, units } = req.query;

    if (!city)
        return res.status(404).json({
            success: false,
            message: "City is required"
        });

    const cacheKey = `${ city }:${ units || "metric" }`;
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
        const parsedData = JSON.parse(cachedData);

        return res.status(200).json({
            success: true,
            data: parsedData
        });
    }

    const weather = await fetchWeatherData(city, units);

    await client.set(cacheKey, JSON.stringify(weather), {
        EX: 60 * 60 * 12
    });

    res.status(200).json({
        success: true,
        message: "Weather data fetched from API",
        data: weather
    });

});


export { getWeather };