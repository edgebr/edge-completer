import {
  AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { isNil, MAX_CHARS, MIN_SEARCH_LENGTH, PAUSE, TEXT_NO_RESULTS, TEXT_SEARCHING } from './shared/globals';
import { CompleterData } from './shared/completer-data';
import { CompleterService } from './shared/completer-service';
import { CtrCompleterDirective } from './directives/ctr-completer.directive';
import { CompleterItem } from './shared/completer-item';

const noop = () => { };

@Component({
  selector: 'edge-completer',
  templateUrl: './edge-completer.component.html',
  styleUrls: ['./edge-completer.component.css']
})
export class EdgeCompleterComponent implements OnInit, ControlValueAccessor, AfterViewChecked, AfterViewInit {

  @Input()
  public dataService: CompleterData;

  @Input()
  public inputName = '';

  @Input()
  public inputId = '';

  @Input()
  public pause = PAUSE;

  @Input()
  public minSearchLength = MIN_SEARCH_LENGTH;

  @Input()
  public maxChars = MAX_CHARS;

  @Input()
  public overrideSuggested = false;

  @Input()
  public clearSelected = false;

  @Input()
  public clearUnselected = false;

  @Input()
  public fillHighlighted = true;

  @Input()
  public placeholder = '';

  @Input()
  public matchClass: string;

  @Input()
  public fieldTabindex: number;

  @Input()
  public autoMatch = false;

  @Input()
  public disableInput = false;

  @Input()
  public inputClass: string;

  @Input()
  public autofocus = false;

  @Input()
  public openOnFocus = false;

  @Input()
  public openOnClick = false;

  @Input()
  public selectOnClick = false;

  @Input()
  public selectOnFocus = false;

  @Input()
  public initialValue: any;

  @Input()
  public autoHighlight = false;

  @Input()
  cdr: ChangeDetectorRef;

  @Output()
  public selected = new EventEmitter<CompleterItem>();

  @Output()
  public highlighted = new EventEmitter<CompleterItem>();

  @Output('blur')
  public blurEvent = new EventEmitter<void>();

  @Output()
  public click = new EventEmitter<void>();

  @Output('focus')
  public focusEvent = new EventEmitter<void>();

  @Output()
  public opened = new EventEmitter<boolean>();

  @Output()
  public keyup: EventEmitter<any> = new EventEmitter();

  @Output()
  public keydown: EventEmitter<any> = new EventEmitter();


  @ViewChild(CtrCompleterDirective, {static: true})
  public completer: CtrCompleterDirective;

  @ViewChild('ctrInput', {static: false})
  public ctrInput: ElementRef;


  public control = new FormControl('');
  public displaySearching = true;
  public displayNoResults = true;
  public _textNoResults = TEXT_NO_RESULTS;
  public _textSearching = TEXT_SEARCHING;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private _focus = false;
  private _open = false;
  private _searchStr = '';

  constructor(private completerService: CompleterService) { }

  public get value(): any { return this.searchStr; };

  public set value(v: any) {
    if (v !== this.searchStr) {
      this.searchStr = v;
    }
    // Propagate the change in any case
    this._onChangeCallback(v);
  }

  public get searchStr() {
    return this._searchStr;
  }

  public set searchStr(value: string) {
    if (typeof value === 'string' || isNil(value)) {
      this._searchStr = value;
    } else {
      this._searchStr = JSON.stringify(value);
    }
  }

  public ngAfterViewInit() {
    if (this.autofocus) {
      this._focus = true;
    }
  }

  public ngAfterViewChecked(): void {
    if (this._focus) {
      setTimeout(
        () => {
          this.ctrInput.nativeElement.focus();
          this._focus = false;
        },
        0
      );
    }
  }

  public onTouched() {
    this._onTouchedCallback();
  }

  public writeValue(value: any) {
    this.searchStr = value;
  }

  public registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disableInput = isDisabled;
  }

  @Input()
  public set datasource(source: CompleterData | string | Array<any>) {
    if (source) {
      if (source instanceof Array) {
        this.dataService = this.completerService.local(source);
      } else if (typeof (source) === 'string') {
        throw new Error('Must be an array to be a datasource');
      } else {
        this.dataService = source;
      }
    }
  }

  @Input()
  public set textNoResults(text: string) {
    if (this._textNoResults !== text) {
      this._textNoResults = text;
      this.displayNoResults = !!this._textNoResults && this._textNoResults !== 'false';
    }
  }

  @Input()
  public set textSearching(text: string) {
    if (this._textSearching != text) {
      this._textSearching = text;
      this.displaySearching = !!this._textSearching && this._textSearching !== 'false';
    }
  }

  public ngOnInit() {
    this.completer.selected.subscribe((item: CompleterItem) => {
      this.selected.emit(item);
    });
    this.completer.highlighted.subscribe((item: CompleterItem) => {
      this.highlighted.emit(item);
    });
    this.completer.opened.subscribe((isOpen: boolean) => {
      this._open = isOpen;
      this.opened.emit(isOpen);
    });
  }

  public onBlur() {
    this.blurEvent.emit();
    this.onTouched();
    this.cdr.detectChanges();
  }

  public onFocus() {
    this.focusEvent.emit();
    this.onTouched();
  }

  public onClick(event: any) {
    this.click.emit(event);
    this.onTouched();
  }

  public onKeyup(event: any) {
    this.keyup.emit(event);
    event.stopPropagation();
  }

  public onKeydown(event: any) {
    this.keydown.emit(event);
    event.stopPropagation();
  }

  public onChange(value: string) {
    this.value = value;
  }

  public open() {
    this.completer.open();
  }

  public close() {
    this.completer.clear();
  }

  public focus(): void {
    if (this.ctrInput) {
      this.ctrInput.nativeElement.focus();
    } else {
      this._focus = true;
    }
  }

  public blur(): void {
    if (this.ctrInput) {
      this.ctrInput.nativeElement.blur();
    } else {
      this._focus = false;
    }
  }

  public isOpen() {
    return this._open;
  }
}
