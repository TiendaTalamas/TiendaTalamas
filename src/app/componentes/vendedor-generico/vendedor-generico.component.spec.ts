import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorGenericoComponent } from './vendedor-generico.component';

describe('VendedorGenericoComponent', () => {
  let component: VendedorGenericoComponent;
  let fixture: ComponentFixture<VendedorGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
