import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from './http-client';
import { Router } from './router';

export class SampleSubscriber {

    copyright$ = new BehaviorSubject<string>('');

    constructor(router: Router, http: HttpClient) {
        // imagine this as a service that will request some data from backend when user navigates to a certain url
        // sidenote: in Angular this would be done from the component in ngOnInit when it is loaded from the router module, without the need to subscribe to the events 
        router.events.pipe(filter(event => event.url.startsWith('/main'))).subscribe(event => {
            const url = new URL('/api/copyright', 'https://secure-backend-server:7661');
            url.searchParams.append('apiVersion', '2');
            url.searchParams.append('proxy', String(!!event.state?.useProxy));
            http.get(url, true).subscribe(result => this.copyright$.next(result.body));
        })
    }
}