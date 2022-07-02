module.exports = {
    apps: [
        {
            name: "songtrivia-server",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
                JWT_SECRET: process.env.JWT_SECRET,
                MONGODB_URL: process.env.MONGODB_URL
            } 
        },
    ],
};