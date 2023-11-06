import { BehaviorSubject } from 'rxjs';

export interface Locale {
    region: string;
    language: string;
}

export class LocaleService {
    get locale(): Locale {
        return this.locale$.value;
    }

    readonly locale$ = new BehaviorSubject<Locale>({ region: 'CH', language: 'en' });

    toLocaleString(): string {
        return this.locale.language + '-' + this.locale.region;
    }
}