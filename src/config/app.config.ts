import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('app', () => ({
  [AppConfigEnum.nodeEnv]: process.env.NODE_ENV,
  [AppConfigEnum.name]: process.env.APP_NAME,
  [AppConfigEnum.workingDirectory]: process.env.PWD || process.cwd(),
  [AppConfigEnum.mailDirectory]: process.env.PWD || process.cwd(),
  [AppConfigEnum.frontendDomain]: process.env.FRONTEND_DOMAIN,
  [AppConfigEnum.backendDomain]: process.env.BACKEND_DOMAIN,
  [AppConfigEnum.port]:
    parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  [AppConfigEnum.apiPrefix]: process.env.API_PREFIX || 'api',
  [AppConfigEnum.fallbackLanguage]: process.env.APP_FALLBACK_LANGUAGE || 'en',
}));

export enum AppConfigEnum {
  'nodeEnv' = 'nodeEnv',
  'name' = 'name',
  'workingDirectory' = 'workingDirectory',
  'mailDirectory' = 'mailDirectory',
  'frontendDomain' = 'frontendDomain',
  'backendDomain' = 'backendDomain',
  'port' = 'port',
  'apiPrefix' = 'apiPrefix',
  'fallbackLanguage' = 'fallbackLanguage',
}
