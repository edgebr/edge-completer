

import { EventEmitter, Injectable } from '@angular/core';
import { CompleterBaseData } from './completer-base-data';
import { Observable, of } from 'rxjs';
import { CompleterItem } from './completer-item';
import {catchError} from 'rxjs/operators';

@Injectable()
export class LocalData extends CompleterBaseData {

    public dataSourceChange: EventEmitter<void> = new EventEmitter<void>();

    protected _data: any[];
    protected savedTerm: string | null;

    constructor() {
        super();
    }

    public data(data: any[] | Observable<any[]>) {
        if (data instanceof Observable) {
            const data$ = <Observable<any[]>>data;
            data$
                .pipe(catchError(() => of([])))
                .subscribe((res) => {
                    this._data = res;
                    if (this.savedTerm) {
                        this.search(this.savedTerm);
                    }
                    this.dataSourceChange.emit();
                });
        } else {
            this._data = <any[]>data;
        }

        this.dataSourceChange.emit();

        return this;
    }

    public search(term: string): void {
        if (!this._data) {
            this.savedTerm = term;
        } else {
            this.savedTerm = null;
            const matches: any[] = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    }

    public convertToItem(data: any): CompleterItem | null {
        return super.convertToItem(data);
    }
}
