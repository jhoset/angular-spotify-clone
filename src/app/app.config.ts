import {ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAngularSvgIcon} from "angular-svg-icon";
import {tokenInterceptor} from "@core/interceptors/token.interceptor";
import {errorInterceptor} from "@core/interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideAngularSvgIcon(),
  ]
};
