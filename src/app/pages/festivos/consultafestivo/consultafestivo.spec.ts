import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultafestivo } from './consultafestivo';

describe('Consultafestivo', () => {
  let component: Consultafestivo;
  let fixture: ComponentFixture<Consultafestivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultafestivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultafestivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
