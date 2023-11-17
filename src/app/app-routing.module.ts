import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { 
    path: 'country/:id',
    component: CountryDetailsComponent, 
  }
  ,
  {
    path: 'error',
    component: NotFoundComponent,
  }
  ,
  {
    path: '**',
    component: NotFoundComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
