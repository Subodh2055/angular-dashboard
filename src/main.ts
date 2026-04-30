import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {routes} from "./app/app.routes";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {provideRouter, withInMemoryScrolling} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import '@angular/localize/init';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({})
    )
  ]
}).catch(err => console.error(err));
