"use strict";
const apiKey = 'da32081895d1479cbfe75014192706';
const axios = require("axios");

const formatData = data => {
    let current = data.current;
    return  {
        location: `${data.location.name}, ${data.location.country}`,
        temperature: current.temp_c,
        condition: current.condition.text,
        code: current.condition.code,
        forecast: data.forecast.forecastday.map(day => {
            return {
                date: day.date,
                code: day.day.condition.code,
                condition: day.day.condition.text
            }
        })
    };
}

const getWeather = location => {
    return new Promise(async (resolve, reject) => {
        try {
            const weatherConditions = await axios.get("https://api.apixu.com/v1/forecast.json",
            {
                params: {
                    key: apiKey,
                    q: location,
                    days: 3
                }
            });
            resolve(formatData(weatherConditions.data));
        } catch (e) {
            reject(e);
        }
    })
};

module.exports = getWeather;