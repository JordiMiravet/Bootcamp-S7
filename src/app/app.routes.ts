import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StarshipsListComponent } from './pages/starships/starships-list/starships-list';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'starships',
        component: StarshipsListComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
