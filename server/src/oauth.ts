import Config from "./config";

export interface OAuthParameters {
  Client: string;
  Secret: string;
  Callback: string;
}

export interface OAuth {
  Discord: OAuthParameters;
  Google: OAuthParameters;
  GitHub: OAuthParameters;
}

const payload: OAuth = {
  Discord: {
    Client: "",
    Secret: String(process.env.OAUTH_DISCORD),
    Callback: `${Config.api.secure ? 'https' : 'http'}://${Config.api.oauthUrl}/auth/discord/callback`,
  },
  Google: {
    Client: "",
    Secret: String(process.env.OAUTH_GOOGLE),
    Callback: `${Config.api.secure ? 'https' : 'http'}://${Config.api.oauthUrl}/auth/google/callback`,
  },
  GitHub: {
    Client: '',
    Secret: String(process.env.OAUTH_GITHUB),
    Callback: `${Config.api.secure ? 'https' : 'http'}://${Config.api.oauthUrl}/auth/github/callback`,
  }
};

export default payload;
