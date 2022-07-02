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
    Secret: "",
    Callback: `${Config.protocol}://${Config.oauthUrl}/auth/v2/discord/callback`,
  },
  Google: {
    Client: "",
    Secret: "",
    Callback: `${Config.protocol}://${Config.oauthUrl}/auth/v2/google/callback`,
  },
  GitHub: {
    Client: '',
    Secret: '',
    Callback: `${Config.protocol}://${Config.oauthUrl}/auth/v2/github/callback`,
  }
};

export default payload;
