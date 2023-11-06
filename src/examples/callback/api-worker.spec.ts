import { ApiDataService, ApiResultOptions } from './api-data.service';
import { ApiWorker } from './api-worker';
import { LocaleService } from './locale.service';

describe('ApiWorker', () => {
    let localeService: LocaleService;
    let dataService: ApiDataService;
    let worker: ApiWorker;

    beforeEach(() => {
        localeService = { toLocaleString: () => 'de-AT' } as LocaleService;
        dataService = new ApiDataService();
        worker = new ApiWorker(dataService, localeService);
    });

    it('should request data', () => {
        jest.spyOn(worker.loading$, 'next');
        jest.spyOn(dataService, 'request');

        worker.loadEntries(2);

        expect(worker.loading$.next).toHaveBeenCalledExactlyOnceWith(true);
        expect(dataService.request).toHaveBeenCalledExactlyOnceWith({
            locale: 'de-AT',
            page: 2,
            offset: 20
        }, expect.any(Object))
        // check order
        expect(worker.loading$.next).toHaveBeenCalledBefore(dataService.request as unknown as jest.SpyInstance);
    });

    it('should handle success properly', () => {
        const resultSpy = jest.spyOn(worker.result$, 'next');
        const errorSpy = jest.spyOn(worker.error$, 'next');
        const loadingSpy = jest.spyOn(worker.loading$, 'next');

        // option A: interfere with the callback inside a mocked function
        jest.spyOn(dataService, 'request').mockImplementation((_model, options) => {
            loadingSpy.mockClear(); // remove info of calls to have a clean state
            options.success({
                count: 3,
                entries: [{ name: 'abc', visible: true }, { name: 'xyz', visible: true }, { name: '123', visible: false }]
            });
        })

        worker.loadEntries();

        expect(dataService.request).toHaveBeenCalledTimes(1);
        expect(resultSpy).toHaveBeenCalledExactlyOnceWith({ count: 3, entries: ['abc', 'xyz'] });
        expect(errorSpy).toHaveBeenCalledExactlyOnceWith(null);
        expect(loadingSpy).toHaveBeenCalledExactlyOnceWith(false);
        // check if loading was called last
        expect(resultSpy).toHaveBeenCalledBefore(loadingSpy);
        expect(errorSpy).toHaveBeenCalledBefore(loadingSpy);
    });

    it('should handle error properly', () => {
        const resultSpy = jest.spyOn(worker.result$, 'next');
        const errorSpy = jest.spyOn(worker.error$, 'next');
        const loadingSpy = jest.spyOn(worker.loading$, 'next');
        const requestSpyFn = jest.spyOn(dataService, 'request');

        worker.loadEntries();

        // option B: interfere with the callback after the main function was called
        expect(dataService.request).toHaveBeenCalledTimes(1);
        loadingSpy.mockClear(); // remove info of calls to have a clean state before continuing
        (requestSpyFn.mock.lastCall?.[1] as ApiResultOptions).error('some error');

        expect(resultSpy).toHaveBeenCalledExactlyOnceWith(null);
        expect(errorSpy).toHaveBeenCalledExactlyOnceWith(new Error('some error'));
        expect(loadingSpy).toHaveBeenCalledExactlyOnceWith(false);
        // check if loading was called last
        expect(resultSpy).toHaveBeenCalledBefore(loadingSpy);
        expect(errorSpy).toHaveBeenCalledBefore(loadingSpy);
    });
});