import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Storage } from '@ionic/storage-angular';
import { MessagesService } from 'src/app/services/messages/messages.service';

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
  existingFavorite: any = false;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private formBuilder: FormBuilder,
    private storage: Storage,
    private alertController: AlertController,
    private messagesService: MessagesService) {
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

      this.messagesService.toast('Nota salva');
    } else {
      this.messagesService.toast('Formulário inválido');
    }
  }

  async editNote(titleNote: string) {
    let data = await this.storage.get('Notes');
    
    if (data) {
      let existingNote = data.find((item: any) => item.titleNote === titleNote);
  
      if (existingNote) {
        this.noteForm.patchValue({
          titleNote: existingNote.titleNote,
          annotationNote: existingNote.annotationNote
        });
  
        this.modal.present();
        this.messagesService.toast('Nota atualizada')
      } else {
        this.messagesService.toast('Nota não encontrada')
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
  
      this.messagesService.toast('Nota excluida');
    }
  }

  
}
