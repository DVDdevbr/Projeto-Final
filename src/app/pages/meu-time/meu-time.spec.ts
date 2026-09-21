import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuTime } from './meu-time';

describe('MeuTime', () => {
  let component: MeuTime;
  let fixture: ComponentFixture<MeuTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuTime],
    }).compileComponents();

    fixture = TestBed.createComponent(MeuTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
