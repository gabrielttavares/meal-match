import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = [
    'MONGO_URI',
    'SPOONACULAR_API_KEY',
    'PORT',
    'CHATTGPT_API_KEY',
    'YOUTUBE_API_KEY',
    'GOOGLE_CALENDAR_API_KEY'
];
requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Environment variable ${variable} is not set`);
    }
});

export const MONGO_URI = process.env.MONGO_URI as string;
export const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY as string;
export const PORT = parseInt(process.env.PORT || '5000', 10);
export const CHATTGPT_API_KEY = process.env.CHATTGPT_API_KEY as string;
export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY as string;
export const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY as string;