import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UrlInterceptor} from './shared/interceptors/url.interceptor';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import {TokenInterceptor} from './shared/interceptors/token.interceptor';
import { MyFriendsComponent } from './pages/my-friends/my-friends.component';
import { BlockPageComponent } from './pages/block-page/block-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFriendsComponent,
    BlockPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
