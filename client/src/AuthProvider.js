import React, { Component } from 'react';
import {
  msalApp,
  requiresInteraction,
  fetchMsGraph,
  isIE,
  GRAPH_ENDPOINTS,
  GRAPH_SCOPES,
  GRAPH_REQUESTS,
} from './auth-utils';
import config from './config';

const useRedirectFlow = true;

export default (C) =>
  class AuthProvider extends Component {
    constructor(props) {
      super(props);

      this.state = {
        account: null,
        idToken: null,
        authuser: null,
        error: null,
        emailMessages: null,
        graphProfile: null,
      };
    }


    // eslint-disable-next-line class-methods-use-this
    async acquireToken(request, redirect = true) {
      return msalApp.acquireTokenSilent(request).catch((error) => {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
        // due to consent or interaction required ONLY
        if (requiresInteraction(error.errorCode)) {
          return redirect
            ? msalApp.acquireTokenRedirect(request)
            : msalApp.acquireTokenPopup(request);
        }
      });
    }

    // eslint-disable-next-line class-methods-use-this
    async verifyUser(idToken) {
      return fetch(`${config.domainURL}/api/validateUser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwt: idToken }),
      }).then((response) => response.json());
    }

    async onSignIn(redirect) {
      if (redirect) {
        return msalApp.loginRedirect({
          scopes: GRAPH_REQUESTS.LOGIN.scopes,
          redirectUri: config.siteURL,
        });
      }
      const loginResponse = await msalApp
        .loginPopup(GRAPH_REQUESTS.LOGIN)
        .catch((error) => {
          this.setState({
            error: error.message,
          });
        });
      if(loginResponse){
        await this.postAuthenticationSteps(loginResponse.idToken, loginResponse.account);
      }
    }

    async postAuthenticationSteps(rawIdToken, account, useRedirectFlow = true){
      
        this.setState({
          idToken: rawIdToken,
          error: null,
          account: account,
        });

        const verifiedUser = await this.verifyUser(
          rawIdToken
        ).catch((error) => {
          this.setState({
            error: error.message,
          });
        });

        this.setState({
          authuser: verifiedUser,
          error: null,
        });

        const tokenResponse = await this.acquireToken(
          GRAPH_REQUESTS.LOGIN,
          useRedirectFlow
        ).catch((error) => {
          this.setState({
            error: error.message,
          });
        });

        if (tokenResponse) {
          const graphProfile = await fetchMsGraph(
            GRAPH_ENDPOINTS.ME,
            tokenResponse.accessToken
          ).catch(() => {
            this.setState({
              error: 'Unable to fetch Graph profile.',
            });
          });

          if (graphProfile) {
            this.setState({
              graphProfile,
            });
          }

          if (
            tokenResponse.scopes &&
            tokenResponse.scopes.indexOf(GRAPH_SCOPES.MAIL_READ) > 0
          ) {
            return this.readMail(tokenResponse.accessToken);
          }
        }      
    }
    // eslint-disable-next-line class-methods-use-this
    onSignOut() {
      msalApp.logout();
    }

    async onRequestEmailToken() {
      const tokenResponse = await this.acquireToken(
        GRAPH_REQUESTS.EMAIL,
        useRedirectFlow
      ).catch(() => {
        this.setState({
          error: 'Unable to acquire access token for reading email.',
        });
      });

      if (tokenResponse) {
        return this.readMail(tokenResponse.accessToken);
      }
    }

    async readMail(accessToken) {
      const emailMessages = await fetchMsGraph(
        GRAPH_ENDPOINTS.MAIL,
        accessToken
      ).catch(() => {
        this.setState({
          error: 'Unable to fetch email messages.',
        });
      });

      if (emailMessages) {
        this.setState({
          emailMessages,
          error: null,
        });
      }
    }

    async componentDidMount() {
      let responseObject =null;
      msalApp.handleRedirectCallback((error, response) => {
        if (error) {
          const errorMessage = error.errorMessage
            ? error.errorMessage
            : 'Unable to acquire access token.';
          // setState works as long as navigateToLoginRequestUrl: false
          this.setState({
            error: errorMessage,
          });
        }
        if(response){
          responseObject = response;
        }
      });
      if(responseObject){
        await this.postAuthenticationSteps(responseObject.idToken.rawIdToken, responseObject.account);
      }
    }

    render() {
      return (
        <C
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.props}
          account={this.state.account}
          authuser={this.state.authuser}
          idToken={this.state.idToken}
          emailMessages={this.state.emailMessages}
          error={this.state.error}
          graphProfile={this.state.graphProfile}
          onSignIn={() => this.onSignIn(useRedirectFlow)}
          onSignOut={() => this.onSignOut()}
          onRequestEmailToken={() => this.onRequestEmailToken()}
        />
      );
    }
  };
