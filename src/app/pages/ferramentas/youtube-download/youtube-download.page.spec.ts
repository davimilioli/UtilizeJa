import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubeDownloadPage } from './youtube-download.page';

describe('YoutubeDownloadPage', () => {
  let component: YoutubeDownloadPage;
  let fixture: ComponentFixture<YoutubeDownloadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
