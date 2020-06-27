import { UserAgentApplication, Logger, LogLevel  } from 'msal';

export const requiresInteraction = (errorMessage) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf('consent_required') > -1 ||
    errorMessage.indexOf('interaction_required') > -1 ||
    errorMessage.indexOf('login_required') > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};

export const GRAPH_SCOPES = {
  OPENID: 'https://ntocustomer.onmicrosoft.com/api/openid',
  PROFILE: 'https://ntocustomer.onmicrosoft.com/api/profile',
  USER_READ: 'User.Read',
  MAIL_READ: 'Mail.Read',
};

export const GRAPH_ENDPOINTS = {
  ME: 'https://graph.microsoft.com/v1.0/me',
  MAIL: 'https://graph.microsoft.com/v1.0/me/messages',
};

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [
      GRAPH_SCOPES.OPENID,
      GRAPH_SCOPES.PROFILE,
      // GRAPH_SCOPES.USER_READ
    ],
  },
  // EMAIL: {
  //     scopes: [GRAPH_SCOPES.MAIL_READ]
  // }
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: '604ac5e2-70cb-4a09-9daf-f5aeef9b1aaf',
    authority:
      'https://ntocustomer.b2clogin.com/ntocustomer.onmicrosoft.com/B2C_1_signupsignin_portal',
    validateAuthority: false,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    navigateFrameWait: 0,
    logger: new Logger((logLevel, message) => {
      console.log(message);
    }, {
        level: LogLevel.Verbose,
        piiLoggingEnabled: true
    }),
    telemetry: {
        applicationName: "react-sample-app",
        applicationVersion: "1.0.0",
        telemetryEmitter: (events) => {
            console.log('Telemetry Events:', events);
        }
    }
  },
});
