import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatisticComponent } from './request-statistic.component';

describe('RequestStatisticComponent', () => {
  let component: RequestStatisticComponent;
  let fixture: ComponentFixture<RequestStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
