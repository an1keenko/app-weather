import {appId, key} from "./key.js";
import { baseUrl, baseUrl1 } from "./config.js";

export const buildUrlWeatherToday  = (city) => `${baseUrl}q=${city}&units=metric&apikey=${key}`;
export const buildUrlWeatherThreeDays = (city) => `${baseUrl1}q=${city}&cnt=3&units=metric&appid=${appId}`;
