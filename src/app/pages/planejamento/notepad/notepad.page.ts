import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, AlertController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.page.html',
  styleUrls: ['./notepad.page.scss'],
})
export class NotepadPage implements OnInit {
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  titleNote: string = '';
  annotationNote: string = ''; 
  noteForm: FormGroup; 
  notes: any = []

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private formBuilder: FormBuilder,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController) {
    this.noteForm = this.formBuilder.group({
      titleNote: ['', [Validators.required, Validators.maxLength(40)]],
      annotationNote: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  async presentAlert(titleNote: string) {
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteNote(titleNote);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async ngOnInit() {
    await this.storage.create();
    this.notes = await this.storage.get('Notes');
    console.log(this.notes)
  }

  cancel() {
    this.modal.dismiss(null, 'cancelar');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirmar') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async openModal() {
    this.modal.present();
  }

  async saveNote() {
    if (this.noteForm.valid) {
      const data = this.noteForm.value;
      let existingData = await this.storage.get('Notes');
      let list = existingData ? existingData : [];
  
      const existingIndex = list.findIndex((item: any) => item.titleNote === data.titleNote);
  
      if (existingIndex !== -1) {
        list[existingIndex].annotationNote = data.annotationNote;
      } else {
        list.push({ titleNote: data.titleNote, annotationNote: data.annotationNote });
      }
  
      await this.storage.set('Notes', list);
  
      this.notes = list;
      this.modal.dismiss(null, 'cancelar');
      this.noteForm.reset();

  
      this.toast('Nota salva');
    } else {
      this.toast('Formulário inválido');
    }
  }

  async editNote(titleNote: string) {
    console.log(titleNote);
    let data = await this.storage.get('Notes');
    
    if (data) {
      let existingNote = data.find((item: any) => item.titleNote === titleNote);
  
      if (existingNote) {
        this.noteForm.patchValue({
          titleNote: existingNote.titleNote,
          annotationNote: existingNote.annotationNote
        });
  
        this.modal.present();
        this.toast('Nota atualizada')
      } else {
        this.toast('Nota não encontrada')
      }
    }
  }
  
  async deleteNote(titleNote: string) {
    let data = await this.storage.get('Notes');
    
    if (data) {

      let updatedData = data.filter((item: any) => {
        return item.titleNote !== titleNote;
      });

      await this.storage.set('Notes', updatedData);

      this.notes = updatedData;
  
      console.log('Exluida: ', titleNote);
      this.toast('Nota excluida');
    }
  }

  async toast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
  
}
