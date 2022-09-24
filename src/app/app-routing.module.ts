import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './pages/collection/collection.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'collection', component: CollectionComponent },
  { path: '**', redirectTo: 'collection' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
