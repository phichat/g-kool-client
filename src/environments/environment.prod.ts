import { Environment } from '@delon/theme';

export const environment = {
  appVersion: require('../../package.json').version,
  production: true,
  useHash: false,
  api: {
    baseUrl: 'http://115.31.174.36/wms-api',
    clientUrl: 'http://115.31.174.36/wms',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
