import {ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideAngularSvgIcon} from "angular-svg-icon";
import {tokenInterceptor} from "@core/interceptors/token.interceptor";
import {errorInterceptor} from "@core/interceptors/error.interceptor";
import {httpCacheInterceptor} from "@core/interceptors/http-cache.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor, httpCacheInterceptor({ globalTTL: 600000 })])),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideAngularSvgIcon(),
  ]
};
