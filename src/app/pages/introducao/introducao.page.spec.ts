import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroducaoPage } from './introducao.page';

describe('IntroducaoPage', () => {
  let component: IntroducaoPage;
  let fixture: ComponentFixture<IntroducaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
