import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAffinity } from '@Ibrowser/storage-interface';

@Injectable()
export class BungieAffinitizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const affinity = getAffinity();
      request = request.clone({
        setHeaders: {
          Cookie: affinity
        }
      });
    } catch(e) {
      console.log(e);
    }
    
    return next.handle(request);
  }
}
