import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { finalize } from 'rxjs/operators/finalize';
@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor() {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const started = Date.now();
        let ok: string;
        
        return next.handle(req)
            .pipe(
                tap(
                    // Succeeds when there is a response; ignore other events
                    event => {
                        ok = event instanceof HttpResponse ? 'succeeded' : '';
                        if (ok == 'succeeded') {
                            let body = event['body'];
                            if(body.code != 200) {
                                //alert(body.message);
                            }
                            console.log(event['body']);
                        } else if (ok == 'failed') {
                            
                        }
                    },
                    // Operation failed; error is an HttpErrorResponse
                    error => ok = 'failed',
                ),
                // Log when response observable either completes or errors
                finalize(() => {
                    const elapsed = Date.now() - started;
                    const msg = `${req.method} "${req.urlWithParams}"
                       ${ok} in ${elapsed} ms.`;
                    //this.messenger.add(msg);
                })
            )
    }
}