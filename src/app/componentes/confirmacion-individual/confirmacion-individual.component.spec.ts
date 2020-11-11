import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionIndividualComponent } from './confirmacion-individual.component';

describe('ConfirmacionIndividualComponent', () => {
  let component: ConfirmacionIndividualComponent;
  let fixture: ComponentFixture<ConfirmacionIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
