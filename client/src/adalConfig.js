import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'ade42e26-6f43-4df5-aacb-5f736672a1d0',
  clientId: '604ac5e2-70cb-4a09-9daf-f5aeef9b1aaf',
  endpoints: {
    api: 'ntocustomer.onmicrosoft.com',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
