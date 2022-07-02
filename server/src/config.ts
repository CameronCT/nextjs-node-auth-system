interface ConfigProps {
    name: string;
    protocol: string;
    webUrl: string;
    apiUrl: string;
    oauthUrl: string;
    cookieUrl: string;
    filesUrl: string;
    corsAllowed: string[];
    wsPort: number | null;
    jwtSecret: string;
    jwtExpiry: number;
    emailCredentials: {
        type: 'sendgrid' | 'mailchimp';
        publicKey?: string;
        privateKey?: string;
    };
    emailConfiguration: {
        from: string;
    };
    secureRequest: boolean;
    createdDate: string;
}

const Config: ConfigProps = {
    name: 'Song Quiz',
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
    webUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
    apiUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
    oauthUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
    cookieUrl: process.env.NODE_ENV === "production" ? ".example.io" : "localhost",
    filesUrl: process.env.NODE_ENV === "production" ? 'https://cdn.example.io' : 'http://localhost:8080/files',
    corsAllowed:
        process.env.NODE_ENV !== 'production'
            ? [ 'http://localhost:3000' ]
            : [ 'https://example.io' ],
    wsPort: process.env.NODE_ENV === "production" ? 2095 : 2095,
    jwtSecret: process.env.JWT_SECRET || 'test_secret',
    jwtExpiry: 2630000 * 1000,
    emailCredentials: {
        type: 'sendgrid',
        publicKey: process.env.EMAIL_PUBLIC || '',
        privateKey: process.env.EMAIL_PRIVATE || ''
    },
    emailConfiguration: {
        from: 'contact@cameronct.com'
    },
    secureRequest: process.env.NODE_ENV === "production",
    createdDate: '2021-10-01T00:00:00Z'
}

export default Config;