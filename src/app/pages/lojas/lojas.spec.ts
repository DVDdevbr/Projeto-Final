import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lojas } from './lojas';

describe('Lojas', () => {
  let component: Lojas;
  let fixture: ComponentFixture<Lojas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lojas],
    }).compileComponents();

    fixture = TestBed.createComponent(Lojas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
