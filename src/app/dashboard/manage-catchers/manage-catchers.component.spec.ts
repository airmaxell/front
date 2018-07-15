import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCatchersComponent } from './manage-catchers.component';

describe('NewCatcherComponent', () => {
  let component: ManageCatchersComponent;
  let fixture: ComponentFixture<ManageCatchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCatchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
