export interface ApiRequestModel {
    locale: string;
    page: number;
    offset: number;
}

export interface ApiResponseEntryModel {
    name: string;
    visible: boolean;
}

export interface ApiResonseModel {
    count: number;
    entries: ApiResponseEntryModel[];
}

export interface ApiResultOptions {
    success: (result: ApiResonseModel) => void;
    error: (error: string) => void
}

export class ApiDataService {
    request(model: ApiRequestModel, options: ApiResultOptions): void {
        // imagine logic will perform and either success or error of the options will be called
    }
}