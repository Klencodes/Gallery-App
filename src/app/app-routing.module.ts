import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainfeedComponent } from './components/mainfeed/mainfeed.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainfeedComponent,
    data:{
      title: 'Feeds'
    }, canActivate: [AuthGuard] 
  },
  { path: 'login', component: LoginComponent ,
      data:{
        title: 'Login'
      }
  },
  { path: 'signup', component: SignupComponent,
    data:{
      title: 'Signup'
    }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
