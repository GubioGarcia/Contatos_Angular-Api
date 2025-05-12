import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/contact/form/form.component';
import { ListComponent } from './components/contact/list/list.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';
import { GrupoListComponent } from './components/grupo/grupo-list/grupo-list.component';
import { GrupoFormComponent } from './components/grupo/grupo-form/grupo-form.component';
import { GrupoEditComponent } from './components/grupo/grupo-edit/grupo-edit.component';

export const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'adicionarContato', component: FormComponent},
  {path: 'listarContatos', component: ListComponent},
  {path: 'editarContato/:id', component: ContactEditComponent},
  {path: 'adicionarGrupos', component: GrupoFormComponent},
  {path: 'listarGrupos', component: GrupoListComponent},
  {path: 'editarGrupo/:id', component: GrupoEditComponent}
];
