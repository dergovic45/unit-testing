import { BehaviorSubject } from 'rxjs';
import { ApiDataService, ApiRequestModel, ApiResonseModel } from './api-data.service';
import { LocaleService } from "./locale.service";

export interface ResultModel {
    count: number;
    entries: string[];
}

export class ApiWorker {
    result$ = new BehaviorSubject<ResultModel | null>(null);
    loading$ = new BehaviorSubject<boolean>(false);
    error$ = new BehaviorSubject<Error | null>(null);

    constructor(private dataService: ApiDataService, private localeService: LocaleService) { }

    loadEntries(page = 1): void {
        this.loading$.next(true);
        const requestModel: ApiRequestModel = {
            locale: this.localeService.toLocaleString(),
            page,
            offset: 20
        }
        this.dataService.request(requestModel, {
            success: (response) => {
                this.result$.next(this.mapApiResult(response));
                this.error$.next(null);
                this.loading$.next(false); // important: loading must be set last!!!
            },
            error: (error) => {
                this.result$.next(null);
                this.error$.next(new Error(error));
                this.loading$.next(false); // same here: loading must be set last!!!
            }
        });
    }

    private mapApiResult(response: ApiResonseModel): ResultModel {
        return {
            count: response.count,
            entries: response.entries.filter(entry => entry.visible).map(entry => entry.name)
        };
    }
}