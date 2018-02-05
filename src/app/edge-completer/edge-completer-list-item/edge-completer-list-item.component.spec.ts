import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCompleterListItemComponent } from './edge-completer-list-item.component';

describe('EdgeCompleterListItemComponent', () => {
  let component: EdgeCompleterListItemComponent;
  let fixture: ComponentFixture<EdgeCompleterListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeCompleterListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCompleterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
