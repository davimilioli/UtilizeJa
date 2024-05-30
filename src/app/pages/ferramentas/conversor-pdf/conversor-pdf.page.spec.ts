import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversorPdfPage } from './conversor-pdf.page';

describe('ConversorPdfPage', () => {
  let component: ConversorPdfPage;
  let fixture: ComponentFixture<ConversorPdfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversorPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
