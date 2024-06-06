import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cep } from 'src/app/Types';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiBrasilService {
  apiCep: string = `${environment.apiBrasil}/cep/v1`;

  constructor(private http: HttpClient) {}

  getCep(cep: string): Observable<Cep> {
    const url = `${this.apiCep}/${cep}`;
    return this.http.get<Cep>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = '';
        if (error.error instanceof ErrorEvent) {
          // vindo do usuário
          message = `Ocorreu algum erro`;
        } else {
          // vindo da API
          if(error.status === 404){
            message = 'Cep não encontrado'
          } else {
            message = `Não é possível consulta o CEP, tente novamente mais tarde.`;
          }
        }
        console.error(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
