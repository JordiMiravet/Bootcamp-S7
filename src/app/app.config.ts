import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "s7-starwars-app", 
      appId: "1:853550212398:web:288bf72f65e8248a77c6bf", 
      storageBucket: "s7-starwars-app.firebasestorage.app", 
      apiKey: "AIzaSyBHqTYiZfWA-pgwD9DdQ8nGGmy9MGViAfE", 
      authDomain: "s7-starwars-app.firebaseapp.com", 
      messagingSenderId: "853550212398" 
     })), 
      provideAuth(() => getAuth())
  ]
};
