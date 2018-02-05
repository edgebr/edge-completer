import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdgeCompleterComponent } from './edge-completer.component';
import { CtrCompleterDirective } from './directives/ctr-completer.directive';
import { CtrlDropdownDirective } from './directives/ctr-dropdown.directive';
import { CtrInputDirective } from './directives/ctr-input.directive';
import { CtrListDirective } from './directives/ctr-list.directive';
import { CtrRowDirective } from './directives/ctr-row.directive';
import { EdgeCompleterItemComponent } from './edge-completer-item/edge-completer-item.component';
import { EdgeCompleterListItemComponent } from './edge-completer-list-item/edge-completer-list-item.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CompleterService } from './shared/completer-service';
import { LocalDataFactoryProvider, RemoteDataFactoryProvider } from './shared/completer-data-factory';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    EdgeCompleterComponent,
    EdgeCompleterItemComponent,
    EdgeCompleterListItemComponent,
    CtrCompleterDirective,
    CtrlDropdownDirective,
    CtrInputDirective,
    CtrListDirective,
    CtrRowDirective
  ],
  providers: [
    CompleterService,
    LocalDataFactoryProvider,
    RemoteDataFactoryProvider
  ],
  exports: [
    EdgeCompleterComponent,
    EdgeCompleterItemComponent,
    EdgeCompleterListItemComponent,
    CtrCompleterDirective,
    CtrlDropdownDirective,
    CtrInputDirective,
    CtrListDirective,
    CtrRowDirective
  ]
})
export class EdgeCompleterModule { }
