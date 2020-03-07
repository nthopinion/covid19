import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'ff3afc80-a58a-4bac-b122-071b9ba46045',
  clientId: 'e630f415-02ae-4a92-b92f-aab0370cfc48',
  endpoints: {
    api: 'ff3afc80-a58a-4bac-b122-071b9ba46045',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
