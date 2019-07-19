

import { Inject, Injectable } from '@angular/core';
import { LocalData } from './local-data';
import { Observable } from 'rxjs';

@Injectable()
export class CompleterService {
    constructor(
        @Inject(LocalData) private localDataFactory: any, // Using any instead of () => LocalData because on AoT errors
    ) { }

    public local(data: any[] | Observable<any>, searchFields: string | null = '', titleField: string | null = ''): LocalData {

        const localData = this.localDataFactory();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    }
}
