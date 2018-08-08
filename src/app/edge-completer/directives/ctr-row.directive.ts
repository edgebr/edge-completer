import { Directive, ElementRef, Host, HostListener, Input, OnDestroy, Renderer } from '@angular/core';
import { CtrlDropdownDirective, CtrRowElement, CtrRowItem } from './ctr-dropdown.directive';
import { CompleterItem } from '../shared/completer-item';

@Directive({
  selector: '[ctrRow]'
})
export class CtrRowDirective implements CtrRowElement, OnDestroy {

  private selected = false;
  private _rowIndex: number;
  private _item: CompleterItem;

  constructor(private el: ElementRef, private renderer: Renderer, @Host() private dropdown: CtrlDropdownDirective) { }

  public ngOnDestroy() {
    if (this._rowIndex) {
      this.dropdown.unregisterRow(this._rowIndex);
    }
  }

  @Input()
  set ctrRow(index: number) {
    this._rowIndex = index;
    this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
  }

  @Input()
  set dataItem(item: CompleterItem) {
    this._item = item;
  }

  @HostListener('mouseenter', ['$event']) public onMouseEnter(event: any) {
    this.dropdown.highlightRow(this._rowIndex);
  }

  @HostListener('mousedown', ['$event']) public onMouseDown(event: any) {
    this.dropdown.onSelected(this._item);
    this.dropdown.rowMouseDown();
  }

  public setHighlighted(selected: boolean) {
    this.selected = selected;
    this.renderer.setElementClass(this.el.nativeElement, 'completer-selected-row', this.selected);
  }

  public getNativeElement() {
    return this.el.nativeElement;
  }

  public getDataItem() {
    return this._item;
  }
}
