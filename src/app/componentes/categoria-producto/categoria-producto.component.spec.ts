import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProductoComponent } from './categoria-producto.component';

describe('CategoriaProductoComponent', () => {
  let component: CategoriaProductoComponent;
  let fixture: ComponentFixture<CategoriaProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
