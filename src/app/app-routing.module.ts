import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
        path : '',
        redirectTo : '/movies',
        pathMatch : 'full'
  },
  {
    path : 'movies',
    component : IndexComponent
  },
  {
    path : 'movie/:id',
    component : MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }