import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCompleterItemComponent } from './edge-completer-item.component';

describe('EdgeCompleterItemComponent', () => {
  let component: EdgeCompleterItemComponent;
  let fixture: ComponentFixture<EdgeCompleterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeCompleterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCompleterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
