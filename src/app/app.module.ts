import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DevUIModule } from 'ng-devui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './config/http.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { DevUIGlobalConfig, DevUIGlobalConfigToken, LazyLoadModule } from 'ng-devui/utils';
import { SettingComponent } from './setting/setting.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { StoreService } from './config/store.service';
import { LoginComponent } from './login/login.component';
const custom_global_config: DevUIGlobalConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    WallpaperComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevUIModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LazyLoadModule,
  ],
  providers: [
    HttpService,
    StoreService,
    {
      provide: DevUIGlobalConfigToken,
      useValue: custom_global_config
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
