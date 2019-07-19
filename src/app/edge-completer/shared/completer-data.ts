import { CompleterItem } from './completer-item';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface CompleterData extends Observable<CompleterItem[] | null> {
    dataSourceChange?: EventEmitter<void>;

    search(term: string): void;
    cancel(): void;
    // Implement if you need to set an initial value
    convertToItem?(data: any): CompleterItem | null;
}
