import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcherStatisticComponent } from './catcher-statistic.component';

describe('CatcherStatisticComponent', () => {
  let component: CatcherStatisticComponent;
  let fixture: ComponentFixture<CatcherStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcherStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcherStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
