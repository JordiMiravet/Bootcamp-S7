import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({ 
      projectId:environment.projectFirebaseId ,
      appId:environment.appFirebaseId, 
      storageBucket:environment.storageBucketFirebase, 
      apiKey:environment.apiKeyFirebase, 
      authDomain:environment.authDomainFirebase, 
      messagingSenderId:environment.messagingSenderFirebaseId 
     })), 
      provideAuth(() => getAuth())
  ]
};
