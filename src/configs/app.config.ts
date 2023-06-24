import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const serverPort = process.env.SERVER_PORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiredTime = process.env.JWT_EXPIRED_TIME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

export const config =
  process.env.NODE_ENV === "development"
    ? {
        nodeEnv: "development",
        serverPort: "3001",
        jwtSecretKey: jwtSecretKey !== undefined ? jwtSecretKey : "",
        jwtExpiredTime: jwtExpiredTime !== undefined ? jwtExpiredTime : "",
        xAccessToken: "api-bhakti-portfolio",
        xAccessTokenTest: "@p!.bh@kt!.p0rtf0l!0",
        dbHost: dbHost !== undefined ? dbHost : "",
        dbUsername: dbUsername !== undefined ? dbUsername : "",
        dbPassword: dbPassword !== undefined ? dbPassword : "",
        dbName: dbName !== undefined ? dbName : "",
        dbPort: "3306",
      }
    : {
        nodeEnv: "production",
        serverPort: serverPort !== undefined ? serverPort : "",
        jwtSecretKey: jwtSecretKey !== undefined ? jwtSecretKey : "",
        jwtExpiredTime: jwtExpiredTime !== undefined ? jwtExpiredTime : "",
        xAccessToken: "api-bhakti-portfolio",
        xAccessTokenTest: "@p!.bh@kt!.p0rtf0l!0",
        dbHost: dbHost !== undefined ? dbHost : "",
        dbUsername: dbUsername !== undefined ? dbUsername : "",
        dbPassword: dbPassword !== undefined ? dbPassword : "",
        dbName: dbName !== undefined ? dbName : "",
        dbPort: dbPort !== undefined ? dbPort : "",
      };
