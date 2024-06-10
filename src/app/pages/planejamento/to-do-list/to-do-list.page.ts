import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.page.html',
  styleUrls: ['./to-do-list.page.scss'],
})
export class ToDoListPage implements OnInit {
  message = '';
  toDoForm!: FormGroup;
  editingTask: any = null;
  tasks: { title: string, completed: boolean }[] = [];

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private formBuilder: FormBuilder,
    private storage: Storage,
    private alertController: AlertController,
    private messagesService: MessagesService) {

    this.toDoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      completed: ['']
    });
  }

  async ngOnInit() {
    await this.storage.create();
    const storedTasks = await this.storage.get('Tasks');
    this.tasks = storedTasks ? storedTasks : [];
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

  async presentAlert(title: string) {
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
            this.deleteTask(title);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async saveToDo() {
    if (this.toDoForm.valid) {
      const data = this.toDoForm.value;
      let existingData = await this.storage.get('Tasks');
      let list = existingData ? existingData : [];
  
      if (this.editingTask) {
        const existingIndex = list.findIndex((item: any) => item.title === this.editingTask.title);
        if (existingIndex !== -1) {
          list[existingIndex].title = data.title;
          list[existingIndex].completed = data.completed;
        }

        this.editingTask = null;
      } else {
        const existingIndex = list.findIndex((item: any) => item.title === data.title);
        if (existingIndex !== -1) {
          list[existingIndex].completed = data.completed;
        } else {
          list.push({ title: data.title, completed: data.completed });
        }
      }
  
      await this.storage.set('Tasks', list);
  
      this.tasks = list;
      this.modal.dismiss(null, 'cancelar');
      this.toDoForm.reset();
  
      this.messagesService.toast('Lista salva');
    } else {
      this.messagesService.toast('Formulário inválido');
    }
  }
  
  
  async deleteTask(title: string) {
    const index = this.tasks.findIndex(task => task.title === title);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      await this.storage.set('Tasks', this.tasks);
    }
  }

  async editTask(task: any){
    let data = await this.storage.get('Tasks');
    
    if (data) {
      let existingNote = data.find((item: any) => item.title === task.title);
      this.editingTask = existingNote;
  
      if (existingNote) {
        this.toDoForm.patchValue({
          title: existingNote.title,
          completed: existingNote.completed,
        });
  
        this.modal.present();
        this.messagesService.toast('Lista salva');
      } else {
        this.messagesService.toast('Lista não encontrada');
      }
    }
  }

  async toggleTaskCompleted(task: any) {
    let list = await this.storage.get('Tasks');
    
    if (list) {
      const existingIndex = list.findIndex((item: any) => item.title === task.title);
    
      if (existingIndex !== -1) {

        list[existingIndex].completed = !list[existingIndex].completed;
    
        await this.storage.set('Tasks', list);
        this.tasks = list;
        
        this.messagesService.toast('Tarefa atualizada');
      }
    }
  }

  
}
