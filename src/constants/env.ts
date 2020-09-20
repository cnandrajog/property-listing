//process.env variables
export const PORT = parseInt(process.env.PORT);
export const DEBUG_MODE = process.env.DEBUG_MODE ? process.env.DEBUG_MODE.toLowerCase() === 'true' : false;
export const SIMPLY_RETS_API = process.env.SIMPLY_RETS_API;
export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const INTROSPECTION = process.env.INTROSPECTION ? process.env.INTROSPECTION.toLowerCase() === 'true' : false;
export const NODE_ENV = process.env.NODE_ENV || 'development';