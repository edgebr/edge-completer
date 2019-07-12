import { Component } from '@angular/core';
import {CompleterItem} from './edge-completer/shared/completer-item';
import {CompleterData} from './edge-completer/shared/completer-data';
import {CompleterService} from './edge-completer/shared/completer-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  searchData = [{key: 'Item 1', value: 'valor do item 1'}, {key: 'Item 2', value: 'valor do item 2'}];

  dataService: CompleterData;

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'key', 'key');
  }

  onDropdownChange($event: CompleterItem) {
    if ($event)
      alert('Você selecionou ' + $event.originalObject.key);
  }
}
