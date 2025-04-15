import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/contact/form/form.component';
import { ListComponent } from './components/contact/list/list.component';

export const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'adicionarContato', component: FormComponent},
  {path: 'listarContatos', component: ListComponent}
];
