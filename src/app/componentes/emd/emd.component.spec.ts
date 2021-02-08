import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EMDComponent } from './emd.component';

describe('EMDComponent', () => {
  let component: EMDComponent;
  let fixture: ComponentFixture<EMDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EMDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EMDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
