import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroExitosoComponent } from './cuadro-exitoso.component';

describe('CuadroExitosoComponent', () => {
  let component: CuadroExitosoComponent;
  let fixture: ComponentFixture<CuadroExitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuadroExitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
