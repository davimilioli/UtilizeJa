import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthFormData } from 'src/app/Types';

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss'],
})
export class FormAuthComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<AuthFormData>();
  @Output() signGoogle = new EventEmitter();
  @Input() showRepeatPassword: boolean = false;
  @Input() btnText!: string;
  @Input() loading: boolean = false;
  authForm!: FormGroup;
  authData: AuthFormData | null = null;

  constructor(private formBuilder: FormBuilder) {
    console.log(this.showRepeatPassword)

    if(this.showRepeatPassword){

      this.authForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validators: this.checkPasswords
      });
    } else {
      this.authForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

  }

  ngOnInit() {}

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get passwordRepeat() {
    return this.authForm.get('passwordRepeat');
  }

  submit() {
    if (this.authForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.authForm.value)
  }

  loginGoogle() {
    this.signGoogle.emit();
  }

  checkPasswords(passwords: any): { [key: string]: any } | null {
    const password = passwords.get('password')?.value;
    const confirmPassword = passwords.get('passwordRepeat')?.value;
    if (password !== confirmPassword) {
      return { passwordMatch: true };
    } else {
      return null;
    }
  }

}
