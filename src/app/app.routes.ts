import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [{
    path: '',
    component: AppLayoutComponent,
    children: [
        {path: '', component: HomeComponent},
    ]
}];
