import { Observable, Subject } from 'rxjs';

export interface RouterEvent {
    url: string;
    state: any;
}

export class Router {
    get events(): Observable<RouterEvent> {
        return this._events$.asObservable();
    }

    private readonly _events$ = new Subject<RouterEvent>();
}