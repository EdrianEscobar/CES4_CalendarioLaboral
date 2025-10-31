import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listar } from './listar';

describe('Listar', () => {
  let component: Listar;
  let fixture: ComponentFixture<Listar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
