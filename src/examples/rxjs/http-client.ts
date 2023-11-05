import { Observable } from 'rxjs';

export interface HttpResult {
    body: string;
}

export class HttpClient {
    get(url: URL, cache: boolean): Observable<HttpResult> {
        // imagine this would be browser to server communication ...
        return new Observable<HttpResult>(subscriber => {
            setTimeout(() => subscriber.next({ body: 'abc' + Math.random() }), 1000);
        });
    }
}