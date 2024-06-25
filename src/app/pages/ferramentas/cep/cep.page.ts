import { Component, OnInit } from '@angular/core';
import { Cep } from 'src/app/Types';
import { ApiBrasilService } from 'src/app/services/apibrasil/api-brasil.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.page.html',
  styleUrls: ['./cep.page.scss'],
})
export class CepPage implements OnInit {

  result?: Cep;
  cepForm: FormGroup;
  clearButton: boolean = false;
  constructor(private apiBrasilService: ApiBrasilService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService) {
    this.cepForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}'), Validators.minLength(8), Validators.maxLength(9)]]
    })
    
  }

  ngOnInit() {}

  get cep(){
    return this.cepForm.get('cep');
  }

  searchCep(cep: string) {
    this.apiBrasilService.getCep(cep).subscribe({
      next: (data: Cep) => {
        this.result = data;
        this.clearButton = true;
      },
      error: (error: any) => {
        this.messagesService.toast(error.message);
        this.result = undefined;
        this.clearButton = false;
      }
    })
  }

  submit() {
    if (this.cep?.invalid) {
      return;
    }
  
    const cepValue = this.cepForm.value.cep.replace('-', '');
    this.searchCep(cepValue);
  }

  formatCep(event: any) {
    let value = event.target.value;
  
    value = value.replace('-', '');

    if (value.length >= 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
  
    this.cepForm.patchValue({ cep: value });

    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Remove o hífen quando for apagar o valor do input
    if (event.inputType === 'deleteContentBackward' && start === 6 && end === 6) {
      event.target.setSelectionRange(5, 5);
    }
  }

  clearCep(){
    this.result = undefined;
    this.cepForm.patchValue({ cep: '' });
    this.clearButton = false; 
  }

}
