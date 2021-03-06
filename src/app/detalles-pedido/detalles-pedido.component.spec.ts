import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPedidoComponent } from './detalles-pedido.component';

describe('DetallesPedidoComponent', () => {
  let component: DetallesPedidoComponent;
  let fixture: ComponentFixture<DetallesPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
