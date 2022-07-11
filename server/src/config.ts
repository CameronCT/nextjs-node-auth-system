
interface ConfigProps {
    name: string;
    emailAddress: string;
    options: {
        enableGuests: boolean;
        enableActivation: boolean;
    };
    api: {
        secure: boolean;
        cors: string[];
        webUrl: string;
        apiUrl: string;
        oauthUrl: string;
        cookieUrl: string;
        filesUrl: string;
    };
    jwt: {
        secret: string;
        expiry: number;
    };
    emailConfiguration: {
        type: 'sendgrid' | 'mailchimp';
        publicKey?: string;
        privateKey?: string;
        from: string;
    };
    createdDate: string;
}

const Config: ConfigProps = {
    name: 'My First App',
    emailAddress: 'support@example.io',
    options: {
        enableGuests: true,
        enableActivation: true,
    },
    api: {
        secure: process.env.NODE_ENV === 'production',
        cors: process.env.NODE_ENV !== 'production'
            ? [ 'http://localhost:3000' ]
            : [ 'https://example.io' ],
        webUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
        apiUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
        oauthUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
        cookieUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'localhost',
        filesUrl: process.env.NODE_ENV === "production" ? 'https://example.io' : 'http://localhost:8080',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'test_secret',
        expiry: Math.round(60 * 60 * 24 * 7) * 1000,
    },
    emailConfiguration: {
        type: 'sendgrid',
        publicKey: process.env.EMAIL_PUBLIC || '',
        privateKey: process.env.EMAIL_PRIVATE || '',
        from: 'contact@cameronct.com'
    },
    createdDate: '2021-10-01T00:00:00Z'
}

export default Config;