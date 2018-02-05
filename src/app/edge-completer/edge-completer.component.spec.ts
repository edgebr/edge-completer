import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeCompleterComponent } from './edge-completer.component';

describe('EdgeCompleterComponent', () => {
  let component: EdgeCompleterComponent;
  let fixture: ComponentFixture<EdgeCompleterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeCompleterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeCompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
