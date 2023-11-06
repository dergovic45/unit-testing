import { Subject, of } from 'rxjs';
import { HttpClient } from './http-client';
import { Router, RouterEvent } from './router';
import { SampleSubscriber } from './sample-subscriber';

describe('SampleSubscriber', () => {
    const eventsSubject$ = new Subject<RouterEvent>();
    let http: HttpClient;
    let service: SampleSubscriber;

    beforeEach(() => {
        // we don't need the full router object, we just want to intercept the events
        const router = { events: eventsSubject$.asObservable() } as Router;
        // httpClient could also be a mock if it has more complicated dependencies
        http = new HttpClient();
        service = new SampleSubscriber(router, http);
    });

    it('should not react to unrelated event url', () => {
        jest.spyOn(service.copyright$, 'next');
        const getFnSpy = jest.spyOn(http, 'get');

        eventsSubject$.next({ url: '/home' } as RouterEvent);

        expect(service.copyright$.next).not.toHaveBeenCalled();
        expect(getFnSpy).not.toHaveBeenCalled();
    });

    it('should react to appropriate event url', () => {
        jest.spyOn(service.copyright$, 'next');
        // rxjs 'of' is a quick way to return a specific observable
        const getFnSpy = jest.spyOn(http, 'get').mockReturnValue(of({ body: 'test copyright' }));

        eventsSubject$.next({ url: '/main' } as RouterEvent);

        expect(service.copyright$.next).toHaveBeenCalledExactlyOnceWith('test copyright');
        expect(getFnSpy).toHaveBeenCalledExactlyOnceWith(expect.anything(), true)
        // sometimes passed arguments are complicated and you want to still check them, be creative
        const usedUrl = getFnSpy.mock.lastCall?.[0] as URL;
        expect(usedUrl.origin).toEqual('https://secure-backend-server:7661');
        expect(usedUrl.pathname).toEqual('/api/copyright');
        expect(usedUrl.searchParams.get('apiVersion')).toEqual('2');
        expect(usedUrl.searchParams.get('proxy')).toEqual("false");
    });

    it('should react to appropriate event url and use proxy', () => {
        jest.spyOn(service.copyright$, 'next');
        // rxjs 'of' is a quick way to return a specific observable
        const getFnSpy = jest.spyOn(http, 'get').mockReturnValue(of({ body: 'some other value' }));

        eventsSubject$.next({ url: '/main', state: { useProxy: 1 } });

        expect(service.copyright$.next).toHaveBeenCalledExactlyOnceWith('some other value');
        expect(getFnSpy).toHaveBeenCalledExactlyOnceWith(expect.anything(), true)
        // sometimes passed arguments are complicated and you want to still check them, be creative
        expect((getFnSpy.mock.lastCall?.[0] as URL).searchParams.get('proxy')).toEqual("true");
    });

}) 