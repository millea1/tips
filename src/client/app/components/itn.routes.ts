// app
import { ItnHomeRoutes } from './home/itn.home.routes';
import { ItnAboutRoutes } from './about/itn.about.routes';
import { LoginComponent } from './login/login.component'

export const routes: Array<any> = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  ...ItnHomeRoutes,
  ...ItnAboutRoutes
];
