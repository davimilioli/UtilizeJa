import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-conversor-pdf',
  templateUrl: './conversor-pdf.page.html',
  styleUrls: ['./conversor-pdf.page.scss'],
})
export class ConversorPdfPage implements OnInit {
  images: { dataUrl: string, name: string }[] = [];
  pdfOption: string = 'separate';
  pdfName: string = ''; 
  showMessage: boolean = false;

  constructor() { }

  ngOnInit() { }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({ dataUrl: e.target.result, name: file.name });
        };
        reader.readAsDataURL(file);
        this.showMessage = false;
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  removeAllImages() {
    this.images = [];
  }

  generateSinglePdf() {
    const doc = new jsPDF();
    this.images.forEach((image, index) => {
      const img = new Image();
      img.src = image.dataUrl;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        let widthRatio = pdfWidth / imgWidth;
        let heightRatio = pdfHeight / imgHeight;
        let ratio = Math.min(widthRatio, heightRatio);

        let imgX = (pdfWidth - imgWidth * ratio) / 2;
        let imgY = (pdfHeight - imgHeight * ratio) / 2;
        let pdfNameCustom = this.pdfName ? this.pdfName : 'anexos'

        if (index > 0) {
          doc.addPage();
        }

        doc.addImage(img, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        if (index === this.images.length - 1) {
          doc.save(pdfNameCustom + '.pdf');
        }
      };
    });
  }

  generateSeparatePdfs() {
    this.images.forEach((image: any) => {
      const doc = new jsPDF();
      const img = new Image();
      img.src = image.dataUrl;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        let widthRatio = pdfWidth / imgWidth;
        let heightRatio = pdfHeight / imgHeight;
        let ratio = Math.min(widthRatio, heightRatio);

        let imgX = (pdfWidth - imgWidth * ratio) / 2;
        let imgY = (pdfHeight - imgHeight * ratio) / 2;

        doc.addImage(img, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        doc.save(`${image.name.replace(/\.[^/.]+$/, "")}.pdf`);
      };
    });
  }

  convertToPdf() {

    if(this.images.length === 0){
      this.showMessage = true;
      return;
    }

    this.showMessage = false;

    if (this.pdfOption === 'together') {
      this.generateSinglePdf();
    } else {
      this.generateSeparatePdfs();
    }
  }
}
