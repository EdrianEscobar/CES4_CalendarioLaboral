import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthInterceptor } from './app/core/auth-interceptor';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
