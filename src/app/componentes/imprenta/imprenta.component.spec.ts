import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprentaComponent } from './imprenta.component';

describe('ImprentaComponent', () => {
  let component: ImprentaComponent;
  let fixture: ComponentFixture<ImprentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
