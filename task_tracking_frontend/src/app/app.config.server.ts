import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideAnimations } from '@angular/platform-browser/animations'; // Angular Material Animation Support

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideAnimations()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
