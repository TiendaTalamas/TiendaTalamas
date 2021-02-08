import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitosaComponent } from './exitosa.component';

describe('ExitosaComponent', () => {
  let component: ExitosaComponent;
  let fixture: ComponentFixture<ExitosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitosaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
