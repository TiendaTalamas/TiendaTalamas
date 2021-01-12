import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevadireccionComponent } from './nuevadireccion.component';

describe('NuevadireccionComponent', () => {
  let component: NuevadireccionComponent;
  let fixture: ComponentFixture<NuevadireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevadireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevadireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
