import { config } from 'dotenv';
import RateLimiter from 'express-rate-limit';

config()

export const { 
  PORT,
  NODE_ENV,
  ENVIRONMENT,
  JWT_AUTH_SECRET,
  PRODUCTION_URL
} = process.env

/**
 * URL for version one of API
 * @constant
 */
export const API_VERSION_ONE_URL = "/api/v1";

export const STAGING_CLIENT_URL = "";
export const LOCAL_CLIENT_URL = "http://localhost:3000";

export const ORIGIN =
  NODE_ENV === "production"
    ? [PRODUCTION_URL]
    : [STAGING_CLIENT_URL, LOCAL_CLIENT_URL];

export const ROUTES = {
  //users
  CREATEUSER: "/users/register",
  LOGIN: '/users/login',

  // classes
  CREATECLASS: "/classes",
  DELETECLASS: "/classes/:class_id",
  ENROLLCLASS: "/classes/:class_id",
  DELETEENROLLEDCLASS: "/classes/enrolled/:class_id",
  GETCLASS: "/classes/:class_id",
  GETCLASSES: "/classes",

  // others
  HOME: "/",
  WILD_CARD: "/*",
}


/**
 * Password encryption salt rounds
 * @const
 */
export const SALT_ROUNDS = 10;
export const AUTH_TOKEN_LIFETIME = '1d';

/**
 * DDOS attack preventer. App should not allow a user
 * make more than 600 requests every 10 minutes i.e a request per second
 * @constant
 */
export const APP_USE_LIMIT = RateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 600, // limit each IP to 600 requests every 10 minutes, i.e a request per second,
  message: "Too many requests from this user, please try again after 5 minutes",
});

/**
 * Config options for cors
 * @constant
 */
export const CORS_OPTIONS = {
  origin: "*", //TODO: change origin to trusted IP
  credentials: true,
  // exposedHeaders: ["x-id-key"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};