import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    port: string | number;
    database: {
        MONGODB_URI: string;
        MONGODB_DB_MAIN: string;
    };
    secret: string;
    project: {
        name: string;
        logLevel: string;
    },
    grpc: {
        port: number;
        host: string;
    }
    hostName: string;
    ACCOUNT_SID_TWILIO: string;
    AUTH_TOKEN_TWILIO: string;
    ADMIN_ADDRESS: string;
    origin: string;
    origin2: string;
    tokenExpire: string;
    NODE_POLYGON_URL: string;
    contractAddress: string;
    chain: string,
    AWS_SECRET_NAME: string,
    rateLimit: {
        maxRequest: number
        maxTime: number // TIME IN MILISECONDS
    }
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongoadmin:JyPa9vgwmxYruWJ73i7@172.16.15.228:27017/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    hostName: process.env.hostName,
    ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
    AUTH_TOKEN_TWILIO: process.env.AUTH_TOKEN_TWILIO,
    ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
    NODE_POLYGON_URL: process.env.NODE_POLYGON_URL,
    contractAddress: process.env.contractAddress,
    chain: process.env.CHAIN,
    origin: process.env.ALLOWED_ORIGIN,
    origin2: process.env.ALLOWED_ORIGIN_2,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    AWS_SECRET_NAME: process.env.AWS_SECRET_NAME,
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10000,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const production: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
        MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    hostName: process.env.hostName,
    ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
    AUTH_TOKEN_TWILIO: process.env.AUTH_TOKEN_TWILIO,
    ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
    NODE_POLYGON_URL: process.env.NODE_POLYGON_URL,
    contractAddress: process.env.contractAddress,
    chain: process.env.CHAIN,
    origin: process.env.ALLOWED_ORIGIN,
    origin2: process.env.ALLOWED_ORIGIN_2,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    AWS_SECRET_NAME: process.env.AWS_SECRET_NAME,
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10000,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const test: IConfig = {
    port: process.env.PORT || 3000,
    database: {
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongoadmin:JyPa9vgwmxYruWJ73i7@172.16.15.228:27017/',
        MONGODB_DB_MAIN: 'test_users_db',
    },
    secret: process.env.SECRET || '@QEGTUI',
    project: {
        name: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
    },
    grpc: {
        port: Number(process.env.GRPC_CONTAINER_PORT),
        host: process.env.GRPC_CONTAINER_NAME,
    },
    hostName: process.env.hostName,
    ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
    AUTH_TOKEN_TWILIO: process.env.AUTH_TOKEN_TWILIO,
    NODE_POLYGON_URL: process.env.NODE_POLYGON_URL,
    ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
    contractAddress: process.env.contractAddress,
    chain: process.env.CHAIN,
    origin: process.env.ALLOWED_ORIGIN,
    origin2: process.env.ALLOWED_ORIGIN_2,
    tokenExpire: process.env.TOKEN_EXPIRE || '60m',
    AWS_SECRET_NAME: process.env.AWS_SECRET_NAME,
    rateLimit: {
        maxRequest: Number(process.env.MAX_REQUEST) || 10000,
        maxTime: Number(process.env.MAX_TIME) || 600000,
    },
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production,
};

export default config[NODE_ENV];
