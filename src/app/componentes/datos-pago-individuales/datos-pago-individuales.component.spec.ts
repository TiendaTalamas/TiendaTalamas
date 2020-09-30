import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPagoIndividualesComponent } from './datos-pago-individuales.component';

describe('DatosPagoIndividualesComponent', () => {
  let component: DatosPagoIndividualesComponent;
  let fixture: ComponentFixture<DatosPagoIndividualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPagoIndividualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPagoIndividualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
