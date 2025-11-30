import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivosAnio } from './festivos-anio';

describe('FestivosAnio', () => {
  let component: FestivosAnio;
  let fixture: ComponentFixture<FestivosAnio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivosAnio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivosAnio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
