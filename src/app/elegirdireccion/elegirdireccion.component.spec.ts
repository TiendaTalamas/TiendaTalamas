import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirdireccionComponent } from './elegirdireccion.component';

describe('ElegirdireccionComponent', () => {
  let component: ElegirdireccionComponent;
  let fixture: ComponentFixture<ElegirdireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirdireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirdireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
