import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController) { }

  async toast(message: string, duration: number = 2000, position: 'top' | 'bottom' | 'middle' = 'top'){
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position:  position,
    });

    await toast.present();
  }
}
