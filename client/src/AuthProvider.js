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

const useRedirectFlow = isIE();

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

    async handleRedirectCallback(tokenReceivedCallback, errorReceivedCallback){
      
    }

    async tokenReceivedCallback(response){
      console.log(response);
    }

    async errorReceivedCallback(response){
      console.log(response);
    }


    // eslint-disable-next-line class-methods-use-this
    async acquireToken(request, redirect=true) {
      // let token = sessionStorage.getItem('msal.idtoken');
      // if(token){
      //   return { accessToken: token };
      // }
      // const account = msalApp.getAccount();
      // const resp = msalApp.acquireTokenRedirect(request, "http://localhost:3000")
      // .then(data => {
      //   console.log(data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      // return resp;
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
              redirectUri: "http://localhost:3000"
          })
      }
      const loginResponse = await msalApp
        .loginPopup(GRAPH_REQUESTS.LOGIN)
        .catch((error) => {
          this.setState({
            error: error.message,
          });
        });

      if (loginResponse) {
        this.setState({
          idToken: loginResponse.idToken.rawIdToken,
          error: null,
        });

        const verifiedUser = await this.verifyUser(
          loginResponse.idToken.rawIdToken
        ).catch((error) => {
          this.setState({
            error: error.message,
          });
        });

        this.setState({
          authuser: verifiedUser,
          account: loginResponse.account,
          error: null,
        });

        const tokenResponse = await this.acquireToken(
          GRAPH_REQUESTS.LOGIN, useRedirectFlow
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

          if (tokenResponse.scopes && tokenResponse.scopes.indexOf(GRAPH_SCOPES.MAIL_READ) > 0) {
            return this.readMail(tokenResponse.accessToken);
          }
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
      msalApp.handleRedirectCallback((error) => {
        if (error) {
          const errorMessage = error.errorMessage
            ? error.errorMessage
            : 'Unable to acquire access token.';
          // setState works as long as navigateToLoginRequestUrl: false
          this.setState({
            error: errorMessage,
          });
        }
      });

      const account = msalApp.getAccount();

      this.setState({
        account,
      });

      if (account) {
        const tokenResponse = await this.acquireToken(
          GRAPH_REQUESTS.LOGIN,
          useRedirectFlow
        );

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

          const verifiedUser = await this.verifyUser(
            tokenResponse.idToken.rawIdToken
          ).catch((error) => {
            this.setState({
              error: error.message,
            });
          });
  
          this.setState({
            authuser: verifiedUser,
            account: account,
            error: null,
          });

          if (tokenResponse.scopes && tokenResponse.scopes.indexOf(GRAPH_SCOPES.MAIL_READ) > 0) {
            return this.readMail(tokenResponse.accessToken);
          }
        }
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
