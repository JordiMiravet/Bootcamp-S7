import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StarshipsListComponent } from './pages/starships/starships-list/starships-list';
import { StarshipDetailComponent } from './pages/starships/starship-detail/starship-detail';

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
        path: 'starships/:starshipName',
        component: StarshipDetailComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
