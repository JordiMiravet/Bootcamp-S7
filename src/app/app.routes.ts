import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StarshipsListComponent } from './pages/starships/starships-list/starships-list';
import { StarshipDetailComponent } from './pages/starships/starship-detail/starship-detail';
import { RegisterComponent } from './pages/auth/register/register';
import { LoginComponent } from './pages/auth/login/login';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'starships',
        component: StarshipsListComponent,
        ...canActivate( () => redirectUnauthorizedTo(['/register']) )
    },
    {
        path: 'starships/:starshipName',
        component: StarshipDetailComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
