module.exports = {
    apps: [
        {
            name: "server",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "development",
                JWT_SECRET: process.env.JWT_SECRET,
                MONGODB_URL: process.env.MONGODB_URL,
                EMAIL_PUBLIC: process.env.EMAIL_PUBLIC,
                EMAIL_PRIVATE: process.env.EMAIL_PRIVATE,
                OAUTH_DISCORD: process.env.OAUTH_DISCORD,
                OAUTH_GOOGLE: process.env.OAUTH_GOOGLE,
                OAUTH_GITHUB: process.env.OAUTH_GITHUB
            },
            env_production: {
                NODE_ENV: "production",
                JWT_SECRET: process.env.JWT_SECRET,
                MONGODB_URL: process.env.MONGODB_URL,
                EMAIL_PUBLIC: process.env.EMAIL_PUBLIC,
                EMAIL_PRIVATE: process.env.EMAIL_PRIVATE,
                OAUTH_DISCORD: process.env.OAUTH_DISCORD,
                OAUTH_GOOGLE: process.env.OAUTH_GOOGLE,
                OAUTH_GITHUB: process.env.OAUTH_GITHUB
            } 
        },
    ],
};