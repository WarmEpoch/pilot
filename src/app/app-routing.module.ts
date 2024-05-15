import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { LoginComponent } from './login/login.component';

export const routesChildren: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: '登录',
    data: {
      icon: 'icon-op-member'
    }
  },
  {
    path: 'wallpaper',
    component: WallpaperComponent,
    title: '壁纸',
    data: {
      icon: 'icon-setting'
    }
  }
]

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: routesChildren,
    title: 'Pilot',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
